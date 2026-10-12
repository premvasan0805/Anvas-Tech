import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createDots } from './heroDots.js';

// The hero's dot plate, behind the Solutions stack. The section is several
// screens tall, so the canvas is one viewport high and sticks while the cards
// scroll past, rather than covering the whole section with dots.
export default function SolutionsDots() {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return undefined; // No WebGL: the section keeps its dark background.
    }
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.setAttribute('aria-hidden', 'true');
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const dots = createDots();
    scene.add(dots.group);

    let clock = 1.5;
    let plate = null;
    const finePointer = window.matchMedia('(pointer: fine)');
    let client = null;
    const place = () => {
      if (!client) return;
      const rect = host.getBoundingClientRect();
      const x = client.x - rect.left;
      const y = client.y - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;
      plate = { x, y, at: clock };
    };
    const onPointer = (e) => {
      client = { x: e.clientX, y: e.clientY };
      place();
    };
    if (finePointer.matches) window.addEventListener('pointermove', onPointer, { passive: true });

    // Scrolling shakes the plate: the kick jumps with scroll speed and eases
    // back to rest once the page stops.
    let kick = 0;
    let lastScroll = window.scrollY;
    const onScroll = () => {
      const delta = Math.abs(window.scrollY - lastScroll);
      lastScroll = window.scrollY;
      kick = Math.min(1, Math.max(kick, delta / 60));
      place(); // keep the void under a resting pointer as the page moves
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const layout = () => {
      const w = host.clientWidth || 1;
      const h = host.clientHeight || 1;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(w, h, false);
      dots.resize(w, h, renderer.getPixelRatio());
    };
    const draw = () => {
      dots.update(clock, 1, plate, kick);
      renderer.render(scene, camera);
    };

    let visible = true;
    let raf = 0;
    let last = 0;
    const running = () => visible && !document.hidden;
    const frame = (now) => {
      raf = 0;
      if (!running()) return;
      if (last) {
        const dt = Math.min((now - last) / 1000, 0.1);
        clock += dt;
        kick *= Math.exp(-dt * 3.5);
      }
      last = now;
      draw();
      raf = requestAnimationFrame(frame);
    };
    const sync = () => {
      if (running()) {
        if (!raf) {
          last = 0;
          raf = requestAnimationFrame(frame);
        }
      } else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    layout();
    draw();
    const ro = new ResizeObserver(() => {
      layout();
      draw();
    });
    ro.observe(host);
    // Watch the whole section, since the sticky canvas itself stays in view
    // for as long as any of it is on screen.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    io.observe(host.parentElement || host);
    document.addEventListener('visibilitychange', sync);
    sync();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', sync);
      dots.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className="sol-dots" aria-hidden="true">
      <div className="sol-dots-view" ref={hostRef} />
    </div>
  );
}
