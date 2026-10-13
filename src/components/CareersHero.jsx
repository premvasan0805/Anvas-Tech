import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

/* Careers hero. The title's three beats each get their own entrance:
 * "Build." drops in letter by letter like blocks landing, "Learn." gets a
 * highlighter swept behind it, and "Create What's Next." arrives in a moving
 * gradient with a caret. Beside it, the page's four role areas circle the
 * mark on three rings named for the three beats.
 *
 * The page's generic hero motion (src/lib/solutionMotion.js) still runs the
 * video, crumbs, ledes and buttons; `data-own-title` tells it to leave the
 * title to this component.
 */
const ORBIT = [
  { ring: 'outer', angle: -30, label: 'Software Engineering' },
  { ring: 'middle', angle: 70, label: 'AI & Engineering' },
  { ring: 'outer', angle: 150, label: 'Product & Design' },
  { ring: 'inner', angle: 235, label: 'Business & Operations' },
];

export default function CareersHero() {
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
    const { gsap, ScrollTrigger } = window;
    if (!el || !gsap) return undefined;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.25 });
      tl.from('.crh-build .crh-ch', {
        yPercent: -160,
        rotate: (i) => (i % 2 ? 12 : -12),
        autoAlpha: 0,
        duration: 0.9,
        ease: 'bounce.out',
        stagger: 0.07,
      })
        .from('.crh-learn .crh-word', { autoAlpha: 0, x: -40, filter: 'blur(8px)', duration: 0.8, ease: 'power3.out' }, 0.55)
        .fromTo('.crh-mark', { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: 'power3.inOut' }, 0.9)
        .from('.crh-create .crh-word', { autoAlpha: 0, yPercent: 60, rotateX: -70, transformOrigin: '50% 100%', duration: 0.9, ease: 'power4.out', stagger: 0.1 }, 1.2)
        .from('.crh-caret', { autoAlpha: 0, duration: 0.2 }, 1.8)
        .from('.crh-orbit', { autoAlpha: 0, scale: 0.6, rotate: -40, duration: 1.6, ease: 'power3.out' }, 0.3)
        .from('.crh-chip', { autoAlpha: 0, scale: 0.4, duration: 0.6, ease: 'back.out(2)', stagger: 0.12 }, 1.2);

      // Scroll: the copy lifts away and the rings swing round faster.
      if (ScrollTrigger) {
        gsap.to('.crh-copy', {
          yPercent: -18,
          autoAlpha: 0.2,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
        });
        gsap.to('.crh-orbit', {
          rotate: 60,
          yPercent: 12,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
        });
      }
    }, el);

    // A soft light follows the pointer over the footage.
    const move = (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--px', `${e.clientX - r.left}px`);
      el.style.setProperty('--py', `${e.clientY - r.top}px`);
    };
    el.addEventListener('pointermove', move);
    return () => {
      el.removeEventListener('pointermove', move);
      ctx.revert();
    };
  }, []);

  return (
    <section className="page-hero is-dark crh" id="overview" ref={root} data-own-title="">
      {/* Full-bleed footage behind the copy, using the site's standard dark
          page-hero pattern. The artwork is abstract on purpose: nothing here
          should be read as a photograph of an AnvasTech employee. */}
      <figure className="hero-art is-video art-careers" aria-hidden="true">
        <video src="/assets/careers-hero.mp4?v=2" poster="/assets/careers-hero-poster.jpg?v=2" autoPlay muted loop playsInline preload="metadata" disablePictureInPicture></video>
      </figure>
      <div className="crh-spot" aria-hidden="true" />
      <div className="wrap crh-grid">
        <div className="crh-copy">
          <p className="crumbs"><Link to="/">Home</Link> / Careers</p>
          <p className="kicker">Careers</p>
          <h1 className="crh-title" aria-label="Build. Learn. Create What’s Next.">
            <span className="crh-line crh-build" aria-hidden="true">
              {Array.from('Build.').map((c, i) => <span className="crh-ch" key={i}>{c}</span>)}
            </span>
            <span className="crh-line crh-learn" aria-hidden="true">
              <span className="crh-mark" />
              <span className="crh-word">Learn.</span>
            </span>
            <span className="crh-line crh-create" aria-hidden="true">
              <span className="crh-word">Create</span>{' '}
              <span className="crh-next">
                <span className="crh-word crh-grad">What&rsquo;s</span>{' '}
                <span className="crh-word crh-grad">Next.</span>
                <span className="crh-caret" />
              </span>
            </span>
          </h1>
          <p className="lede">Join a team building real digital products and software solutions around practical requirements.</p>
          <p className="lede is-note">At AnvasTech, we bring together product thinking, software engineering, design, automation, and AI-assisted development to build digital solutions.</p>
          <div className="sp-actions">
            <a className="sp-btn" href="#positions">View Open Positions</a>
            <a className="sp-btn-ghost" href="#internships">Explore Internships</a>
          </div>
        </div>

        <div className="crh-orbit" aria-hidden="true">
          {['inner', 'middle', 'outer'].map((ring, i) => (
            <div className={`crh-ring is-${ring}`} key={ring}>
              <span className="crh-ring-name">{['Build', 'Learn', 'Create'][i]}</span>
              <span className="crh-runner" />
              {ORBIT.filter((o) => o.ring === ring).map((o) => (
                <span className="crh-slot" style={{ '--a': `${o.angle}deg` }} key={o.label}>
                  <span className="crh-chip">{o.label}</span>
                </span>
              ))}
            </div>
          ))}
          <div className="crh-core">
            <svg viewBox="0 0 210 140" focusable="false">
              <path d="M14 128L70 18L126 128" stroke="#5aa2ff" strokeWidth="22" fill="none" strokeMiterlimit="10" />
              <path d="M44 94H96" stroke="#5aa2ff" strokeWidth="13" />
              <path d="M66 18H198M160 18V128" stroke="#d36bff" strokeWidth="22" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
