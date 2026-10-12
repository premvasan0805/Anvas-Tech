import { useEffect, useRef } from 'react';

// First hero slide: an engineer and an AI assistant at work, seen over the
// engineer's shoulder, acting out the paragraph beside it:
//
//  explore  the engineer types the first lines;
//  refine   the assistant (the orb) sends a suggestion, which lands as code;
//  solve    a line fails, the assistant sends a fix, the engineer looks it
//           over and approves it;
//  build    the app slides out of the screen onto a phone and builds.
//
// The phrase being acted out lights in the paragraph (data-beat on the hero).
// It restarts each time the slide comes in and finishes by about six seconds,
// inside the slide's seven; with the hero paused it holds the finished frame.
// Decorative: the copy says all of this, so it is aria-hidden.

// Screen code lines: [indent, width, group]. Typed by the engineer, suggested
// by the assistant, or the line that fails and is fixed.
const LINES = [
  [0, 150, 'typed'], [1, 110, 'typed'], [1, 170, 'typed'], [2, 90, 'typed'],
  [2, 140, 'ai'], [2, 120, 'bug'], [1, 160, 'ai'], [0, 40, 'ai'],
];
const LINE_Y = (i) => 120 + i * 18;
const LINE_X = (indent) => 186 + indent * 16;
const BUG = LINES.findIndex(([, , g]) => g === 'bug');

