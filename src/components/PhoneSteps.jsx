import { useEffect, useRef, useState } from 'react';

/* The mobile page's overview plate: the process steps on a handset screen,
   played through like an app. The active step moves down the list, finished
   steps tick off, a progress bar fills, and a card beside the phone carries
   the current step's own description, sliding to sit level with its row.

   Advances only while on screen, and not at all with reduced motion; then it
   rests on the first step with every row readable. Styles in
   css/solution-page.css under "Device — live". */

const STEP_MS = 2200;

export default function PhoneSteps({ steps, caption }) {
  const [active, setActive] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let timer = 0;
    const start = () => {
      if (!timer) timer = window.setInterval(() => setActive((n) => (n + 1) % steps.length), STEP_MS);
    };
    const stop = () => {
      window.clearInterval(timer);
      timer = 0;
    };
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), { threshold: 0.3 });
    io.observe(ref.current);
    return () => {
      io.disconnect();
      stop();
    };
  }, [steps.length]);

  const step = steps[active];
  const pad = (n) => String(n).padStart(2, '0');

  return (
    <figure className="sp-plate is-device is-live" ref={ref}>
      <p className="sp-plate-cap">{caption}</p>
      <div className="ph-stage" style={{ '--row': active }}>
        <div className="ph-glow" aria-hidden="true" />
        <div className="sp-device ph">
          <div className="sp-device-screen">
            <div className="ph-head" aria-hidden="true">
              <span>Step {pad(active + 1)} of {pad(steps.length)}</span>
              <span className="ph-bar"><i style={{ width: `${((active + 1) / steps.length) * 100}%` }} /></span>
            </div>
            <ol>
              {steps.map((st, n) => (
                <li key={st.num} className={n === active ? 'is-on' : n < active ? 'is-done' : undefined}>
                  <span className="ph-tick" aria-hidden="true" />
                  <span className="ph-title">{st.title}</span>
                  <b>{st.num}</b>
                </li>
              ))}
            </ol>
          </div>
        </div>
        {/* Same text as the process section below, so hidden from assistive
            tech rather than announced every few seconds. */}
        <div className="ph-card" aria-hidden="true">
          {/* Keyed so the text replays its entrance on every step. */}
          <div key={active}>
            <p className="ph-card-num">{step.num}</p>
            <p className="ph-card-title">{step.title}</p>
            <p className="ph-card-text">{step.text}</p>
          </div>
        </div>
      </div>
    </figure>
  );
}
