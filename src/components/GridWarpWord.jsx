import { useEffect, useRef } from 'react';

// A word read through a coarse grid. The pointer drags the cells it passes
// over as solid blocks, so the letters shear into stepped slices along its
// path, then spring back and knit together behind it. The first time it
// scrolls in, the word builds itself: the cells start scattered above and
// below the line and fly in left to right. While it is on screen the colours
// drift slowly through the letters, and every few seconds a wave lifts the
// columns left to right with a glint riding its crest. The letters stand
// as solid blocks: a violet extrusion runs back from every cell, so a sheared
// slice carries its own side with it, and the extrusion leans away from the
// pointer as if lit by it.
// color is one CSS colour, or a list of them for a left-to-right gradient.

const COLS_PER_EM = 9; // grid coarseness: cells across one font size
const RADIUS = 1.1; // reach of the drag, in font sizes
const PUSH = 2; // how far cells follow the pointer
const STIFF = 70; // spring back
const DAMP = 9; // a little overshoot, so the knit settles with a wobble
const BUILD_SPREAD = 1.5; // seconds from the first column starting to the last
const WAVE_EVERY = 4.5; // seconds between waves
const WAVE_FOR = 1.9; // seconds one wave takes to cross
const WAVE_LIFT = 0.13; // crest height, in font sizes
const WAVE_WIDTH = 0.55; // crest half-width, in font sizes
const FLOW_FOR = 14; // seconds for the colours to travel one word width
const DEPTH = 0.075; // extrusion depth, in font sizes
const DEPTH_TOP = '#7b4dff'; // extrusion colour at the top of the letters
const DEPTH_BOTTOM = '#2a1585'; // and at the bottom

