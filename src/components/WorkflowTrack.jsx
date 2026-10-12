import { useEffect, useRef } from 'react';

/* "Where AI Sits in the Process" (AI-Assisted Engineering). The stages sit on
 * a lit track; a pulse runs along it on a loop, lighting each stage in turn,
 * and stops longest on the AI-assisted one, which is drawn as the centrepiece.
 * Stage names come from the page; the icons are decorative.
 */
const ICONS = {
  Idea: <><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z" /></>,
  Understand: <><circle cx="11" cy="11" r="6" /><path d="M20 20l-4.5-4.5" /></>,
  Design: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M9 9v11" /></>,
  'AI-Assisted Build': <><path d="M8 8l-4 4 4 4M16 8l4 4-4 4" /><path d="M12 5l1.2 2.8L16 9l-2.8 1.2L12 13l-1.2-2.8L8 9l2.8-1.2z" /></>,
  Test: <><path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z" /><path d="M9 12l2 2 4-4" /></>,
  Refine: <><path d="M4 7h10M18 7h2M4 17h4M12 17h8" /><circle cx="16" cy="7" r="2" /><circle cx="10" cy="17" r="2" /></>,
  Deploy: <><path d="M12 3c3 2 5 5 5 9l-2 3H9l-2-3c0-4 2-7 5-9z" /><circle cx="12" cy="10" r="1.6" /><path d="M9 15l-2 4 3-1M15 15l2 4-3-1" /></>,
};

export default function WorkflowTrack({ stages }) {
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
    const { gsap, ScrollTrigger } = window;
    if (!el || !gsap) return undefined;
    const cards = Array.from(el.querySelectorAll('.wf-stage'));
    const pulse = el.querySelector('.wf-pulse');
    const fill = el.querySelector('.wf-fill');
    let loop;
    let watch;

    const build = () => {
      loop?.kill();
      watch?.kill();
      cards.forEach((c) => c.classList.remove('is-live', 'is-past'));
      const vertical = window.matchMedia('(max-width: 900px)').matches;
      const box = el.getBoundingClientRect();
      const at = (c) => {
        const r = c.getBoundingClientRect();
        return vertical ? r.top - box.top + r.height / 2 : r.left - box.left + r.width / 2;
      };
      const axis = vertical ? 'y' : 'x';
      const first = at(cards[0]);
      const span = at(cards[cards.length - 1]) - first;
      loop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.4 });
      loop.set(pulse, { [axis]: first, autoAlpha: 0 })
        .set(fill, vertical ? { scaleY: 0 } : { scaleX: 0 })
        .to(pulse, { autoAlpha: 1, duration: 0.3 });
      cards.forEach((c, i) => {
        if (i) {
          const p = (at(c) - first) / span;
          loop.to(pulse, { [axis]: at(c), duration: 0.75, ease: 'power2.inOut' })
            .to(fill, vertical ? { scaleY: p, duration: 0.75, ease: 'power2.inOut' } : { scaleX: p, duration: 0.75, ease: 'power2.inOut' }, '<');
        }
        loop.call(() => cards.forEach((o, j) => {
          o.classList.toggle('is-live', j === i);
          o.classList.toggle('is-past', j < i);
        }));
        loop.to({}, { duration: c.classList.contains('is-ai') ? 1.6 : 0.45 });
      });
      loop.to([pulse, fill], { autoAlpha: 0, duration: 0.5 }, '+=0.5')
        .call(() => cards.forEach((o) => o.classList.remove('is-live', 'is-past')))
        .set(fill, { autoAlpha: 1 });
      if (ScrollTrigger) {
        watch = ScrollTrigger.create({
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
        });
      } else {
        loop.play();
      }
    };

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: { trigger: el, start: 'top 80%', once: true },
        onComplete: build,
      })
        .from('.wf-rail', { scaleX: 0, transformOrigin: '0 50%', duration: 1, ease: 'power3.inOut' })
        .from(cards, { autoAlpha: 0, y: 40, rotateX: -40, transformPerspective: 800, duration: 0.8, ease: 'back.out(1.6)', stagger: 0.09 }, 0.15);
    }, el);

    let t;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(() => { if (loop) build(); }, 200);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(t);
      loop?.kill();
      watch?.kill();
      ctx.revert();
    };
  }, []);

  return (
    <div className="wf" ref={root}>
      <span className="wf-rail" aria-hidden="true"><span className="wf-fill" /></span>
      <span className="wf-pulse" aria-hidden="true" />
      <ol className="wf-list">
        {stages.map((stage, i) => {
          const ai = stage.startsWith('AI-');
          return (
            <li className={`wf-stage${ai ? ' is-ai' : ''}`} key={stage}>
              {ai && <span className="wf-sparks" aria-hidden="true"><i /><i /><i /><i /></span>}
              <span className="wf-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <svg className="wf-ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false">{ICONS[stage]}</svg>
              <span className="wf-name">{stage}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
