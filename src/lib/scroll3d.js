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

// #case-studies has its own entrance (initCaseReveal).
const SKIP = '.hero, .page-hero, .sol-sticky, #case-studies, [data-no-3d]';
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

/* Solutions stack: each card rolls up into view as if over a drum. It enters
   from the bottom of the screen with its lower edge tipped away, a little
   low, small and faded, and flattens out as it rises, well before it reaches
   its sticky spot and slides over the card before it. Scrubbed, so
   scrolling back up rolls it back down.

   Not gated on prefers-reduced-motion: Windows sets that flag whenever its
   animations are off, and the stack is meant to move regardless. */
export function initCardRoll() {
  const { gsap, ScrollTrigger } = window;
  if (!gsap || !ScrollTrigger) return () => {};
  gsap.registerPlugin(ScrollTrigger);
  const narrow = window.matchMedia('(max-width: 900px)').matches;

  const ctx = gsap.context(() => {
    document.querySelectorAll('#solutions .sol-stack-card').forEach((card) => {
      gsap.fromTo(
        card,
        {
          transformPerspective: 1200,
          transformOrigin: '50% 0%',
          rotateX: narrow ? -22 : -38,
          y: narrow ? 40 : 90,
          scale: 0.94,
          opacity: 0.45,
        },
        {
          rotateX: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'top 62%',
            scrub: 0.5,
          },
        }
      );
    });
  });

  ScrollTrigger.refresh();
  return () => ctx.revert();
}

/* "How We Build" cards: each one swings in like a door on a hinge at its
   right edge, starting turned away from the reader and pushed right, and
   closes flat as it scrolls up. The icon flips in on its own vertical axis a
   beat behind the card. A sideways turn (rotateY), so it reads differently
   from the tipped-back rotateX entrances on every other section. Scrubbed,
   so scrolling back up swings the cards open again.

   Not gated on prefers-reduced-motion, same as the card roll above. */
export function initGrowthSwing() {
  const { gsap, ScrollTrigger } = window;
  if (!gsap || !ScrollTrigger) return () => {};
  gsap.registerPlugin(ScrollTrigger);
  const narrow = window.matchMedia('(max-width: 900px)').matches;

  const ctx = gsap.context(() => {
    document.querySelectorAll('#growth .growth-card').forEach((card) => {
      const trigger = {
        trigger: card,
        start: 'top bottom',
        end: narrow ? 'top 70%' : 'top 55%',
        scrub: 0.6,
      };

      gsap.fromTo(
        card,
        {
          transformPerspective: 1100,
          transformOrigin: '100% 50%',
          rotateY: narrow ? -28 : -62,
          x: narrow ? 30 : 90,
          opacity: 0.2,
        },
        { rotateY: 0, x: 0, opacity: 1, ease: 'power2.out', scrollTrigger: trigger }
      );

      const icon = card.querySelector('.growth-ico img');
      if (!icon) return;
      gsap.fromTo(
        icon,
        { transformPerspective: 500, rotateY: -180, scale: 0.6, opacity: 0 },
        {
          rotateY: 0,
          scale: 1,
          opacity: 1,
          ease: 'back.out(1.6)',
          scrollTrigger: { ...trigger, start: 'top 92%' },
        }
      );
    });
  });

  ScrollTrigger.refresh();
  return () => ctx.revert();
}

/* "Built for Today" band on the home page. It sits inside .home-wrap, not
   directly in <main>, so the section entrance above never reaches it.

   Plays once as it comes into view: each headline line rises out of its
   mask, the copy and button follow, the portrait opens from a horizontal
   slit while settling from a slight zoom, and the facts rise in turn as
   their underlines draw left to right and the numeric ones count up. The
   portrait then drifts a little against the scroll for depth.

   Not gated on prefers-reduced-motion, same as the card roll above. */
