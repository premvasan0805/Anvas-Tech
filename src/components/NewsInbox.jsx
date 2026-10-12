import { useEffect, useRef, useState } from 'react';

// Newsletter card: a mail window where AnvasTech updates keep landing, one
// per topic the paragraph names, newest on top, with the unread count ticking
// up; then it clears and starts again. Subject lines are placeholder bars, not
// invented headlines. It runs only while on screen and leans toward the
// pointer. Decorative: the copy beside it says all of this.

const TOPICS = [
  { label: 'AI', tone: 'violet', bars: [78, 52] },
  { label: 'Emerging technologies', tone: 'blue', bars: [64, 70] },
  { label: 'Engineering', tone: 'ink', bars: [84, 46] },
  { label: "Products we're building", tone: 'green', bars: [58, 66] },
];
const ARRIVE_MS = 1400; // between updates
const HOLD_MS = 2600; // full inbox before it clears
const CLEAR_MS = 600;
const ROW_H = 84; // px, slot height including the gap

export default function NewsInbox() {
  const rootRef = useRef(null);
  const [count, setCount] = useState(0);
  const [clearing, setClearing] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    let timer = 0;
    let visible = false;
    let n = 0;
    const step = () => {
      if (!visible) { timer = 0; return; }
      if (n < TOPICS.length) {
        n += 1;
        setClearing(false);
        setCount(n);
        timer = setTimeout(step, n === TOPICS.length ? HOLD_MS : ARRIVE_MS);
      } else {
        setClearing(true);
        timer = setTimeout(() => {
          n = 0;
          setCount(0);
          timer = setTimeout(step, 500);
        }, CLEAR_MS);
      }
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !timer) timer = setTimeout(step, 400);
    }, { threshold: 0.3 });
    io.observe(root);

    // Lean toward the pointer.
    const onPointer = (e) => {
      const box = root.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, ((e.clientX - box.left) / box.width) * 2 - 1));
      const y = Math.max(-1, Math.min(1, ((e.clientY - box.top) / box.height) * 2 - 1));
      root.style.setProperty('--lean-x', `${(-10 + 6 * x).toFixed(2)}deg`);
      root.style.setProperty('--lean-y', `${(6 - 5 * y).toFixed(2)}deg`);
    };
    window.addEventListener('pointermove', onPointer, { passive: true });

    return () => {
      clearTimeout(timer);
      io.disconnect();
      window.removeEventListener('pointermove', onPointer);
    };
  }, []);

  return (
    <div className="ni" ref={rootRef} aria-hidden="true">
      <div className="ni-window">
        <div className="ni-bar">
          <span className="ni-dots"><i /><i /><i /></span>
          <span className="ni-title">Inbox</span>
          <span className={`ni-badge${count ? ' is-on' : ''}`} key={count}>{count}</span>
        </div>
        <div className="ni-list" style={{ height: ROW_H * TOPICS.length }}>
          {TOPICS.map((t, i) => {
            const shown = i < count;
            // Newest on top: each arrival pushes the earlier ones down a slot.
            const slot = shown ? count - 1 - i : 0;
            return (
              <div
                key={t.label}
                className={`ni-row ni-${t.tone}${shown ? ' is-in' : ''}${shown && i === count - 1 ? ' is-new' : ''}${clearing ? ' is-out' : ''}`}
                style={{ top: slot * ROW_H }}
              >
                <span className="ni-avatar"><img src="/assets/anvastech-mark-v2.svg" alt="" width="28" height="19" /></span>
                <span className="ni-body">
                  <span className="ni-meta">
                    <b>AnvasTech</b>
                    <span className="ni-tag"><span className="ni-dot" />{t.label}</span>
                    <span className="ni-time">{i === count - 1 ? 'now' : `${count - 1 - i}m`}</span>
                  </span>
                  <span className="ni-line" style={{ width: `${t.bars[0]}%` }} />
                  <span className="ni-line ni-line-soft" style={{ width: `${t.bars[1]}%` }} />
                </span>
                <span className="ni-unread" />
              </div>
            );
          })}
        </div>
      </div>
      <div className="ni-glow" />
    </div>
  );
}
