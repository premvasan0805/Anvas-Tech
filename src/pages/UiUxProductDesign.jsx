import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';
import UxGlyph from '../components/UxGlyph.jsx';

const CAPABILITIES = [
  { num: '01', title: 'User Flows', glyph: 'flow', text: 'Map how users move through the product and complete tasks.' },
  { num: '02', title: 'Wireframes', glyph: 'wire', text: 'Structure screens and functionality before detailed visual design.' },
  { num: '03', title: 'Interface Design', glyph: 'ui', text: 'Create clear and consistent user interfaces for digital products.' },
  { num: '04', title: 'Prototyping', glyph: 'proto', text: 'Create interactive prototypes to explore and communicate product experiences.' },
  { num: '05', title: 'Design Systems', glyph: 'system', text: 'Establish reusable interface patterns and components where required.' },
  { num: '06', title: 'Design Refinement', glyph: 'refine', text: 'Improve the experience through iteration as product requirements evolve.' },
];

const STEPS = [
  { num: '01', title: 'Understand', text: 'Understand users, requirements, and the problem.' },
  { num: '02', title: 'Define', text: 'Identify key workflows and product requirements.' },
  { num: '03', title: 'Wireframe', text: 'Structure screens and user flows.' },
  { num: '04', title: 'Design', text: 'Create the visual interface and interaction experience.' },
  { num: '05', title: 'Prototype', text: 'Connect screens into an interactive product experience.' },
  { num: '06', title: 'Refine', text: 'Review and improve the design before development.' },
];

const AREAS = [
  { num: '01', title: 'New Products', text: 'Shape the experience for a new digital product.' },
  { num: '02', title: 'Web Applications', text: 'Design interfaces and workflows for web applications.' },
  { num: '03', title: 'Mobile Applications', text: 'Create mobile experiences around user needs.' },
  { num: '04', title: 'Existing Products', text: 'Improve interfaces, workflows, and usability of existing applications.' },
];