export function initNowReveal() {
  const { gsap, ScrollTrigger } = window;
  const band = document.getElementById('now');
  if (!gsap || !ScrollTrigger || !band) return () => {};
  gsap.registerPlugin(ScrollTrigger);

  const nums = Array.from(band.querySelectorAll('.now-num'));
  const original = nums.map((el) => el.textContent);

  const ctx = gsap.context(() => {
    const intro = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: { trigger: band, start: 'top 72%', once: true },
    });

    intro
      .from('.now-line > span', { yPercent: 110, duration: 0.9, stagger: 0.12 })
      .from(
        '.now-copy > p, .now-copy > .now-cta, .now-mobile-img',
        { y: 28, opacity: 0, duration: 0.7, stagger: 0.1 },
        0.35
      )
      .fromTo(
        '.now-media',
        { clipPath: 'inset(22% 0% 22% 0% round 8px)' },
        { clipPath: 'inset(0% 0% 0% 0% round 8px)', duration: 1.2, ease: 'expo.out' },
        0.15
      )
      .from('.now-media img', { scale: 1.2, duration: 1.4, ease: 'expo.out' }, 0.15);

    const facts = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: { trigger: '.now-facts', start: 'top 88%', once: true },
    });
    facts
      .from('.now-fact', { y: 32, opacity: 0, duration: 0.7, stagger: 0.1 })
      .fromTo('.now-fact', { '--line': 0 }, { '--line': 1, duration: 0.9, stagger: 0.1 }, 0.15);

    // "11+" and "7+" count up; worded facts ("Multiple", "AI-First") just rise.
    nums.forEach((el, i) => {
      const m = original[i].trim().match(/^(\d+)(\D*)$/);
      if (!m) return;
      const counter = { n: 0 };
      facts.to(
        counter,
        {
          n: Number(m[1]),
          duration: 1.2,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = `${Math.round(counter.n)}${m[2]}`;
          },
        },
        0.1 + i * 0.1
      );
    });

    gsap.fromTo(
      '.now-media img',
      { yPercent: -4 },
      {
        yPercent: 4,
        ease: 'none',
        immediateRender: false,
        scrollTrigger: { trigger: band, start: 'top bottom', end: 'bottom top', scrub: true },
      }
    );
  }, band);

  ScrollTrigger.refresh();
  return () => {
    ctx.revert();
    nums.forEach((el, i) => {
      el.textContent = original[i];
    });
  };
}

/* "What We Build" band on the home page.

   Plays once as it comes into view: the kicker slides in, each headline line
   rises out of its mask, the intro follows, then the product cards wipe open
   left to right one after another with their arrows sliding in a beat behind.
   On the right, the three logo columns climb in turn while their tiles pop
   up from a slight shrink, and the connector lines fade in last. The columns
   then drift at different rates against the scroll for depth.

   Not gated on prefers-reduced-motion, same as the card roll above. */
export function initRecogReveal() {
  const { gsap, ScrollTrigger } = window;
  const band = document.getElementById('recognition');
  if (!gsap || !ScrollTrigger || !band) return () => {};
  gsap.registerPlugin(ScrollTrigger);
  const narrow = window.matchMedia('(max-width: 900px)').matches;
  const cols = Array.from(band.querySelectorAll('.award-col'));

  const ctx = gsap.context(() => {
    gsap
      .timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: '.recog-split', start: 'top 75%', once: true },
      })
      .from('.recog-kicker', { x: -24, opacity: 0, duration: 0.6 })
      .from('.now-line > span', { yPercent: 110, duration: 0.9, stagger: 0.12 }, 0.1)
      .from('.recog-split .lede', { y: 24, opacity: 0, duration: 0.7 }, 0.45)
      .fromTo(
        '.gartner-card',
        { x: narrow ? -24 : -48, opacity: 0, clipPath: 'inset(0% 100% 0% 0% round 8px)' },
        {
          x: 0,
          opacity: 1,
          clipPath: 'inset(0% 0% 0% 0% round 8px)',
          duration: 0.9,
          ease: 'expo.out',
          stagger: 0.12,
          clearProps: 'transform,opacity,clipPath',
        },
        0.6
      )
      .from(
        '.gartner-card .go',
        { x: -16, opacity: 0, duration: 0.5, stagger: 0.12, clearProps: 'transform,opacity' },
        0.9
      );

    gsap
      .timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: '.award-web', start: 'top 80%', once: true },
      })
      .from('.award-col', { y: narrow ? 50 : 120, opacity: 0, duration: 1.1, stagger: 0.15 })
      .from(
        '.award-tile',
        { scale: 0.82, opacity: 0, duration: 0.7, ease: 'back.out(1.7)', stagger: { each: 0.025, from: 'random' } },
        0.2
      )
      .from('.award-lines', { opacity: 0, duration: 0.8 }, 0.9);

    // The tracks' CSS marquee owns `transform` and the intro owns the
    // columns' transform, so the drift drives the standalone `translate`.
    if (!narrow) {
      cols.forEach((col, i) => {
        const shift = i % 2 ? 40 : -40;
        const state = { y: -shift };
        const apply = () => {
          col.style.translate = `0 ${state.y}px`;
        };
        apply();
        gsap.to(state, {
          y: shift,
          ease: 'none',
          onUpdate: apply,
          scrollTrigger: { trigger: band, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
    }
  }, band);

  ScrollTrigger.refresh();
  return () => {
    ctx.revert();
    cols.forEach((col) => {
      col.style.translate = '';
    });
  };
}

/* "Products We Have Built" band on the home page, and only that band: the
   section entrance above skips it.

   Plays once as it comes into view: the heading rises out of its mask, the
   intro and "See all" link follow, then the four cards climb in one after
   another, tipped back on their top edge and flattening as they land. Each
   card's photo opens upward from the bottom while settling from a zoom, and
   its eyebrow and title rise a beat behind.

   Not gated on prefers-reduced-motion, same as the card roll above. */
export function initCaseReveal() {
  const { gsap, ScrollTrigger } = window;
  const band = document.getElementById('case-studies');
  if (!gsap || !ScrollTrigger || !band) return () => {};
  gsap.registerPlugin(ScrollTrigger);
  const narrow = window.matchMedia('(max-width: 900px)').matches;

  const ctx = gsap.context(() => {
    // Set, not tweened: a from() would carry the perspective down to 0.
    gsap.set('.cs-card', { transformPerspective: 1200, transformOrigin: '50% 0%' });

    gsap
      .timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: band, start: 'top 70%', once: true },
      })
      .from('.now-line > span', { yPercent: 110, duration: 0.9 })
      .from('.cs-head-copy > p', { y: 24, opacity: 0, duration: 0.7 }, 0.2)
      .from('.cs-all', { x: 24, opacity: 0, duration: 0.7 }, 0.3);

    gsap
      .timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: '.cs-grid', start: 'top 85%', once: true },
      })
      .from('.cs-card', {
        rotateX: narrow ? -14 : -24,
        y: narrow ? 60 : 110,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        clearProps: 'transform,opacity',
      })
      .fromTo(
        '.cs-card-media',
        { clipPath: 'inset(100% 0% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'expo.out', stagger: 0.12, clearProps: 'clipPath' },
        0.15
      )
      .from('.cs-card-media img', { scale: 1.3, duration: 1.3, ease: 'expo.out', stagger: 0.12, clearProps: 'transform' }, 0.15)
      .from(
        '.cs-card-num, .cs-card-eyebrow, .cs-card-body h3',
        { y: 18, opacity: 0, duration: 0.6, stagger: 0.06, clearProps: 'transform,opacity' },
        0.35
      );
  }, band);

  ScrollTrigger.refresh();
  return () => ctx.revert();
}

