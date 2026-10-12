/* 3D pointer tilt for cards.

   The card under the pointer leans toward it in perspective (up to MAX_DEG)
   and eases back flat on leave. --gx/--gy follow the pointer as percentages so
   CSS can draw a glare that moves across the tilted face (css/motion.css).

   Tilt goes through GSAP's rotationX/rotationY so it shares the transform with
   the card entrance tween in js/motion.js instead of overwriting it; the CSS
   hover lift uses the standalone `translate` property and composes on top.

   One delegated listener on document, so cards on lazily mounted pages work
   without rebinding. Mouse/trackpad only: touch has no hover to tilt on. */

const CARDS = '.list-card, .cs-card-inner, .sp-links > a';
const MAX_DEG = { default: 7, '.sp-links > a': 6, '.cs-card-inner': 4, '.sp-card-thumb': 9, '#capabilities .list-card': 14 };

/* Cards that lean on a spring instead of an eased tween: they lag the pointer,
   overshoot and wobble flat again after it leaves. */
const SPRING = '#capabilities .list-card';
const STIFFNESS = 90;
const DAMPING = 7;

/* The element that tilts. A product card tilts only its screenshot, so the
   text under it stays flat and easy to read. */
function targetFor(node) {
  const card = node.closest?.(CARDS);
  if (card) return card;
  return node.closest?.('.sp-card')?.querySelector('.sp-card-thumb') || null;
}

function maxFor(el) {
  for (const sel of Object.keys(MAX_DEG)) {
    if (sel !== 'default' && el.matches(sel)) return MAX_DEG[sel];
  }
  return MAX_DEG.default;
}

export function initTilt3D() {
  const { gsap } = window;
  if (!gsap) return () => {};
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return () => {};
  const forced = window.location.search.includes('motion=force');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches && !forced) {
    return () => {};
  }

  const tweens = new WeakMap();
  const springs = new Map();
  const touched = new Set();
  let active = null;

  // Semi-implicit Euler on a damped spring per axis, one rAF for all cards.
  let raf = 0;
  let last = 0;
  const step = (now) => {
    const dt = Math.min((now - last) / 1000, 1 / 30);
    last = now;
    springs.forEach((s, el) => {
      s.vx += ((s.tx - s.rx) * STIFFNESS - s.vx * DAMPING) * dt;
      s.vy += ((s.ty - s.ry) * STIFFNESS - s.vy * DAMPING) * dt;
      s.rx += s.vx * dt;
      s.ry += s.vy * dt;
      gsap.set(el, { rotationX: s.rx, rotationY: s.ry });
      el.style.setProperty('--rx', s.rx.toFixed(2));
      el.style.setProperty('--ry', s.ry.toFixed(2));
      const still = !s.tx && !s.ty && Math.abs(s.rx) + Math.abs(s.ry) + Math.abs(s.vx) + Math.abs(s.vy) < 0.01;
      if (still) {
        gsap.set(el, { rotationX: 0, rotationY: 0 });
        el.style.removeProperty('--rx');
        el.style.removeProperty('--ry');
        springs.delete(el);
      }
    });
    raf = springs.size ? requestAnimationFrame(step) : 0;
  };
  const spring = (el) => {
    let s = springs.get(el);
    if (!s) {
      gsap.set(el, { transformPerspective: 650 });
      s = { rx: 0, ry: 0, vx: 0, vy: 0, tx: 0, ty: 0 };
      springs.set(el, s);
      touched.add(el);
    }
    if (!raf) {
      last = performance.now();
      raf = requestAnimationFrame(step);
    }
    return s;
  };

  const tween = (el) => {
    let t = tweens.get(el);
    if (!t) {
      gsap.set(el, { transformPerspective: 900 });
      t = {
        rx: gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power3.out' }),
        ry: gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power3.out' }),
      };
      tweens.set(el, t);
      touched.add(el);
    }
    return t;
  };

  const release = (el) => {
    const s = springs.get(el);
    if (s) {
      s.tx = 0;
      s.ty = 0;
    }
    const t = tweens.get(el);
    if (t) {
      t.rx(0);
      t.ry(0);
    }
    el.classList.remove('is-tilting');
  };

  const onMove = (e) => {
    const el = targetFor(e.target);
    if (el !== active) {
      if (active) release(active);
      active = el;
      if (el) el.classList.add('is-tilting');
    }
    if (!el) return;

    const r = el.getBoundingClientRect();
    const nx = Math.min(Math.max((e.clientX - r.left) / r.width, 0), 1);
    const ny = Math.min(Math.max((e.clientY - r.top) / r.height, 0), 1);
    const max = maxFor(el);
    if (el.matches(SPRING)) {
      const s = spring(el);
      s.tx = (0.5 - ny) * 2 * max;
      s.ty = (nx - 0.5) * 2 * max;
    } else {
      const t = tween(el);
      t.rx((0.5 - ny) * 2 * max);
      t.ry((nx - 0.5) * 2 * max);
    }
    el.style.setProperty('--gx', `${(nx * 100).toFixed(1)}%`);
    el.style.setProperty('--gy', `${(ny * 100).toFixed(1)}%`);
  };

  // Leaving the window entirely never fires a move over a non-card.
  const onOut = (e) => {
    if (!e.relatedTarget && active) {
      release(active);
      active = null;
    }
  };

  document.addEventListener('pointermove', onMove, { passive: true });
  document.addEventListener('pointerout', onOut);

  return () => {
    document.removeEventListener('pointermove', onMove);
    document.removeEventListener('pointerout', onOut);
    cancelAnimationFrame(raf);
    raf = 0;
    springs.clear();
    touched.forEach((el) => {
      gsap.set(el, { rotationX: 0, rotationY: 0 });
      el.style.removeProperty('--rx');
      el.style.removeProperty('--ry');
      el.classList.remove('is-tilting');
    });
    touched.clear();
    active = null;
  };
}
