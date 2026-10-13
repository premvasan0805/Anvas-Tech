/* Extra motion for the home page, top to bottom.

   - A thin bar in the logo colours along the top of the window fills as the
     page scrolls.
   - Headings that had no entrance of their own (Solutions title, the
     testimonials intro and photo stack, the newsletter head, the answer
     engine title) rise and unblur once as they come into view; the classes
     are added here and the look lives in styles.css (.hm-reveal).
   - Call-to-action buttons lean a little toward the pointer and spring back
     when it leaves. Uses the `translate` property so it never fights a
     button's own transform.

   Returns a cleanup function for the page's unmount. */
const REVEAL = [
  '.ask-shell > h2',
  '#solutions .sol-sticky-title',
  '#clients .clients-intro',
  '#clients .clients-stage',
  '.news-head',
];
const MAGNETIC = '.now-cta, .hero-cta, .cine-join, .cs-all';

export function initHomeMotion() {
  const main = document.getElementById('main');
  if (!main) return () => {};
  const off = [];

  const bar = document.createElement('div');
  bar.className = 'home-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.append(bar);
  let raf = 0;
  const paint = () => {
    raf = 0;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.setProperty('--p', max > 0 ? Math.min(1, window.scrollY / max).toFixed(4) : '0');
  };
  const onScroll = () => { if (!raf) raf = requestAnimationFrame(paint); };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  paint();
  off.push(() => {
    cancelAnimationFrame(raf);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    bar.remove();
  });

  const targets = REVEAL.flatMap((sel) => [...main.querySelectorAll(sel)]);
  targets.forEach((el) => el.classList.add('hm-reveal'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      io.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -12% 0px' });
  targets.forEach((el) => io.observe(el));
  off.push(() => io.disconnect());

  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    main.querySelectorAll(MAGNETIC).forEach((btn) => {
      const move = (e) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * 0.22;
        const y = (e.clientY - (r.top + r.height / 2)) * 0.32;
        btn.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
      };
      const leave = () => { btn.style.translate = ''; };
      btn.classList.add('hm-magnet');
      btn.addEventListener('pointermove', move);
      btn.addEventListener('pointerleave', leave);
      off.push(() => {
        btn.removeEventListener('pointermove', move);
        btn.removeEventListener('pointerleave', leave);
      });
    });
  }

  return () => off.forEach((fn) => fn());
}