/* Home hero: as the page scrolls, the full-bleed hero pulls in from the
   edges into a rounded card and lifts away, its copy rising and fading a
   little faster than the frame, so the white ask panel reads as sliding up
   over it. Scrubbed over the hero's own height, so scrolling back up opens
   it out to full bleed again. */
export function initHeroCollapse() {
  const { gsap, ScrollTrigger } = window;
  const hero = document.querySelector('#main > .hero');
  if (!gsap || !ScrollTrigger || !hero) return () => {};
  gsap.registerPlugin(ScrollTrigger);
  const narrow = window.matchMedia('(max-width: 900px)').matches;
  const side = narrow ? 6 : 12;

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: '65% top',
        scrub: 0.6,
      },
    });
    tl.fromTo(
      hero,
      { clipPath: 'inset(0% 0% 0% 0% round 0px)' },
      { clipPath: `inset(8% ${side}% 24% ${side}% round ${narrow ? 28 : 56}px)` },
      0
    )
      .fromTo(hero.querySelector('.hero-flow'), { scale: 1 }, { scale: 1.2 }, 0)
      .fromTo(
        hero.querySelector('.hero-slides'),
        { yPercent: 0, scale: 1, opacity: 1 },
        { yPercent: -28, scale: 0.86, opacity: 0, ease: 'power1.in' },
        0
      )
      .fromTo(hero.querySelector('.hero-controls'), { opacity: 1 }, { opacity: 0, duration: 0.4 }, 0);
  });

  ScrollTrigger.refresh();
  return () => ctx.revert();
}

/* Home "Let's build something extraordinary." statement, scrubbed across
   the band's sticky run so scrolling back up plays it in reverse:

   1. Letters fly in from scattered 3D positions, blurred and tumbling, and
      lock into the line one after another, left to right.
   2. A colour wave runs through "extraordinary." (blue into violet) while an
      underline draws beneath it.
   3. The line holds, breathing slightly larger, with two soft glows drifting
      behind it; the whole line leans toward the pointer.
   4. As the case-study band slides up over it, the line sinks back. */
