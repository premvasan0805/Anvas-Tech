/* Page motion for every route except home (which has its own hero and
   section effects). Bound from SiteChrome on each route change; it works
   from whatever components the page has, so pages need no markup for it.

   - Hero: the artwork settles from a zoom, then drifts slowly; the title
     rises word by word out of masks and the lede "generates" in word by word.
   - Section headings rise word by word as they scroll in.
   - Plates: tip up into place. A quad plate then lights one quadrant at a
     time while a rule fills across it; a flow plate walks down its rows,
     filling the spine to the next one.
   - Cards (capability cells, list cards, project cards): rise in a stagger;
     capability cells carry a cursor spotlight.
   - Steps: each step's rule draws in, then a pulse runs along each row.
   - Media frames: open from a clip while the image settles.
   - Full-bleed artwork bands: parallax behind their columns.
   - Ink closing bands: a slow drifting aura behind the copy.

   The word masks, step rules, runner and aura are injected here and removed
   on cleanup, and <main> gets .sp-motion so their CSS only applies while
   this runs. Not gated on prefers-reduced-motion, same as the home hero.
   Every entrance is a `from` tween that clears its props, so nothing stays
   hidden if GSAP is missing, and CSS hover transforms work again once a card
   has landed. */

const CLEAR = 'transform,opacity,filter,visibility';
// Bands that already run their own entrance (src/lib/scroll3d.js).
const OWNED = '#case-studies, #recognition, #now, #growth, #solutions, #projects';

/* Wraps each word of `el`'s text in spans, walking nested inline elements so
   links and emphasis survive. Returns the inner spans and an undo. */
function splitWords(el, mask) {
  const swaps = [];
  const words = [];
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    if (!node.textContent.trim()) return;
    const frag = document.createDocumentFragment();
    node.textContent.split(/(\s+)/).forEach((part) => {
      if (!part) return;
      if (/^\s+$/.test(part)) {
        frag.append(part);
        return;
      }
      const inner = document.createElement('span');
      inner.textContent = part;
      if (mask) {
        inner.className = 'gen-wi';
        const outer = document.createElement('span');
        outer.className = 'gen-w';
        outer.append(inner);
        frag.append(outer);
      } else {
        inner.className = 'gen-t';
        frag.append(inner);
      }
      words.push(inner);
    });
    const added = Array.from(frag.childNodes);
    node.replaceWith(frag);
    swaps.push([node, added]);
  });
  const undo = () =>
    swaps.forEach(([node, added]) => {
      if (!added[0]?.isConnected) return;
      added[0].replaceWith(node);
      added.slice(1).forEach((n) => n.remove());
    });
  return { words, undo };
}

