/* 3D scroll entrance for page sections.

   Each top-level section in <main> starts tipped back in perspective (rotateX,
   pushed down and slightly shrunk) and flattens into place as it scrolls into
   view. It is scrubbed, so scrolling back up plays it in reverse.

   Skipped: the first section (already on screen at load), sections that are
   sticky themselves, and sections holding a sticky child — the tilt and scale
   would shift the stuck element off the edge it is meant to hold.

   Each section's title also rises and settles from 95% to 100% scale as it
   enters the viewport. It drives the standalone `translate` and `scale` CSS
   properties rather than `transform`, so it composes with the split-headline
   tweens in js/motion.js instead of fighting them for the same property. */

const SKIP = '.hero, .page-hero, .sol-sticky, [data-no-3d]';
const HAS_STICKY = '.sol-sticky-head, .sol-stack-card, .growth-intro, .cine-sticky, #why .sp-intro';

export function initScroll3D() {
  const { gsap, ScrollTrigger } = window;
  if (!gsap || !ScrollTrigger) return () => {};

  const forced = window.location.search.includes('motion=force');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches && !forced) {
    return () => {};
  }

  gsap.registerPlugin(ScrollTrigger);
  const narrow = window.matchMedia('(max-width: 900px)').matches;

  const titles = [];
  const ctx = gsap.context(() => {
    const sections = Array.from(document.querySelectorAll('#main > section'))
      .slice(1)
      .filter((el) => !el.matches(SKIP) && !el.querySelector(HAS_STICKY));

    sections.forEach((section) => {
      gsap.fromTo(
        section,
        {
          transformPerspective: 1400,
          // Hinge on the bottom edge so the top recedes; the section never
          // grows past the viewport width while tilted.
          transformOrigin: '50% 100%',
          rotateX: narrow ? 10 : 22,
          y: narrow ? 50 : 110,
          scale: narrow ? 0.96 : 0.9,
          opacity: 0.35,
        },
        {
          rotateX: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'top 35%',
            scrub: 0.8,
          },
        }
      );

      const title = section.querySelector('h2');
      if (!title) return;
      titles.push(title);
      const state = { y: narrow ? 24 : 40, scale: 0.95 };
      const apply = () => {
        title.style.translate = `0 ${state.y}px`;
        title.style.scale = String(state.scale);
      };
      apply();
      gsap.to(state, {
        y: 0,
        scale: 1,
        duration: 1.1,
        ease: 'power3.out',
        onUpdate: apply,
        scrollTrigger: {
          trigger: title,
          start: 'top 92%',
          toggleActions: 'play none none reverse',
        },
      });
    });
  });

  ScrollTrigger.refresh();
  return () => {
    ctx.revert();
    titles.forEach((el) => {
      el.style.translate = '';
      el.style.scale = '';
    });
  };
}