export function initBuildReveal() {
  const { gsap, ScrollTrigger } = window;
  const band = document.querySelector('.build-reveal');
  if (!gsap || !ScrollTrigger || !band) return () => {};
  gsap.registerPlugin(ScrollTrigger);
  const stage = band.querySelector('.build-reveal-stage');
  const text = band.querySelector('.build-reveal-text');
  if (!stage || !text) return () => {};

  // The band tucks under the testimonials by a screen at most, but never by
  // more than the testimonials are tall, or it pokes out above them.
  const prev = band.previousElementSibling;
  const tuck = () => {
    if (!prev) return;
    band.style.marginTop = -Math.min(prev.offsetHeight, window.innerHeight) + 'px';
  };
  tuck();
  ScrollTrigger.addEventListener('refreshInit', tuck);

  // Split each word into letters; keep the words for the undo.
  const words = Array.from(text.querySelectorAll('.brw > span'));
  const saved = words.map((w) => w.textContent);
  text.setAttribute('aria-label', text.textContent.replace(/\s+/g, ' ').trim());
  const chars = [];
  words.forEach((w) => {
    const letters = Array.from(w.textContent);
    w.textContent = '';
    letters.forEach((ch) => {
      const c = document.createElement('span');
      c.className = 'brc';
      c.setAttribute('aria-hidden', 'true');
      c.textContent = ch;
      w.append(c);
      chars.push(c);
    });
  });
  const last = words[words.length - 1];
  const hero = Array.from(last.querySelectorAll('.brc'));
  const line = document.createElement('span');
  line.className = 'br-line';
  line.setAttribute('aria-hidden', 'true');
  last.parentElement.append(line);
  const glows = ['is-a', 'is-b'].map((k) => {
    const g = document.createElement('span');
    g.className = `br-glow ${k}`;
    g.setAttribute('aria-hidden', 'true');
    stage.prepend(g);
    return g;
  });

  // Fixed per-letter scatter, so scrubbing back and forth retraces the same path.
  const rnd = (i, k) => {
    const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };
  const narrow = window.matchMedia('(max-width: 900px)').matches;
  const spread = narrow ? 0.5 : 1;

  const ctx = gsap.context(() => {
    gsap.set(text, { transformPerspective: 1200 });
    gsap.set(chars, { transformPerspective: 900 });
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: band, start: '8% top', end: '62% top', scrub: 0.7 },
    });
    tl.fromTo(
      chars,
      {
        opacity: 0,
        filter: 'blur(14px)',
        x: (i) => (rnd(i, 1) - 0.5) * 900 * spread,
        y: (i) => (rnd(i, 2) - 0.5) * 700 * spread,
        z: (i) => -600 + rnd(i, 3) * 900,
        rotation: (i) => (rnd(i, 4) - 0.5) * 220,
        rotationX: (i) => (rnd(i, 5) - 0.5) * 180,
        scale: (i) => 0.3 + rnd(i, 6) * 1.6,
      },
      {
        opacity: 1,
        filter: 'blur(0px)',
        x: 0,
        y: 0,
        z: 0,
        rotation: 0,
        rotationX: 0,
        scale: 1,
        ease: 'power3.out',
        duration: 1,
        stagger: { each: 1.6 / chars.length },
      },
      0
    )
      .to(
        hero,
        {
          color: (i) => gsap.utils.interpolate(['#0f5fdc', '#5b3df5', '#a10bfd'], i / Math.max(1, hero.length - 1)),
          y: -10,
          duration: 0.5,
          stagger: { each: 0.05, yoyo: false },
          ease: 'sine.inOut',
        },
        2.4
      )
      .to(hero, { y: 0, duration: 0.5, stagger: 0.05, ease: 'sine.inOut' }, 2.65)
      .fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'power2.inOut' }, 2.45)
      .to(text, { scale: 1.06, duration: 0.6, ease: 'sine.inOut' }, 3.0)
      .to(glows[0], { xPercent: 40, yPercent: -25, scale: 1.3, duration: 5.6 }, 0)
      .to(glows[1], { xPercent: -45, yPercent: 30, scale: 1.2, duration: 5.6 }, 0)
      .fromTo(glows, { opacity: 0 }, { opacity: 1, duration: 1.5 }, 0.8)
      .to(text, { scale: 0.9, opacity: 0.35, filter: 'blur(4px)', duration: 2, ease: 'power1.in' }, 3.6);

    // Lean toward the pointer while the stage is on screen.
    if (window.matchMedia('(hover: hover)').matches) {
      const rx = gsap.quickTo(text, 'rotationX', { duration: 0.8, ease: 'power3.out' });
      const ry = gsap.quickTo(text, 'rotationY', { duration: 0.8, ease: 'power3.out' });
      const move = (e) => {
        const r = stage.getBoundingClientRect();
        rx(((e.clientY - r.top) / r.height - 0.5) * -10);
        ry(((e.clientX - r.left) / r.width - 0.5) * 14);
      };
      const leave = () => { rx(0); ry(0); };
      stage.addEventListener('pointermove', move);
      stage.addEventListener('pointerleave', leave);
      return () => {
        stage.removeEventListener('pointermove', move);
        stage.removeEventListener('pointerleave', leave);
      };
    }
  });

  ScrollTrigger.refresh();
  return () => {
    ScrollTrigger.removeEventListener('refreshInit', tuck);
    ctx.revert();
    line.remove();
    glows.forEach((g) => g.remove());
    words.forEach((w, i) => { w.textContent = saved[i]; });
    text.removeAttribute('aria-label');
    band.style.marginTop = '';
  };
}