export function initSolutionMotion(root) {
  const { gsap, ScrollTrigger } = window;
  if (!gsap || !ScrollTrigger || !root) return () => {};

  const narrow = window.matchMedia('(max-width: 900px)').matches;
  const stops = [];
  const on = (el, type, fn) => {
    el.addEventListener(type, fn);
    stops.push(() => el.removeEventListener(type, fn));
  };
  const inject = (parent, tag, className, before) => {
    const el = document.createElement(tag);
    el.className = className;
    el.setAttribute('aria-hidden', 'true');
    parent.insertBefore(el, before || null);
    stops.push(() => el.remove());
    return el;
  };
  const owned = (el) => !!el.closest(OWNED);
  const all = (sel) => Array.from(root.querySelectorAll(sel)).filter((el) => !owned(el));

  root.classList.add('sp-motion');
  stops.push(() => root.classList.remove('sp-motion'));

  /* Runs `loop` only while `el` is on screen. */
  const whileVisible = (el, loop) =>
    ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
    });

  const reveal = (targets, trigger, vars = {}) => {
    if (!targets.length || !trigger) return;
    gsap.from(targets, {
      autoAlpha: 0,
      y: narrow ? 30 : 56,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.12,
      clearProps: CLEAR,
      ...vars,
      scrollTrigger: { trigger, start: 'top 82%', once: true },
    });
  };

  const spotlight = (cards) =>
    cards.forEach((card) => {
      on(card, 'pointermove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--gx', `${e.clientX - r.left}px`);
        card.style.setProperty('--gy', `${e.clientY - r.top}px`);
      });
    });

  const ctx = gsap.context(() => {
    /* Hero ------------------------------------------------------------- */
    const hero = root.querySelector(':scope > .page-hero');
    if (hero) {
      const art = hero.querySelector('.hero-art');
      const media = art?.querySelector('img, video');
      const layer = art?.firstElementChild;
      if (media) gsap.from(media, { scale: 1.14, duration: 2.6, ease: 'power2.out', clearProps: 'transform' });
      if (layer) {
        gsap.set(layer, { display: 'block', width: '100%', height: '100%' });
        const drift = gsap.to(layer, {
          xPercent: -2.5,
          yPercent: 1.5,
          scale: 1.05,
          duration: 12,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 2.6,
        });
        whileVisible(hero, drift);
      }
      if (art) {
        gsap.to(art, {
          yPercent: 14,
          ease: 'none',
          scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
        });
      }

      const intro = gsap.timeline({ delay: 0.15 });
      const crumbs = hero.querySelector('.crumbs');
      if (crumbs) intro.from(crumbs, { autoAlpha: 0, y: 14, duration: 0.7, ease: 'power2.out', clearProps: CLEAR });
      const kicker = hero.querySelector('.kicker, .sp-eyebrow');
      if (kicker) intro.from(kicker, { autoAlpha: 0, x: -20, duration: 0.7, ease: 'power2.out', clearProps: CLEAR }, 0.1);
      // A hero marked data-own-title animates its title itself.
      const title = hero.hasAttribute('data-own-title') ? null : hero.querySelector('h1');
      if (title) {
        const { words, undo } = splitWords(title, true);
        stops.push(undo);
        intro.from(words, { yPercent: 115, rotate: 4, duration: 1.1, ease: 'power4.out', stagger: 0.07, clearProps: CLEAR }, 0.2);
      }
      hero.querySelectorAll('.lede').forEach((lede) => {
        const { words, undo } = splitWords(lede, false);
        stops.push(undo);
        intro.from(
          words,
          { opacity: 0.06, filter: 'blur(6px)', duration: 0.5, ease: 'power1.out', stagger: Math.min(0.035, 1.6 / words.length), clearProps: CLEAR },
          0.6
        );
      });
      const actions = hero.querySelectorAll('.actions > *, .sp-actions > *, .hero-cta');
      if (actions.length) intro.from(actions, { autoAlpha: 0, y: 18, duration: 0.7, ease: 'power3.out', stagger: 0.1, clearProps: CLEAR }, 1.1);
    }

    /* Contact page: its band stands in for the hero. */
    const ct = root.querySelector(':scope > .ct-band');
    if (ct) {
      const tl = gsap.timeline({ delay: 0.15 });
      const title = ct.querySelector('h1');
      if (title) {
        const { words, undo } = splitWords(title, true);
        stops.push(undo);
        tl.from(words, { yPercent: 115, rotate: 4, duration: 1.1, ease: 'power4.out', stagger: 0.07, clearProps: CLEAR });
      }
      const lede = ct.querySelector('.ct-lede');
      if (lede) {
        const { words, undo } = splitWords(lede, false);
        stops.push(undo);
        tl.from(words, { opacity: 0.06, filter: 'blur(6px)', duration: 0.5, ease: 'power1.out', stagger: 0.03, clearProps: CLEAR }, 0.4);
      }
      const asks = ct.querySelectorAll('.ct-ask-label, .ct-asks > *');
      if (asks.length) tl.from(asks, { autoAlpha: 0, y: 20, duration: 0.7, ease: 'power3.out', stagger: 0.07, clearProps: CLEAR }, 0.7);
      const form = ct.querySelector('.ct-form');
      if (form) {
        tl.from(form, { autoAlpha: 0, y: 50, rotateX: narrow ? 0 : 10, transformPerspective: 1200, duration: 1.1, ease: 'power3.out', clearProps: `${CLEAR},transformOrigin` }, 0.3)
          .from(form.children, { autoAlpha: 0, y: 18, duration: 0.6, ease: 'power3.out', stagger: 0.06, clearProps: CLEAR }, 0.6);
      }
    }

    /* Section headings ------------------------------------------------- */
    all(':scope > section:not(.page-hero) h2').forEach((h2) => {
      if (h2.closest('.sp-plate')) return;
      const { words, undo } = splitWords(h2, true);
      stops.push(undo);
      gsap.from(words, {
        yPercent: 110,
        rotate: 3,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.06,
        clearProps: CLEAR,
        scrollTrigger: { trigger: h2, start: 'top 88%', once: true },
      });
    });
    all('.sp-eyebrow, .kicker').forEach((el) => {
      if (el.closest('.page-hero')) return;
      gsap.from(el, {
        autoAlpha: 0,
        x: -24,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: CLEAR,
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      });
    });
    all('.sp-head > .sp-lede, .sp-intro > div:not(.sp-plate) > :is(p, .sp-actions)').forEach((el) => {
      reveal([el], el, { y: 28, duration: 0.9 });
    });

    /* Plates ----------------------------------------------------------- */
    all('.sp-plate, .sp-shot').forEach((plate) => {
      gsap.from(plate, {
        autoAlpha: 0,
        y: 70,
        rotateX: narrow ? 0 : 14,
        transformPerspective: 1200,
        transformOrigin: '50% 100%',
        duration: 1.3,
        ease: 'power3.out',
        clearProps: `${CLEAR},transformOrigin`,
        scrollTrigger: { trigger: plate, start: 'top 85%', once: true },
      });
      const items = Array.from(plate.querySelectorAll('.sp-quad li, .sp-flow-row'));
      if (!items.length) return;
      reveal(items, plate, { y: 24, stagger: 0.12, delay: 0.35 });

      // A flow plate is a sequence, so it steps faster than the quad cycle.
      const every = plate.classList.contains('is-flow') ? 1700 : 2400;
      plate.style.setProperty('--live-ms', `${every}ms`);
      let i = -1;
      const step = () => {
        items.forEach((li) => li.classList.remove('is-live'));
        i = (i + 1) % items.length;
        items[i]?.classList.add('is-live');
      };
      let timer = 0;
      ScrollTrigger.create({
        trigger: plate,
        start: 'top 80%',
        end: 'bottom top',
        onToggle: (self) => {
          clearInterval(timer);
          if (!self.isActive) return;
          step();
          timer = setInterval(step, every);
        },
      });
      stops.push(() => {
        clearInterval(timer);
        items.forEach((li) => li.classList.remove('is-live'));
        plate.style.removeProperty('--live-ms');
      });
    });

    /* Cards ------------------------------------------------------------ */
    all('.sp-grid').forEach((grid) => {
      const cells = Array.from(grid.querySelectorAll(':scope > .sp-cell, :scope > article, :scope > a'));
      reveal(cells, grid, {
        rotateX: narrow ? 0 : 18,
        transformPerspective: 1000,
        transformOrigin: '50% 0%',
        filter: 'blur(8px)',
        stagger: 0.13,
        clearProps: `${CLEAR},transformOrigin`,
      });
      spotlight(cells.filter((c) => c.matches('.sp-cell')));
    });
    all('.list-cards').forEach((list) => {
      const cards = Array.from(list.querySelectorAll('.list-card'));
      // List cards have their own spotlight (bindCardSpotlight in site.js).
      reveal(cards, list, { filter: 'blur(6px)', stagger: 0.1 });
    });
    all('.cs-grid').forEach((grid) => {
      reveal(Array.from(grid.children), grid, { y: narrow ? 40 : 80, stagger: 0.16, duration: 1.1 });
    });
    // Product cards: the frame swings up and wipes open from the bottom, the
    // screenshot settles out of a zoom, then the copy follows line by line.
    all('.sp-cards').forEach((grid) => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: grid, start: 'top 82%', once: true } });
      Array.from(grid.querySelectorAll(':scope > .sp-card')).forEach((card, i) => {
        const thumb = card.querySelector('.sp-card-thumb');
        const media = thumb?.querySelector('img, .sp-card-mark');
        const lines = Array.from(card.querySelectorAll('.sp-card-body > *'));
        const at = i * 0.18;
        tl.from(card, { autoAlpha: 0, y: narrow ? 40 : 90, duration: 1.1, ease: 'power3.out', clearProps: CLEAR }, at);
        if (thumb) {
          tl.from(thumb, {
            clipPath: 'inset(100% 0% 0% 0% round 12px)',
            rotateX: narrow ? 0 : 24,
            transformPerspective: 1100,
            transformOrigin: '50% 100%',
            duration: 1.2,
            ease: 'power4.out',
            clearProps: `${CLEAR},clipPath,transformOrigin`,
          }, at);
        }
        if (media) tl.from(media, { scale: 1.35, filter: 'blur(10px)', duration: 1.5, ease: 'power3.out', clearProps: 'scale,transform,filter' }, at + 0.1);
        tl.from(lines, { autoAlpha: 0, y: 22, duration: 0.7, ease: 'power3.out', stagger: 0.08, clearProps: CLEAR }, at + 0.45);
      });
    });
    // Route: the stops pop in along the line, then a consignment travels it on
    // a loop, filling the line behind it and lighting each stop it reaches.
    all('.sp-route').forEach((route) => {
      const items = Array.from(route.children);
      if (!items.length) return;
      // Stacked on narrow screens, the line runs down the side: stops still
      // light in turn, but nothing travels across.
      const fill = narrow ? null : inject(route, 'span', 'sp-route-fill');
      const truck = narrow ? null : inject(route, 'span', 'sp-route-truck');
      if (fill) gsap.set(fill, { width: `${((items.length - 1) / items.length) * 100}%` });
      const light = (i) => items.forEach((li, j) => {
        li.classList.toggle('is-lit', j <= i);
        li.classList.toggle('is-here', j === i);
      });
      stops.push(() => items.forEach((li) => li.classList.remove('is-lit', 'is-here')));

      const leg = 1.1;
      const loop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.6 });
      loop.call(() => light(-1));
      if (truck) {
        loop.set(fill, { scaleX: 0, autoAlpha: 1 });
        loop.set(truck, { left: '0%', autoAlpha: 0, scale: 0.4 });
        loop.to(truck, { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' });
      }
      items.forEach((li, i) => {
        if (i > 0 && truck) {
          // Stops sit at the start of equal columns.
          loop.to(fill, { scaleX: i / (items.length - 1), duration: leg, ease: 'power2.inOut' });
          loop.to(truck, { left: `${(i / items.length) * 100}%`, duration: leg, ease: 'power2.inOut' }, '<');
        }
        loop.call(() => light(i), null, truck ? '>' : `+=${i ? 0.7 : 0}`);
        loop.to({}, { duration: 0.55 });
      });
      if (truck) {
        loop.to(truck, { autoAlpha: 0, scale: 1.8, duration: 0.5, ease: 'power2.in' }, '+=0.6');
        loop.to(fill, { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, '<');
      } else {
        loop.to({}, { duration: 1.2 });
      }

      gsap.timeline({
        scrollTrigger: { trigger: route, start: 'top 85%', once: true },
        onComplete: () => {
          const st = whileVisible(route, loop);
          stops.push(() => st.kill());
        },
      })
        .from(items, {
          autoAlpha: 0,
          y: 30,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.14,
          clearProps: CLEAR,
        });
    });
    // Link cards tip up from lying back, unblurring as they land, one by one.
    all('.sp-links').forEach((links) =>
      reveal(Array.from(links.children), links, {
        y: narrow ? 40 : 90,
        rotateX: narrow ? -10 : -28,
        scale: 0.94,
        transformPerspective: 1100,
        transformOrigin: '50% 100%',
        filter: 'blur(8px)',
        duration: 1.1,
        stagger: 0.14,
      })
    );
    // Index rows each enter on their own trigger, so they arrive one by one
    // as the list scrolls up: rise, divider draws, then the row's parts.
    all('.sp-index > a').forEach((row) => {
      const line = inject(row, 'span', 'gen-line');
      const num = row.querySelector('.sp-index-num');
      const parts = Array.from(row.children).filter((el) => el !== line && el !== num);
      gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 90%', once: true } })
        .from(row, { autoAlpha: 0, y: narrow ? 30 : 60, duration: 0.9, ease: 'power3.out', clearProps: CLEAR })
        .from(line, { scaleX: 0, duration: 1, ease: 'power2.inOut' }, 0.1)
        .from(num, { autoAlpha: 0, x: -30, duration: 0.8, ease: 'power3.out', clearProps: CLEAR }, 0.2)
        .from(parts, { autoAlpha: 0, y: 20, duration: 0.7, ease: 'power3.out', stagger: 0.08, clearProps: CLEAR }, 0.3);
    });
    all('.stats-row').forEach((row) => reveal(Array.from(row.children), row, { y: 30, scale: 0.92, stagger: 0.1 }));
    all('.sp-rows, .sp-statement').forEach((el) => reveal([el], el, { y: 36 }));
    all('.sp-row').forEach((row) => reveal([row], row, { x: -40, y: 0, duration: 0.9 }));
    all('.award-tile').forEach((tile) => reveal([tile], tile, { y: 40, scale: 0.95, duration: 0.9 }));
    all('.prose, .prose-block').forEach((prose) => {
      const parts = Array.from(prose.querySelectorAll(':scope > :is(p, ul, ol, h3, blockquote)'));
      reveal(parts, prose, { y: 26, stagger: 0.08, duration: 0.9 });
    });

    /* Steps ------------------------------------------------------------ */
    all('.sp-steps').forEach((steps) => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: steps, start: 'top 80%', once: true },
      });
      const items = Array.from(steps.querySelectorAll(':scope > .sp-step'));
      items.forEach((li, n) => {
        const rule = inject(li, 'span', 'gen-rule', li.firstChild);
        const at = n * 0.24;
        tl.from(rule, { scaleX: 0, duration: 0.8, ease: 'power2.inOut' }, at);
        const num = li.querySelector('.sp-step-num');
        if (num) tl.from(num, { yPercent: 60, autoAlpha: 0, duration: 0.8, ease: 'power3.out', clearProps: CLEAR }, at + 0.15);
        const copy = li.querySelectorAll(':scope > :is(h3, p)');
        if (copy.length) tl.from(copy, { y: 22, autoAlpha: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08, clearProps: CLEAR }, at + 0.25);
      });

      if (narrow || !items.length) return;
      const runner = inject(steps, steps.tagName === 'OL' || steps.tagName === 'UL' ? 'li' : 'span', 'gen-runner');
      // One pass per row of the grid, so a 3-up layout runs every row.
      const rows = [...new Set(items.map((li) => li.offsetTop))];
      const run = gsap.timeline({ repeat: -1, repeatDelay: 0.8, paused: true });
      rows.forEach((top) => {
        run
          .set(runner, { x: 0, y: top })
          .to(runner, { autoAlpha: 1, duration: 0.3 })
          .to(runner, { x: () => steps.clientWidth - runner.offsetWidth, duration: 3, ease: 'power1.inOut' }, '<')
          .to(runner, { autoAlpha: 0, duration: 0.3 }, '-=0.3');
      });
      let landed = false;
      tl.call(() => {
        landed = true;
        run.play();
      }, null, '+=0.2');
      ScrollTrigger.create({
        trigger: steps,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => {
          if (!landed) return;
          self.isActive ? run.play() : run.pause();
        },
      });
    });

    /* Media frames ----------------------------------------------------- */
    all('.media-frame').forEach((frame) => {
      if (frame.closest('.page-hero')) return;
      const img = frame.querySelector('img, video');
      const tl = gsap.timeline({ scrollTrigger: { trigger: frame, start: 'top 85%', once: true } });
      tl.from(frame, { clipPath: 'inset(12% 12% 12% 12% round 24px)', autoAlpha: 0, duration: 1.3, ease: 'power3.out', clearProps: 'clipPath,opacity,visibility' });
      if (img) tl.from(img, { scale: 1.2, duration: 1.6, ease: 'power2.out', clearProps: 'transform' }, 0);
    });
    all('.wrap.split').forEach((split) => {
      const copy = split.querySelector(':scope > div:not(.media-frame)');
      if (copy) reveal(Array.from(copy.children), split, { y: 30, stagger: 0.09, duration: 0.9 });
    });

    /* Full-bleed artwork bands ----------------------------------------- */
    all('.sp-fits').forEach((fits) => {
      const bg = fits.querySelector(':scope > img');
      if (bg) {
        gsap.fromTo(
          bg,
          { yPercent: -8, scale: 1.18 },
          {
            yPercent: 8,
            scale: 1.18,
            ease: 'none',
            scrollTrigger: { trigger: fits, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        );
      }
      const areas = fits.querySelector('.sp-areas');
      if (areas) reveal(Array.from(areas.children), areas, { stagger: 0.16 });
    });

    /* Closing bands ---------------------------------------------------- */
    all('.sp-close, .cta-band').forEach((close) => {
      reveal(Array.from(close.children).filter((el) => el.tagName !== 'H2'), close, { y: 30, stagger: 0.1 });
    });
    all(':scope > section.sp-band.is-ink').forEach((band) => {
      const aura = inject(band, 'div', 'gen-aura', band.firstChild);
      const drift = gsap.to(aura, {
        keyframes: [
          { xPercent: 18, yPercent: -12, scale: 1.15, duration: 6 },
          { xPercent: -10, yPercent: 10, scale: 0.95, duration: 6 },
          { xPercent: 0, yPercent: 0, scale: 1, duration: 6 },
        ],
        ease: 'sine.inOut',
        repeat: -1,
      });
      whileVisible(band, drift);
    });
  }, root);

  return () => {
    ctx.revert();
    stops.reverse().forEach((stop) => stop());
  };
}