export default function GridWarpWord({ text, color = '#14142b' }) {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    const canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    host.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const src = document.createElement('canvas');
    // GPU-backed: it is repainted every frame for the colour drift and read
    // back only once per layout.
    const sctx = src.getContext('2d');
    // The displaced letters, and a dark copy of them for the extrusion.
    const face = document.createElement('canvas');
    const fctx = face.getContext('2d');
    const shade = document.createElement('canvas');
    const hctx = shade.getContext('2d');

    let w = 0;
    let h = 0;
    let dpr = 1;
    let fontSize = 100;
    let pad = 0;
    let cell = 10;
    let cols = 0;
    let rows = 0;
    let ink = []; // indexes of cells that hold any of the word
    let ox = new Float32Array(0);
    let oy = new Float32Array(0);
    let vx = new Float32Array(0);
    let vy = new Float32Array(0);
    let wait = new Float32Array(0); // seconds until a cell joins the build

    const layout = () => {
      w = host.clientWidth || 1;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      // Fit the word to the width.
      sctx.font = `700 100px Inter, system-ui, sans-serif`;
      const at100 = sctx.measureText(text).width || 1;
      // Less a margin each side for the extrusion to lean into.
      fontSize = (100 * w) / (at100 + 100 * DEPTH * 1.6);
      pad = fontSize * 0.28; // room above and below for displaced cells
      h = Math.ceil(fontSize * 0.78 + pad * 2);
      host.style.height = `${h}px`;
      for (const c of [canvas, src, face, shade]) {
        c.width = Math.round(w * dpr);
        c.height = Math.round(h * dpr);
      }
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      paint();

      cell = Math.max(6, Math.round(fontSize / COLS_PER_EM));
      cols = Math.ceil(w / cell);
      rows = Math.ceil(h / cell);
      const data = sctx.getImageData(0, 0, src.width, src.height).data;
      const sw = src.width;
      ink = [];
      for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
          const x0 = Math.floor(c * cell * dpr);
          const y0 = Math.floor(r * cell * dpr);
          const x1 = Math.min(sw, Math.floor((c + 1) * cell * dpr));
          const y1 = Math.min(src.height, Math.floor((r + 1) * cell * dpr));
          let hit = false;
          for (let y = y0; y < y1 && !hit; y += 2) {
            for (let x = x0; x < x1; x += 2) {
              if (data[(y * sw + x) * 4 + 3] > 8) { hit = true; break; }
            }
          }
          if (hit) ink.push(r * cols + c);
        }
      }
      const n = cols * rows;
      ox = new Float32Array(n);
      oy = new Float32Array(n);
      vx = new Float32Array(n);
      vy = new Float32Array(n);
      // Hidden until the build brings the cells in.
      wait = new Float32Array(n).fill(built ? 0 : Infinity);
    };

    // Draw the word into the source canvas. flow (0..1) slides a gradient
    // that repeats every word width, so the colours travel without a seam.
    const paint = () => {
      sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sctx.clearRect(0, 0, w, h);
      sctx.font = `700 ${fontSize}px Inter, system-ui, sans-serif`;
      if (Array.isArray(color)) {
        const n = color.length;
        const x0 = (flow - 1) * w;
        const g = sctx.createLinearGradient(x0, 0, x0 + 2 * w, 0);
        for (let j = 0; j <= 2 * n; j += 1) g.addColorStop(j / (2 * n), color[j % n]);
        sctx.fillStyle = g;
      } else {
        sctx.fillStyle = color;
      }
      sctx.textBaseline = 'alphabetic';
      // Cap height of Inter is about 0.73 em; centre the caps in the band.
      sctx.fillText(text, fontSize * DEPTH * 0.8, pad + fontSize * 0.74);
    };

    // Where the wave's crest is, in px across the word.
    const crestX = () => {
      const band = fontSize * WAVE_WIDTH * 2;
      return -band + (w + band * 2) * wave;
    };

    const draw = () => {
      fctx.setTransform(1, 0, 0, 1, 0, 0);
      fctx.clearRect(0, 0, face.width, face.height);
      const step = cell / 2; // offsets snap to half cells: stepped slices
      const s = cell * dpr;
      const waving = wave >= 0 && wave < 1;
      const cx0 = waving ? crestX() : 0;
      const reach = fontSize * WAVE_WIDTH;
      for (const i of ink) {
        if (wait[i] > 0) continue; // not in the build yet
        const c = i % cols;
        const r = (i - c) / cols;
        const dx = Math.round(ox[i] / step) * step;
        let lift = 0;
        if (waving) {
          const k = ((c + 0.5) * cell - cx0) / reach;
          lift = -fontSize * WAVE_LIFT * Math.exp(-k * k);
        }
        const dy = Math.round((oy[i] + lift) / step) * step;
        const sx = c * s;
        const sy = r * s;
        fctx.drawImage(src, sx, sy, s, s, sx + dx * dpr, sy + dy * dpr, s, s);
      }
      // The glint: a soft white band on the crest, laid over the letters only.
      if (waving) {
        const band = fontSize * 0.9;
        const x = cx0 * dpr;
        const g = ctx.createLinearGradient(x - band * dpr, 0, x + band * dpr, canvas.height * 0.4);
        g.addColorStop(0, 'rgb(255 255 255 / 0)');
        g.addColorStop(0.5, 'rgb(255 255 255 / 0.55)');
        g.addColorStop(1, 'rgb(255 255 255 / 0)');
        fctx.globalCompositeOperation = 'source-atop';
        fctx.fillStyle = g;
        fctx.fillRect(0, 0, face.width, face.height);
        fctx.globalCompositeOperation = 'source-over';
      }

      // The extrusion: the letters' silhouette in violet, stacked a pixel at
      // a time back from the face, with a soft shadow under the deepest.
      hctx.globalCompositeOperation = 'source-over';
      hctx.clearRect(0, 0, shade.width, shade.height);
      hctx.drawImage(face, 0, 0);
      hctx.globalCompositeOperation = 'source-in';
      const dg = hctx.createLinearGradient(0, pad * dpr, 0, (pad + fontSize * 0.74) * dpr);
      dg.addColorStop(0, DEPTH_TOP);
      dg.addColorStop(1, DEPTH_BOTTOM);
      hctx.fillStyle = dg;
      hctx.fillRect(0, 0, shade.width, shade.height);

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const depth = fontSize * DEPTH * dpr;
      const layers = Math.max(2, Math.round(depth / dpr));
      const ex = (lean * 0.75 * depth) / layers;
      const ey = depth / layers;
      ctx.save();
      ctx.shadowColor = 'rgb(60 25 160 / 0.3)';
      ctx.shadowBlur = fontSize * 0.15 * dpr;
      ctx.shadowOffsetY = fontSize * 0.06 * dpr;
      ctx.drawImage(shade, ex * layers, ey * layers);
      ctx.restore();
      for (let k = layers - 1; k >= 1; k -= 1) ctx.drawImage(shade, ex * k, ey * k);
      ctx.drawImage(face, 0, 0);
    };

    // Push the cells near the segment a to b along the pointer's motion.
    const drag = (ax, ay, bx, by) => {
      const mx = bx - ax;
      const my = by - ay;
      if (!mx && !my) return;
      const reach = fontSize * RADIUS;
      const len2 = mx * mx + my * my;
      for (const i of ink) {
        const c = i % cols;
        const r = (i - c) / cols;
        const cx = (c + 0.5) * cell;
        const cy = (r + 0.5) * cell;
        const t = Math.max(0, Math.min(1, ((cx - ax) * mx + (cy - ay) * my) / len2));
        const ddx = cx - (ax + mx * t);
        const ddy = cy - (ay + my * t);
        const d = Math.sqrt(ddx * ddx + ddy * ddy);
        if (d > reach) continue;
        const f = (1 - d / reach) ** 2 * PUSH;
        vx[i] += mx * f * 9;
        vy[i] += my * f * 9 * 0.6; // mostly sideways shear, like slices
      }
      wake();
    };

    // Scatter every cell above or below the line and stagger their start by
    // column, so the springs pull the word together left to right.
    const build = () => {
      for (const i of ink) {
        const c = i % cols;
        const up = Math.random() < 0.5 ? -1 : 1;
        ox[i] = (Math.random() - 0.5) * fontSize * 1.2;
        oy[i] = up * (pad + fontSize * (0.3 + Math.random() * 0.6));
        vx[i] = 0;
        vy[i] = 0;
        wait[i] = 0.05 + (c / cols) * BUILD_SPREAD + Math.random() * 0.12;
      }
      building = true;
      wake();
    };

    let raf = 0;
    let last = 0;
    let building = false;
    let visible = false;
    let wave = -1; // 0..1 while a wave crosses
    let sinceWave = WAVE_EVERY - 1.2; // the first wave follows the build
    let flow = 0;
    let lean = 0.35; // extrusion direction across, -1..1, eased to leanTo
    let leanTo = 0.35;
    const tick = (now) => {
      raf = 0;
      const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
      last = now;
      let pending = false;
      if (building) {
        for (const i of ink) {
          if (wait[i] > 0) {
            wait[i] -= dt;
            pending = true;
          }
        }
        if (!pending) building = false;
      }
      if (visible) {
        lean += (leanTo - lean) * Math.min(1, dt * 3);
        flow = (flow + dt / FLOW_FOR) % 1;
        paint();
        if (!building) {
          sinceWave += dt;
          wave = sinceWave >= WAVE_EVERY ? (sinceWave - WAVE_EVERY) / WAVE_FOR : -1;
          if (wave >= 1) {
            sinceWave = 0;
            wave = -1;
          }
        }
      }
      let energy = 0;
      for (const i of ink) {
        if (wait[i] > 0) continue;
        vx[i] += (-STIFF * ox[i] - DAMP * vx[i]) * dt;
        vy[i] += (-STIFF * oy[i] - DAMP * vy[i]) * dt;
        ox[i] += vx[i] * dt;
        oy[i] += vy[i] * dt;
        energy += Math.abs(ox[i]) + Math.abs(oy[i]) + Math.abs(vx[i]) * 0.05;
      }
      const settled = energy / Math.max(ink.length, 1) <= 0.02 && !building;
      if (settled) {
        ox.fill(0); oy.fill(0); vx.fill(0); vy.fill(0);
      }
      draw();
      // Keep going while anything moves, and while on screen for the drift.
      if (!settled || visible) raf = requestAnimationFrame(tick);
      else last = 0;
    };
    function wake() {
      if (!raf) raf = requestAnimationFrame(tick);
    }

    let prev = null;
    const onPointer = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // Lit from the pointer: the sides fall away from it.
      leanTo = Math.max(-1, Math.min(1, (rect.width / 2 - x) / (rect.width / 2)));
      const inside = x > -cell && y > -cell && x < rect.width + cell && y < rect.height + cell;
      if (inside && prev) drag(prev.x, prev.y, x, y);
      prev = inside ? { x, y } : null;
    };
    window.addEventListener('pointermove', onPointer, { passive: true });

    // A GPU reset wipes both canvases; paint them again when they come back.
    const onRestored = () => {
      paint();
      draw();
    };
    canvas.addEventListener('contextrestored', onRestored);
    src.addEventListener('contextrestored', onRestored);

    let built = false;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) return;
      if (!built) {
        built = true;
        build();
      }
      wake();
    }, { threshold: 0.5 });

    let alive = true;
    const start = () => {
      if (!alive) return;
      layout();
      draw();
      io.observe(host);
    };
    // Measure with the real face, not the fallback.
    (document.fonts?.ready || Promise.resolve()).then(start);
    const ro = new ResizeObserver(() => {
      if (Math.abs((host.clientWidth || 1) - w) < 1) return;
      layout();
      draw();
    });
    ro.observe(host);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onPointer);
      canvas.removeEventListener('contextrestored', onRestored);
      src.removeEventListener('contextrestored', onRestored);
      canvas.remove();
    };
  }, [text, String(color)]);

  return <div className="grid-warp" ref={hostRef} role="img" aria-label={text} />;
}