export default function UiUxProductDesign() {
  usePageMeta("UI/UX and Product Design | AnvasTech", "AnvasTech uses UI/UX and product design to turn requirements, workflows, and product ideas into clear digital experiences.");

  /* Process steps light up one by one as the reader scrolls past them. */
  useEffect(() => {
    const { ScrollTrigger } = window;
    if (!ScrollTrigger) return undefined;
    const triggers = Array.from(document.querySelectorAll('#process .sp-step')).map((li) =>
      ScrollTrigger.create({ trigger: li, start: 'top 72%', toggleClass: 'is-lit' })
    );
    return () => triggers.forEach((t) => t.kill());
  }, []);
  return (
    <main id="main" className="solution-page">

    <section className="page-hero is-dark">
      <figure className="hero-art is-video art-engineering" aria-hidden="true">
        <video src="/assets/engineering-hero.mp4?v=1" poster="/assets/engineering-hero-poster.jpg?v=1" autoPlay muted loop playsInline preload="metadata" disablePictureInPicture></video>
      </figure>
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / <Link to="/what-we-do">Solutions</Link> / UI/UX &amp; Product Design</p>
        {/* The title sits in a design-tool selection: a cursor drags the
            frame across it and the resize handles pop in. */}
        <h1>
          <span className="ux-sel">
            UI/UX &amp; Product Design
            <i className="ux-sel-h is-tl" aria-hidden="true" />
            <i className="ux-sel-h is-tr" aria-hidden="true" />
            <i className="ux-sel-h is-bl" aria-hidden="true" />
            <i className="ux-sel-h is-br" aria-hidden="true" />
            <i className="ux-sel-cursor" aria-hidden="true" />
          </span>
        </h1>
        <p className="lede">Design digital products around people and their needs. AnvasTech uses UI/UX and product design to turn requirements, workflows, and product ideas into clear digital experiences.</p>
      </div>
    </section>

    <section className="sp-band is-white" id="overview">
      <div className="sp-wrap">
        <div className="sp-intro">
          <div>
            <p className="sp-eyebrow">Product &amp; Software Engineering</p>
            <h2 className="sp-h2">From Requirements to Product Experience</h2>
            <p className="sp-p" style={{ marginTop: '24px' }}>Good product design starts with understanding the problem. We explore user needs, define workflows, structure interfaces, and create designs that guide the development process.</p>
            <div className="sp-actions"><Link className="sp-btn" to="/contact">Talk to Our Team</Link></div>
          </div>
          {/* A design page, so the plate is the skeleton a design starts from
              — an abstract wireframe, not a mock of any real product screen.
              It loops through the three stages the caption names: grey
              skeleton, then colour fills in, then a cursor taps the button. */}
          <figure className="sp-plate is-wire">
            <p className="sp-plate-cap sp-wire-stages">
              <span>Wireframe</span><span>Interface</span><span>Prototype</span>
            </p>
            <div className="sp-wire" aria-hidden="true">
              <div className="sp-wire-bar">
                <i className="sp-wire-logo" />
                <i className="sp-wire-line is-nav" />
                <i className="sp-wire-line is-nav" />
                <i className="sp-wire-line is-nav" />
                <i className="sp-wire-pill" />
              </div>
              <div className="sp-wire-body">
                <div className="sp-wire-rail">
                  <i className="sp-wire-dot is-on" />
                  <i className="sp-wire-dot" />
                  <i className="sp-wire-dot" />
                  <i className="sp-wire-dot" />
                </div>
                <div className="sp-wire-main">
                  <div className="sp-wire-block is-live">
                    <div className="sp-wire-copy">
                      <i className="sp-wire-line is-head" />
                      <i className="sp-wire-line" />
                    </div>
                    <span className="sp-wire-cta">
                      <i className="sp-wire-cursor" />
                    </span>
                  </div>
                  <div className="sp-wire-row">
                    <div className="sp-wire-block is-chart">
                      <i style={{ '--h': '45%' }} /><i style={{ '--h': '70%' }} /><i style={{ '--h': '55%' }} />
                      <i style={{ '--h': '90%' }} /><i style={{ '--h': '65%' }} />
                    </div>
                    <div className="sp-wire-block is-list">
                      <div><i className="sp-wire-avatar" /><i className="sp-wire-line" /></div>
                      <div><i className="sp-wire-avatar" /><i className="sp-wire-line" /></div>
                      <div><i className="sp-wire-avatar" /><i className="sp-wire-line" /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="sp-plate-foot">Structure the screens before the visual design, then refine before development.</p>
          </figure>
        </div>
      </div>
    </section>

    {/* The six capabilities from the grid below, running as a ticker. The
        list is doubled so the loop is seamless; the copy is hidden from
        assistive tech so it is read once. */}
    <div className="ux-marquee" aria-label="What we deliver">
      <div className="ux-marquee-track">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1 ? 'true' : undefined}>
            {CAPABILITIES.map((c) => <li key={c.num}>{c.title}</li>)}
          </ul>
        ))}
      </div>
    </div>

    <section className="sp-band" id="capabilities">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">What we deliver</p>
            <h2 className="sp-h2">UI/UX &amp; Product Design</h2>
          </div>
          <p className="sp-lede">The design work that has to happen before development can start &mdash; and the work that keeps happening after it does.</p>
        </div>
        <div className="sp-grid is-3up">
          {CAPABILITIES.map((c) => (
            <article className="sp-cell ux-cell" key={c.num}>
              <UxGlyph type={c.glyph} />
              <span className="sp-num">{c.num}</span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="sp-band is-neutral" id="process">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">How we design</p>
            <h2 className="sp-h2">Our Design Process</h2>
          </div>
          <p className="sp-lede">Six stages that take a requirement to a design the development team can build from.</p>
        </div>
        <ol className="sp-steps is-3up">
          {STEPS.map((st) => (
            <li className="sp-step" key={st.num}>
              <span className="sp-step-num">{st.num}</span>
              <h3>{st.title}</h3>
              <p>{st.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <section className="sp-fits" id="where-it-helps">
      <img src="/assets/ai-slide-2.jpg?v=1" alt="" width="1024" height="401" decoding="async" fetchPriority="low" aria-hidden="true" />
      <div className="sp-wrap">
        <p className="sp-eyebrow">Where it applies</p>
        <h2 className="sp-h2">Where UI/UX Helps</h2>
        <ol className="sp-areas is-4up">
          {AREAS.map((a) => (
            <li className="sp-area" key={a.num}>
              <span className="sp-area-num">{a.num}</span>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <section className="sp-band is-white" id="related">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">Product &amp; Software Engineering</p>
            <h2 className="sp-h2">Explore More</h2>
          </div>
        </div>
        <div className="sp-links">
          <Link to="/product-engineering">
            <h3>Product Development</h3>
            <p>Turn product ideas into working software.</p>
            <span className="sp-link">Read more</span>
          </Link>
          <Link to="/web-applications">
            <h3>Web Applications</h3>
            <p>Build web applications around real requirements.</p>
            <span className="sp-link">Read more</span>
          </Link>
          <Link to="/mobile-applications">
            <h3>Mobile Applications</h3>
            <p>Build mobile applications around real user needs.</p>
            <span className="sp-link">Read more</span>
          </Link>
        </div>
      </div>
    </section>

    <section className="sp-band is-ink" id="contact-cta">
      <div className="sp-wrap">
        <div className="sp-close">
          <p className="sp-eyebrow">Start here</p>
          <h2>Have a Digital Product Idea?</h2>
          <p className="sp-lede">Tell us what you&rsquo;re building and explore the product, design, and engineering approach that fits your requirements.</p>
          <div className="sp-actions"><Link className="sp-btn" to="/contact">Start a Conversation</Link></div>
        </div>
      </div>
    </section>
    </main>
  );
}
