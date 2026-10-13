import { useEffect, useRef, useState } from 'react';

/* Careers "Understand First. Build With Purpose." steps as a live loop.
   A light runs along the rail from step to step; the step it reaches lifts
   and lights up. After Improve it travels back to Understand along the
   return arc under the cards, since the lede says the work keeps improving.
   Hovering or focusing a step takes over and holds it; the loop only runs
   while the band is on screen. Styles: .bl in css/solution-page.css. */

const ICONS = [
  // Understand: magnifier
  <path key="u" d="M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Zm4.7-1.8L20 20" />,
  // Design: layout frame
  <path key="d" d="M4 5h16v14H4zM4 9.5h16M9.5 9.5V19" />,
  // Build: code brackets
  <path key="b" d="m8.5 7-5 5 5 5m7-10 5 5-5 5M13.5 5l-3 14" />,
  // Test: shield with tick
  <path key="t" d="M12 3.5 19 6v5.5c0 4.3-3 7.6-7 9-4-1.4-7-4.7-7-9V6l7-2.5Zm-3.2 8.6 2.3 2.3 4.2-4.6" />,
  // Improve: circular arrows
  <path key="i" d="M19.5 11a7.5 7.5 0 0 0-13.4-3.9M4.5 13a7.5 7.5 0 0 0 13.4 3.9M6 3.8v3.6h3.6M18 20.2v-3.6h-3.6" />,
];

const STEP_MS = 2400;

export default function BuildLoop({ steps }) {
  const [active, setActive] = useState(0);
  const [wrapping, setWrapping] = useState(false);
  const [held, setHeld] = useState(false);
  const [seen, setSeen] = useState(false);
  const root = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.3 });
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (held || !seen) return undefined;
    const t = setTimeout(() => {
      if (active === steps.length - 1) {
        setWrapping(true);
        setActive(0);
      } else {
        setWrapping(false);
        setActive(active + 1);
      }
    }, STEP_MS);
    return () => clearTimeout(t);
  }, [active, held, seen, steps.length]);

  const take = (i) => () => { setHeld(true); setWrapping(false); setActive(i); };
  const release = () => setHeld(false);

  return (
    <div
      ref={root}
      className={`bl${seen ? ' is-seen' : ''}${wrapping ? ' is-wrap' : ''}`}
      style={{ '--i': active, '--n': steps.length }}
    >
      <div className="bl-rail" aria-hidden="true">
        <span className="bl-fill" />
        {steps.map((s, i) => (
          <span key={s.num} className={`bl-node${i <= active ? ' is-done' : ''}${i === active ? ' is-on' : ''}`} style={{ '--k': i }} />
        ))}
        <span className="bl-spark" />
      </div>
      <ol className="bl-cards">
        {steps.map((s, i) => (
          <li
            key={s.num}
            className={`bl-card${i === active ? ' is-on' : ''}${i < active ? ' is-done' : ''}`}
            tabIndex={0}
            onPointerEnter={take(i)}
            onPointerLeave={release}
            onFocus={take(i)}
            onBlur={release}
          >
            <span className="bl-ico" aria-hidden="true">
              <svg viewBox="0 0 24 24">{ICONS[i % ICONS.length]}</svg>
            </span>
            <span className="bl-num">{s.num}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
      <svg className="bl-return" viewBox="0 0 1000 60" preserveAspectRatio="none" aria-hidden="true">
        <path className="bl-return-base" d="M900 0 V22 Q900 50 872 50 H128 Q100 50 100 22 V0" />
        <path className="bl-return-run" pathLength="1" d="M900 0 V22 Q900 50 872 50 H128 Q100 50 100 22 V0" />
      </svg>
      <p className="bl-return-label" aria-hidden="true">Continuous improvement</p>
    </div>
  );
}
