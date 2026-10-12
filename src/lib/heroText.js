/* Home hero copy. Plays every time a slide becomes active (the slider in
   js/site.js toggles .is-active), so each slide gets its own entrance:

   - the kicker opens left to right from a clip
   - the headline rises word by word out of masks, with a slight tilt
   - the paragraph rises out of a soft blur
   - the button pops in and a light sweeps across it

   While the pointer moves over the hero, the active copy drifts a few pixels
   against it for depth over the ribbon. On first load the tabs rise in too.

   Not gated on prefers-reduced-motion: hero motion is meant to run
   regardless, and the pause button covers that need. */

function splitWords(heading) {
  const text = heading.textContent.trim();
  heading.setAttribute('aria-label', text);
  heading.textContent = '';
  text.split(/\s+/).forEach((word, i) => {
    if (i) heading.append(' ');
    const mask = document.createElement('span');
    mask.className = 'hw';
    mask.setAttribute('aria-hidden', 'true');
    const inner = document.createElement('span');
    inner.textContent = word;
    mask.append(inner);
    heading.append(mask);
  });
  return text;
}

export function initHeroText() {
  const { gsap } = window;
  const hero = document.querySelector('#main .hero');
  if (!gsap || !hero) return () => {};
  const slides = Array.from(hero.querySelectorAll('.slide'));
  if (!slides.length) return () => {};

  const headings = slides.map((s) => s.querySelector('.slide-copy h1, .slide-copy h2')).filter(Boolean);
  const originals = headings.map((h) => [h, splitWords(h)]);

  const ctx = gsap.context(() => {}, hero);
  const timelines = new Map();

  const play = (slide) => {
    timelines.get(slide)?.kill();
    const q = (sel) => slide.querySelectorAll(sel);
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    ctx.add(() => {
      tl.fromTo(
        q('.hero-kicker'),
        { clipPath: 'inset(0% 100% 0% 0%)', opacity: 0 },
        { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 0.7, ease: 'power2.inOut' }
      )
        .fromTo(
          q('.hw > span'),
          { yPercent: 115, rotate: 6, transformOrigin: '0% 100%' },
          { yPercent: 0, rotate: 0, duration: 0.9, stagger: 0.055 },
          0.1
        )
        .fromTo(
          q('.slide-copy > p:not(.hero-kicker)'),
          { y: 26, opacity: 0, filter: 'blur(8px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.9, clearProps: 'filter' },
          0.45
        )
        .fromTo(
          q('.now-cta'),
          { y: 18, scale: 0.92, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.6)' },
          0.65
        )
        .fromTo(
          q('.now-cta'),
          { backgroundPosition: '120% 0' },
          { backgroundPosition: '-20% 0', duration: 1.1, ease: 'power2.inOut' },
          0.95
        );
    });
    timelines.set(slide, tl);
  };

  // The slider only flips classes, so watch for a slide turning active.
  const observer = new MutationObserver((records) => {
    records.forEach(({ target }) => {
      if (target.classList.contains('is-active') && !target.dataset.heroActive) {
        target.dataset.heroActive = '1';
        play(target);
      } else if (!target.classList.contains('is-active')) {
        delete target.dataset.heroActive;
      }
    });
  });
  slides.forEach((s) => observer.observe(s, { attributes: true, attributeFilter: ['class'] }));

  const first = slides.find((s) => s.classList.contains('is-active')) || slides[0];
  first.dataset.heroActive = '1';
  play(first);

  ctx.add(() => {
    gsap.from(hero.querySelectorAll('.hero-controls .tab, .hero-controls .hero-pause'), {
      y: 20,
      opacity: 0,
      duration: 0.7,
      stagger: 0.08,
      delay: 0.9,
      ease: 'power3.out',
      clearProps: 'transform,opacity',
    });
  });

  // Pointer drift: copy eases a few pixels against the cursor.
  const copies = slides.map((s) => s.querySelector('.slide-copy')).filter(Boolean);
  const fine = window.matchMedia('(pointer: fine)').matches;
  let onMove = null;
  let onLeave = null;
  if (fine && copies.length) {
    const movers = copies.map((el) => ({
      x: gsap.quickTo(el, 'x', { duration: 0.9, ease: 'power3.out' }),
      y: gsap.quickTo(el, 'y', { duration: 0.9, ease: 'power3.out' }),
    }));
    onMove = (e) => {
      const r = hero.getBoundingClientRect();
      const dx = (e.clientX - r.left) / r.width - 0.5;
      const dy = (e.clientY - r.top) / r.height - 0.5;
      movers.forEach((m) => {
        m.x(dx * -14);
        m.y(dy * -10);
      });
    };
    onLeave = () => movers.forEach((m) => {
      m.x(0);
      m.y(0);
    });
    hero.addEventListener('pointermove', onMove, { passive: true });
    hero.addEventListener('pointerleave', onLeave);
  }

  return () => {
    observer.disconnect();
    if (onMove) hero.removeEventListener('pointermove', onMove);
    if (onLeave) hero.removeEventListener('pointerleave', onLeave);
    timelines.forEach((tl) => tl.kill());
    ctx.revert();
    gsap.set(copies, { clearProps: 'transform' });
    slides.forEach((s) => delete s.dataset.heroActive);
    originals.forEach(([h, text]) => {
      h.textContent = text;
      h.removeAttribute('aria-label');
    });
  };
}