export default function HeroPairing() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const { gsap } = window;
    const hero = root?.closest('.hero');
    const slide = root?.closest('.slide');
    if (!root || !gsap || !hero || !slide) return undefined;

    const q = (sel) => [...root.querySelectorAll(sel)];
    const one = (sel) => root.querySelector(sel);
    const setBeat = (beat) => {
      if (beat) hero.dataset.beat = beat;
      else delete hero.dataset.beat;
    };
    const bug = one('.hp-bug');
    const typed = q('.hp-code-typed');
    const suggested = q('.hp-code-ai, .hp-bug');
    // Inner groups move; the outer ones hold the launch point.
    const card = one('.hp-card > g');
    const fix = one('.hp-fix > g');
    const head = one('.hp-head');
    const caret = one('.hp-caret');

    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });
    tl.call(() => {
      setBeat('');
      bug.classList.remove('is-bad', 'is-fixed');
      suggested.forEach((el) => el.classList.remove('is-solid'));
    }, null, 0)
      .set([...typed, ...suggested], { scaleX: 0, transformOrigin: '0% 50%' }, 0)
      .set(suggested, { opacity: 0.35 }, 0)
      .set([card, fix], { opacity: 0, x: 0, y: 0, scale: 0.6 }, 0)
      .set(q('.hp-review, .hp-ship'), { opacity: 0, scale: 0.7, transformOrigin: '50% 50%' }, 0)
      .set(one('.hp-phone'), { opacity: 0, x: -150, y: -60, scale: 0.55, transformOrigin: '50% 50%' }, 0)
      .set(q('.hp-app'), { opacity: 0, y: 6 }, 0)
      .set(caret, { attr: { x: LINE_X(0), y: LINE_Y(0) - 5 } }, 0)
      .fromTo(root, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0);

    // Explore: the engineer types the first lines, the caret following.
    tl.call(() => setBeat('explore'), null, 0.3);
    typed.forEach((el, i) => {
      const [indent, w] = LINES[i];
      const at = 0.4 + i * 0.32;
      tl.set(caret, { attr: { x: LINE_X(indent), y: LINE_Y(i) - 5 } }, at)
        .to(el, { scaleX: 1, duration: 0.28, ease: 'none' }, at)
        .to(caret, { attr: { x: LINE_X(indent) + w + 3 }, duration: 0.28, ease: 'none' }, at);
    });

    // Refine: the assistant sends a suggestion; it lands as ghost code and is
    // taken in.
    tl.call(() => setBeat('refine'), null, 1.8)
      .to(one('.hp-orb-core'), { scale: 1.35, duration: 0.25, yoyo: true, repeat: 1, transformOrigin: '50% 50%' }, 1.8)
      .to(card, {
        keyframes: [
          { opacity: 1, scale: 1, x: -60, y: -26, duration: 0.3, ease: 'power2.out' },
          { x: -200, y: 80, scale: 0.7, duration: 0.45, ease: 'power2.in' },
          { opacity: 0, scale: 0.4, duration: 0.12 },
        ],
      }, 1.85)
      .set(caret, { opacity: 0 }, 2.7)
      .to(suggested, { scaleX: 1, duration: 0.3, stagger: 0.06 }, 2.65)
      .call(() => suggested.forEach((el) => el.classList.add('is-solid')), null, 3.05)
      .to(suggested, { opacity: 1, duration: 0.3 }, 3.05);

    // Solve: one line fails; the assistant sends the fix; the engineer looks
    // it over and approves.
    tl.call(() => setBeat('solve'), null, 3.4)
      .call(() => bug.classList.add('is-bad'), null, 3.45)
      .to(fix, {
        keyframes: [
          { opacity: 1, scale: 1, duration: 0.15 },
          { x: -262, y: 80, duration: 0.45, ease: 'power2.inOut' },
          { opacity: 0, scale: 0.3, duration: 0.1 },
        ],
      }, 3.65)
      .call(() => { bug.classList.remove('is-bad'); bug.classList.add('is-fixed'); }, null, 4.3)
      .to(head, { rotate: 5, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut', svgOrigin: '252 430' }, 4.35)
      .to(one('.hp-review'), { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' }, 4.45);

    // Build: the app slides out onto a phone and builds.
    tl.call(() => setBeat('build'), null, 4.75)
      .to(one('.hp-phone'), { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.7 }, 4.75)
      .to(q('.hp-app'), { opacity: 1, y: 0, duration: 0.3, stagger: 0.07 }, 5.15)
      .to(one('.hp-ship'), { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' }, 5.75);

    const finish = () => {
      tl.progress(1).pause();
      suggested.forEach((el) => el.classList.add('is-solid'));
      bug.classList.add('is-fixed');
      setBeat('build');
    };
    const sync = () => {
      if (!slide.classList.contains('is-active')) {
        tl.pause();
        setBeat('');
      } else if (hero.classList.contains('is-paused')) finish();
    };
    let wasActive = false;
    const onSlide = () => {
      const active = slide.classList.contains('is-active');
      if (active && !wasActive) {
        if (hero.classList.contains('is-paused')) finish();
        else tl.restart();
      }
      wasActive = active;
      sync();
    };
    const so = new MutationObserver(onSlide);
    so.observe(slide, { attributes: true, attributeFilter: ['class'] });
    const ho = new MutationObserver(sync);
    ho.observe(hero, { attributes: true, attributeFilter: ['class'] });
    onSlide();

    return () => {
      so.disconnect();
      ho.disconnect();
      tl.kill();
      setBeat('');
    };
  }, []);

  return (
    <div className="hp" ref={rootRef} aria-hidden="true">
      <svg viewBox="0 0 640 540" fill="none">
        <defs>
          <linearGradient id="hp-hoodie" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4a3a9a" />
            <stop offset="1" stopColor="#241c52" />
          </linearGradient>
          <linearGradient id="hp-desk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2a2546" />
            <stop offset="1" stopColor="#15122a" />
          </linearGradient>
          <radialGradient id="hp-screen-glow" cx="0.5" cy="0.4" r="0.5">
            <stop offset="0" stopColor="#7c5cff" stopOpacity="0.35" />
            <stop offset="1" stopColor="#7c5cff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hp-orb" cx="0.38" cy="0.35" r="0.7">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.3" stopColor="#b7a4ff" />
            <stop offset="0.75" stopColor="#6a4cff" />
            <stop offset="1" stopColor="#3d6bff" />
          </radialGradient>
          <radialGradient id="hp-orb-halo">
            <stop offset="0" stopColor="#8f7bff" stopOpacity="0.55" />
            <stop offset="1" stopColor="#4da3ff" stopOpacity="0" />
          </radialGradient>
          <filter id="hp-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>

        {/* Light thrown by the screen */}
        <ellipse cx="320" cy="210" rx="260" ry="190" fill="url(#hp-screen-glow)" />

        {/* Desk */}
        <rect x="40" y="338" width="580" height="16" rx="3" fill="url(#hp-desk)" />
        <path d="M40 338.5H620" className="hp-edge" />
        <rect x="70" y="354" width="10" height="186" fill="#15122a" />
        <rect x="580" y="354" width="10" height="186" fill="#15122a" />

        {/* Monitor */}
        <rect x="296" y="292" width="48" height="36" fill="#1b1832" />
        <rect x="250" y="326" width="140" height="10" rx="5" fill="#221e3c" />
        <rect x="140" y="62" width="360" height="232" rx="14" fill="#16142a" className="hp-bezel" />
        <rect x="152" y="74" width="336" height="208" rx="6" fill="#0b0918" />
        <circle cx="168" cy="88" r="3.5" fill="#ff6b8a" opacity="0.7" />
        <circle cx="180" cy="88" r="3.5" fill="#ffc46b" opacity="0.7" />
        <circle cx="192" cy="88" r="3.5" fill="#5be3a0" opacity="0.7" />
        {LINES.map(([indent, w, group], i) => (
          <rect
            key={i}
            className={`hp-code hp-tone-${i % 3} ${group === 'typed' ? 'hp-code-typed' : group === 'bug' ? 'hp-bug' : 'hp-code-ai'}`}
            x={LINE_X(indent)}
            y={LINE_Y(i) - 4}
            width={w}
            height="7"
            rx="3.5"
          />
        ))}
        <rect className="hp-caret" x={LINE_X(0)} y={LINE_Y(0) - 5} width="2" height="10" />
        {/* Line numbers */}
        {LINES.map((_, i) => (
          <rect key={i} x="164" y={LINE_Y(i) - 2.5} width="8" height="4" rx="2" fill="rgb(255 255 255 / 0.12)" />
        ))}
        <g className="hp-review" transform={`translate(${LINE_X(2) + 140} ${LINE_Y(BUG) - 11})`}>
          <rect width="86" height="22" rx="11" fill="#163a2b" stroke="#5be3a0" strokeOpacity="0.6" />
          <path d="M11 11.5l3.5 3.5 6.5-7" stroke="#5be3a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <text x="28" y="15" className="hp-chip-text" fill="#c9f5df">Reviewed</text>
        </g>

        {/* Keyboard and mug */}
        <rect x="228" y="330" width="150" height="8" rx="2" fill="#2e2950" />
        <path d="M228 330.5H378" stroke="rgb(255 255 255 / 0.12)" />
        <rect x="456" y="306" width="26" height="32" rx="4" fill="#2a2546" />
        <path d="M482 314c10 0 10 16 0 16" stroke="#2a2546" strokeWidth="4" />

        {/* The engineer, from behind, lit by the screen */}
        <g className="hp-person">
          <path d="M168 540C168 476 196 448 252 448S336 476 336 540Z" fill="url(#hp-hoodie)" />
          <path d="M190 470C206 454 228 448 252 448S298 454 314 470" className="hp-rim" />
          <rect x="238" y="424" width="28" height="30" rx="10" fill="#2a2244" />
          <g className="hp-head">
            <ellipse cx="221" cy="406" rx="6" ry="9" fill="#b9826a" />
            <ellipse cx="283" cy="406" rx="6" ry="9" fill="#b9826a" />
            <circle cx="252" cy="398" r="32" fill="#231c3a" />
            <path d="M222 388C226 368 240 362 252 362S280 368 283 390" className="hp-rim" />
          </g>
          {/* Chair back, in front of the engineer's back */}
          <path d="M184 540V496C184 484 192 478 204 478H300C312 478 320 484 320 496V540Z" fill="#100e1f" />
          <path d="M186 494C186 484 194 480 204 480H300C310 480 318 484 318 494" stroke="rgb(255 255 255 / 0.1)" />
        </g>

        {/* The assistant */}
        <g className="hp-orb">
          <circle cx="560" cy="130" r="58" fill="url(#hp-orb-halo)" />
          <ellipse className="hp-orbit" cx="560" cy="130" rx="44" ry="14" />
          <circle className="hp-orb-core" cx="560" cy="130" r="22" fill="url(#hp-orb)" />
          <text x="560" y="186" textAnchor="middle" className="hp-label">AI assistant</text>
        </g>
        {/* Suggestion card and fix spark, launched from the orb */}
        <g className="hp-card" transform="translate(520 120)">
          <g>
            <rect x="-40" y="-16" width="80" height="32" rx="7" fill="#1d1840" stroke="#8f7bff" strokeOpacity="0.7" />
            <rect x="-30" y="-7" width="46" height="5" rx="2.5" fill="#a996ff" />
            <rect x="-30" y="3" width="32" height="5" rx="2.5" fill="#6fb6ff" />
          </g>
        </g>
        <g className="hp-fix" transform="translate(540 130)">
          <g>
            <circle r="9" fill="#5be3a0" filter="url(#hp-soft)" />
            <circle r="5" fill="#d9ffe9" />
          </g>
        </g>

        {/* The shipped app */}
        <g className="hp-phone">
          <rect x="508" y="196" width="96" height="176" rx="16" fill="#0f0d1f" stroke="rgb(255 255 255 / 0.18)" />
          <rect x="514" y="202" width="84" height="164" rx="11" fill="#f4f2fb" />
          <rect x="543" y="207" width="26" height="5" rx="2.5" fill="#0f0d1f" />
          <rect className="hp-app" x="522" y="222" width="44" height="7" rx="3.5" fill="#17151f" />
          <rect className="hp-app" x="522" y="236" width="68" height="40" rx="7" fill="url(#hp-orb)" />
          <rect className="hp-app" x="522" y="284" width="32" height="30" rx="6" fill="#e3def3" />
          <rect className="hp-app" x="558" y="284" width="32" height="30" rx="6" fill="#e3def3" />
          <rect className="hp-app" x="522" y="322" width="68" height="6" rx="3" fill="#d9d4ea" />
          <rect className="hp-app" x="522" y="342" width="68" height="16" rx="8" fill="#6d4dff" />
        </g>
        <g className="hp-ship" transform="translate(518 384)">
          <rect width="76" height="22" rx="11" fill="#5be3a0" />
          <text x="38" y="15" textAnchor="middle" className="hp-chip-text" fill="#0c3a24">Shipped</text>
        </g>
      </svg>
    </div>
  );
}
