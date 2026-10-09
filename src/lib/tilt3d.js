/* 3D pointer tilt for cards.

   The card under the pointer leans toward it in perspective (up to MAX_DEG)
   and eases back flat on leave. --gx/--gy follow the pointer as percentages so
   CSS can draw a glare that moves across the tilted face (css/motion.css).

   Tilt goes through GSAP's rotationX/rotationY so it shares the transform with
   the card entrance tween in js/motion.js instead of overwriting it; the CSS
   hover lift uses the standalone `translate` property and composes on top.

   One delegated listener on document, so cards on lazily mounted pages work
   without rebinding. Mouse/trackpad only: touch has no hover to tilt on. */

const CARDS = '.list-card, .cs-card-inner';
const MAX_DEG = { default: 7, '.cs-card-inner': 4, '.sp-card-thumb': 9 };

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
  const touched = new Set();
  let active = null;

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
    const t = tween(el);
    t.rx((0.5 - ny) * 2 * max);
    t.ry((nx - 0.5) * 2 * max);
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
    touched.forEach((el) => {
      gsap.set(el, { rotationX: 0, rotationY: 0 });
      el.classList.remove('is-tilting');
    });
    touched.clear();
    active = null;
  };
}
