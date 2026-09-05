/* ==========================================================================
   motion.js — GSAP + ScrollTrigger motion layer for the AnvasTech site.

   Loads after js/site.js, which injects the header and footer synchronously,
   so the DOM is complete by the time this runs.

   Failure policy: if GSAP is missing (CDN blocked, offline), or the visitor
   prefers reduced motion, this file strips .motion-ready from <html> and
   returns. Nothing stays hidden, nothing stays covered.
   ========================================================================== */
(function () {
  "use strict";

  const html = document.documentElement;

  // ?motion=force overrides the reduced-motion opt-out. It exists so the layer
  // can be reviewed on machines (and automation browsers) that report "reduce"
  // by default. It never changes behaviour for a normal visit.
  const forced = window.location.search.indexOf("motion=force") > -1;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches && !forced;
  const hasGsap = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";

  if (reduced || !hasGsap) {
    html.classList.remove("motion-ready");
    return;
  }

  const gsap = window.gsap;
  gsap.registerPlugin(window.ScrollTrigger);
  const ScrollTrigger = window.ScrollTrigger;

  const DESKTOP = window.matchMedia("(min-width: 901px)");
  const FINE_POINTER = window.matchMedia("(hover: hover) and (pointer: fine)");
  const EASE = "power3.out";

  const all = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  /* ------------------------------------------------------------------------
     Teardown — the one path back to a plain, fully visible page.
     Called by the watchdog below and by the boot catch. Must be safe to run
     at any point, including before some effects have been set up.
     ---------------------------------------------------------------------- */
  let torn = false;
  function disableMotion(reason) {
    if (torn) return;
    torn = true;
    try { ScrollTrigger.getAll().forEach((t) => t.kill(false)); } catch (e) { /* noop */ }
    try {
      gsap.set("[data-anim], .split-word, [data-parallax], .site-header .header-bar > *, .cine-frame, .cine-frame img, .cine-copy", {
        clearProps: "all",
      });
    } catch (e) { /* noop */ }
    all("[data-anim], .split-word, [data-parallax]").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
      el.style.filter = "none";
    });
    all(".site-header .header-bar > *").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    html.classList.remove("motion-ready");
    html.classList.add("motion-loaded", "motion-curtain-done");
    if (reason) console.warn("[motion] disabled:", reason);
  }

  /* ------------------------------------------------------------------------
     Watchdog — GSAP's ticker runs on requestAnimationFrame, which a browser
     may throttle to zero (background tab, power saving, some embedded views).
     A frozen ticker leaves every from()-style tween parked on its start value,
     i.e. an invisible logo and invisible headlines. If the ticker has not
     produced frames shortly after boot, fall back to the static page.
     ---------------------------------------------------------------------- */
  function watchdog() {
    // A hidden tab has no animation frames by design, and that is not a fault:
    // nobody is looking at it, and GSAP catches up when it is shown. Only judge
    // the ticker while the page is actually visible.
    if (document.visibilityState !== "visible") {
      document.addEventListener("visibilitychange", function once() {
        if (document.visibilityState !== "visible") return;
        document.removeEventListener("visibilitychange", once);
        watchdog();
      });
      return;
    }

    let frames = 0;
    const count = () => { frames += 1; };
    gsap.ticker.add(count);
    window.setTimeout(() => {
      gsap.ticker.remove(count);
      if (document.visibilityState !== "visible") return;
      if (frames < 5) disableMotion("animation frames are not running");
    }, 3000);
  }

  /* ------------------------------------------------------------------------
     1. Page-load curtain
     The curtain is a pair of pseudo-elements already painted by motion.css.
     Lifting it is a class flip; the content intro rides on the same beat.
     ---------------------------------------------------------------------- */
  function curtain() {
    let lifted = false;

    // Never route this through requestAnimationFrame: rAF does not fire while a
    // tab is hidden, so a link opened in a background tab would sit behind the
    // curtain until it was focused. setTimeout keeps running either way.
    const lift = () => {
      if (lifted) return;
      lifted = true;
      html.classList.add("motion-loaded");
      // Match the 0.85s transition in motion.css, then drop the layers.
      window.setTimeout(() => html.classList.add("motion-curtain-done"), 900);
      introHeader();
    };

    // Give fonts a beat so the split headlines do not reflow mid-animation.
    const ready = document.fonts && document.fonts.ready
      ? document.fonts.ready
      : Promise.resolve();

    Promise.race([ready, new Promise((r) => window.setTimeout(r, 1200))]).then(lift, lift);

    // Hard backstop: whatever happens above, the curtain comes up.
    window.setTimeout(lift, 2500);
  }

  function introHeader() {
    const bar = document.querySelector(".site-header .header-bar");
    if (!bar) return;
    const bits = [
      document.querySelector(".site-header .logo"),
      ...all(".nav-desktop .nav-item", bar),
      ...all(".header-actions > *, .header-bar > :not(.nav-desktop)", bar),
    ].filter(Boolean);

    const tween = gsap.from(bits, {
      y: -18,
      opacity: 0,
      duration: 0.7,
      ease: EASE,
      stagger: 0.045,
      delay: 0.45,
      clearProps: "all",
    });

    // The header is navigation, not decoration: force the tween to its end
    // state on a timer so a stalled ticker can never leave the logo hidden.
    window.setTimeout(() => {
      if (tween.progress() < 1) tween.progress(1);
      gsap.set(bits, { clearProps: "all" });
    }, 2200);
  }

  /* ------------------------------------------------------------------------
     2. Split-text headlines
     Walks child nodes so <br>, <span> and <strong> survive intact: text nodes
     become word spans, element children are treated as single atomic words.
     ---------------------------------------------------------------------- */
  function splitHeadline(el) {
    if (el.dataset.split === "done") return [];
    const lines = [];
    let line = document.createElement("span");
    line.className = "split-line";

    const flush = () => {
      if (line.childNodes.length) lines.push(line);
      line = document.createElement("span");
      line.className = "split-line";
    };

    Array.from(el.childNodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const parts = node.textContent.split(/(\s+)/);
        parts.forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            line.appendChild(document.createTextNode(part));
            return;
          }
          const word = document.createElement("span");
          word.className = "split-word";
          word.textContent = part;
          line.appendChild(word);
        });
      } else if (node.nodeName === "BR") {
        flush();
      } else {
        const word = document.createElement("span");
        word.className = "split-word";
        word.appendChild(node.cloneNode(true));
        line.appendChild(word);
      }
    });
    flush();

    el.innerHTML = "";
    lines.forEach((l) => el.appendChild(l));
    el.dataset.split = "done";
    return all(".split-word", el);
  }

  function headlines() {
    const narrow = window.matchMedia("(max-width: 768px)").matches;
    const targets = all(
      [
        ".hero .slide-copy h1",
        ".hero .slide-copy h2",
        ".page-hero h1",
        ".ai-slide-copy h2",
        "h2.display",
        ".career-head h2",
        ".news-box h2",
      ].join(",")
    );

    targets.forEach((el) => {
      const inHero = !!el.closest(".hero, .page-hero");

      // Phones: animate the whole headline — word-split reflows break layout.
      if (narrow) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: EASE,
            delay: inHero ? 0.55 : 0,
            scrollTrigger: inHero
              ? undefined
              : { trigger: el, start: "top 88%", once: true },
          }
        );
        return;
      }

      const words = splitHeadline(el);
      if (!words.length) return;

      gsap.to(words, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.95,
        ease: EASE,
        stagger: 0.035,
        delay: inHero ? 0.75 : 0,
        scrollTrigger: inHero
          ? undefined
          : { trigger: el, start: "top 85%", once: true },
      });
    });
  }

  /* ------------------------------------------------------------------------
     3. Generic reveals — supporting copy, links, form rows
     ---------------------------------------------------------------------- */
  function reveals() {
    const sel = [
      ".lede",
      ".prose",
      ".section .actions",
      ".link-arrow",
      ".crumbs",
      ".news-form",
      ".ai-slide-copy p",
      ".stat span",
      ".clients-quote.is-active > p",
      ".clients-quote.is-active .clients-who",
      ".career-head p",
      ".career-strip h3",
    ].join(",");

    all(sel).forEach((el) => {
      if (el.closest(".site-header, .site-footer, .hero")) return;
      el.setAttribute("data-anim", "rise");
      gsap.to(el, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: EASE,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });
  }

  /* ------------------------------------------------------------------------
     4. Card grids — stacked rise with a slight 3D tilt, staggered per row
     ---------------------------------------------------------------------- */
  function cards() {
    const groups = [
      ".cards-3",
      ".list-cards",
      ".ai-eps",
      ".recog-split > div:first-child",
      ".collage",
      ".career-imgs",
    ];

    groups.forEach((groupSel) => {
      all(groupSel).forEach((group) => {
        const items = all(
          ".hl-card, .service-card, .card, .list-card, .gartner-card, a, img",
          group
        ).filter((el) => el.parentElement === group || el.closest(groupSel) === group);

        // Keep only top-level children of the group so nested imgs don't double up.
        const unique = Array.from(new Set(items.map((el) => {
          let node = el;
          while (node.parentElement && node.parentElement !== group) node = node.parentElement;
          return node;
        })));

        if (!unique.length) return;

        unique.forEach((el) => el.setAttribute("data-anim", "card"));

        gsap.to(unique, {
          y: 0,
          scale: 1,
          opacity: 1,
          rotateX: 0,
          duration: 0.9,
          ease: EASE,
          stagger: 0.09,
          scrollTrigger: { trigger: group, start: "top 82%", once: true },
        });
      });
    });

    gsap.set(".service-card, .card, .list-card", { transformPerspective: 900 });
  }

  /* ------------------------------------------------------------------------
     5. Parallax — scrub-linked background drift on every large image
     ---------------------------------------------------------------------- */
  function parallax() {
    const media = [
      { sel: ".ai-slide-bg img", shift: 90 },
      { sel: ".media-frame img", shift: 55 },
      { sel: ".collage img", shift: 40 },
      { sel: ".collage img", shift: 40 },
    ];

    media.forEach(({ sel, shift }) => {
      all(sel).forEach((img) => {
        img.setAttribute("data-parallax", "");
        if (!DESKTOP.matches) return;
        gsap.fromTo(
          img,
          { yPercent: -shift / 10, scale: 1.14 },
          {
            yPercent: shift / 10,
            scale: 1.14,
            ease: "none",
            scrollTrigger: {
              trigger: img.closest("section, article, .media-frame, .collage") || img,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );
      });
    });
  }

  /* ------------------------------------------------------------------------
     6. Number counters — preserves the original suffix ("+", "K+")
     ---------------------------------------------------------------------- */
  function counters() {
    all(".stats-row .stat b").forEach((el) => {
      const raw = el.textContent.trim();
      const match = raw.match(/^([\d,.]+)(.*)$/);
      if (!match) return;

      const hadComma = match[1].includes(",");
      const target = parseFloat(match[1].replace(/,/g, ""));
      const suffix = match[2];
      if (!isFinite(target)) return;

      const counter = { value: 0 };
      el.textContent = "0" + suffix;

      gsap.to(counter, {
        value: target,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
        onUpdate() {
          const n = Math.round(counter.value);
          el.textContent = (hadComma ? n.toLocaleString("en-US") : String(n)) + suffix;
        },
      });
    });
  }

  /* ------------------------------------------------------------------------
     7. Pinned scrub sections (desktop only — pins on small screens read as
        a broken page more often than as an effect)
     ---------------------------------------------------------------------- */
  function pins() {
    if (!DESKTOP.matches) return;

    // 7a. Stats resolve in sequence as the band arrives.
    //     Deliberately NOT pinned: the row is only ~120px tall, so pinning it
    //     parks a short strip mid-viewport and leaves a screen-tall hole above
    //     it. Scrubbing without a pin gives the same staged reveal, no hole.
    const statsRow = document.querySelector(".recog-band .stats-row");
    if (statsRow) {
      const stats = all(".stat", statsRow);
      gsap.set(stats, { transformOrigin: "left bottom" });
      gsap.fromTo(
        stats,
        { opacity: 0.12, y: 40, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "none",
          stagger: 0.4,
          scrollTrigger: {
            trigger: statsRow,
            start: "top 92%",
            end: "top 42%",
            scrub: 0.8,
          },
        }
      );
    }

    // 7b. "Ready for Now" — the section holds while the portrait unscales
    //     and the copy climbs past it.
    const split = document.querySelector(".section .split.reverse");
    if (split) {
      const section = split.closest("section");
      const frame = split.querySelector(".media-frame");
      const copy = split.querySelector(":scope > div:not(.media-frame)");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "center 60%",
          end: "+=60%",
          scrub: 0.7,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      if (frame) tl.fromTo(frame, { scale: 0.82, rotate: -3 }, { scale: 1, rotate: 0, ease: "none" }, 0);
      if (copy) tl.fromTo(copy, { y: 60 }, { y: -20, ease: "none" }, 0);
    }
  }

  /* ------------------------------------------------------------------------
     8. Award marquees react to scroll velocity
     styles.css drives these with a CSS animation; we only nudge its duration,
     so the marquee still works with this file absent.
     ---------------------------------------------------------------------- */
  function marqueeVelocity() {
    const tracks = all(".award-track");
    if (!tracks.length) return;

    const base = tracks.map((t) => parseFloat(getComputedStyle(t).animationDuration) || 20);
    let raf = 0;

    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate(self) {
        const v = Math.min(Math.abs(self.getVelocity()), 3000);
        const factor = 1 - (v / 3000) * 0.75; // fast scroll => shorter duration
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          tracks.forEach((t, i) => {
            t.style.animationDuration = (base[i] * Math.max(factor, 0.25)).toFixed(2) + "s";
          });
        });
      },
    });
  }

  /* ------------------------------------------------------------------------
     9. Scroll progress bar + header auto-hide
     ---------------------------------------------------------------------- */
  function progressAndHeader() {
    const bar = document.createElement("div");
    bar.className = "motion-progress";
    document.body.appendChild(bar);

    gsap.to(bar, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.3 },
    });

    /* Header hide/show lives in site.js (always on, matches HCLTech). */
  }

  /* ------------------------------------------------------------------------
     10. Magnetic buttons
     ---------------------------------------------------------------------- */
  function magnetic() {
    if (!FINE_POINTER.matches) return;

    const targets = all(".btn-blue, .hero-cta, .clients-arrow, .link-arrow");
    targets.forEach((el) => {
      el.setAttribute("data-magnetic", "");
      const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
      const pull = el.classList.contains("gartner-card") ? 0.06 : 0.28;

      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * pull);
        yTo((e.clientY - (r.top + r.height / 2)) * pull);
      });
      el.addEventListener("mouseleave", () => {
        xTo(0);
        yTo(0);
      });
    });
  }

  /* ------------------------------------------------------------------------
     11. Custom cursor
     ---------------------------------------------------------------------- */
  function cursor() {
    if (!FINE_POINTER.matches) return;

    const ring = document.createElement("div");
    const dot = document.createElement("div");
    ring.className = "motion-cursor";
    dot.className = "motion-cursor-dot";
    document.body.append(ring, dot);

    const rx = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ry = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });
    const dx = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const dy = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });

    let shown = false;
    window.addEventListener("mousemove", (e) => {
      if (!shown) {
        shown = true;
        gsap.to([ring, dot], { opacity: 1, duration: 0.3 });
      }
      rx(e.clientX); ry(e.clientY);
      dx(e.clientX); dy(e.clientY);
    }, { passive: true });

    window.addEventListener("mouseout", (e) => {
      if (!e.relatedTarget) gsap.to([ring, dot], { opacity: 0, duration: 0.2 });
      shown = false;
    });

    const hoverables = "a, button, input, select, textarea, [role='tab'], [data-face]";
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(hoverables)) gsap.to(ring, { scale: 1.9, duration: 0.3, ease: EASE });
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(hoverables)) gsap.to(ring, { scale: 1, duration: 0.3, ease: EASE });
    });
  }

  /* ------------------------------------------------------------------------
     12. Section entry accent — subtle scale on banded sections
     ---------------------------------------------------------------------- */
  function bands() {
    all(".section.mist, .recog-band, .ask-panel").forEach((band) => {
      gsap.fromTo(
        band,
        { backgroundPosition: "50% 0%" },
        {
          backgroundPosition: "50% 100%",
          ease: "none",
          scrollTrigger: { trigger: band, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    });
  }

  /* ------------------------------------------------------------------------
     Boot
     ---------------------------------------------------------------------- */
  function boot() {
    watchdog();
    curtain();
    headlines();
    reveals();
    cards();
    parallax();
    counters();
    pins();
    marqueeVelocity();
    progressAndHeader();
    magnetic();
    cursor();
    bands();

    // Late-loading images change page height; recalc once they settle.
    window.addEventListener("load", () => ScrollTrigger.refresh());
    let resizeTimer;
    window.addEventListener("resize", () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    });
  }

  try {
    boot();
  } catch (err) {
    // Never let a motion bug hide the site.
    disableMotion("init failed: " + (err && err.message));
    console.error(err);
  }
})();
