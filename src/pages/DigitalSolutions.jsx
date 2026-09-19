import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';

const CAPABILITIES = [
  { num: '01', title: 'Digital Applications', text: 'Build software around defined user and business needs.' },
  { num: '02', title: 'Business Workflows', text: 'Translate manual or existing workflows into digital processes.' },
  { num: '03', title: 'Web & Mobile Solutions', text: 'Develop digital experiences across web and mobile.' },
  { num: '04', title: 'Software Integration', text: 'Connect applications and required systems.' },
  { num: '05', title: 'Automation', text: 'Reduce repetitive work through software-based workflows.' },
  { num: '06', title: 'AI Integration', text: 'Explore practical ways to incorporate AI into digital solutions.' },
];

const STEPS = [
  { num: '01', title: 'Understand', text: 'Understand the requirement and the work behind it.' },
  { num: '02', title: 'Define', text: 'Decide what the solution should cover and what it should not.' },
  { num: '03', title: 'Design', text: 'Shape the experience and how the parts fit together.' },
  { num: '04', title: 'Build', text: 'Develop the solution and its integrations.' },
  { num: '05', title: 'Test', text: 'Check the solution works across its intended use.' },
  { num: '06', title: 'Improve', text: 'Refine the solution as requirements evolve.' },
];

export default function DigitalSolutions() {
  usePageMeta("Digital Solutions | AnvasTech", "AnvasTech combines product thinking, UI/UX, software development, automation, and AI-assisted engineering to create digital solutions around specific requirements.");
  return (
    <main id="main" className="solution-page">

    <section className="page-hero is-dark">
      <figure className="hero-art is-video art-solutions" aria-hidden="true">
        <video src="/assets/solutions-hero.mp4?v=1" poster="/assets/solutions-hero-poster.jpg?v=1" autoPlay muted loop playsInline preload="metadata" disablePictureInPicture></video>
      </figure>
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / <Link to="/what-we-do">Solutions</Link> / Digital Solutions</p>
        <h1>Digital Solutions</h1>
        <p className="lede">Turn real-world requirements into practical software solutions. AnvasTech combines product thinking, UI/UX, software development, automation, and AI-assisted engineering to create digital solutions around specific requirements.</p>
      </div>
    </section>

    <section className="sp-band" id="capabilities">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">Business &amp; Digital Solutions</p>
            <h2 className="sp-h2">What We Deliver</h2>
          </div>
          <p className="sp-lede">Product thinking, design, development, automation and AI &mdash; applied to whatever the requirement actually needs.</p>
        </div>
        <div className="sp-grid is-3up">
          {CAPABILITIES.map((c) => (
            <article className="sp-cell" key={c.num}>
              <span className="sp-num">{c.num}</span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="sp-fits" id="process">
      <img src="/assets/ai-slide-2.jpg?v=1" alt="" width="1024" height="401" decoding="async" fetchPriority="low" aria-hidden="true" />
      <div className="sp-wrap">
        <p className="sp-eyebrow">How we work</p>
        <h2 className="sp-h2">Our Process</h2>
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

    <section className="sp-band is-white" id="related">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">Business &amp; Digital Solutions</p>
            <h2 className="sp-h2">Explore More</h2>
          </div>
        </div>
        <div className="sp-links">
          <Link to="/custom-software-development">
            <h3>Custom Software Development</h3>
            <p>Build software around your specific requirements.</p>
            <span className="sp-link">Read more</span>
          </Link>
          <Link to="/intelligent-workflows">
            <h3>Business Automation</h3>
            <p>Simplify repetitive business processes with software.</p>
            <span className="sp-link">Read more</span>
          </Link>
          <Link to="/data-ai-engineering">
            <h3>Data &amp; Analytics</h3>
            <p>Turn application data into useful information.</p>
            <span className="sp-link">Read more</span>
          </Link>
        </div>
      </div>
    </section>

    <section className="sp-band is-neutral" id="contact-cta">
      <div className="sp-wrap">
        <div className="sp-close">
          <p className="sp-eyebrow">Start here</p>
          <h2>Have a digital solution in mind?</h2>
          <p className="sp-lede">Tell us the requirement and we will explore the product, design, and engineering approach that fits it.</p>
          <div className="sp-actions"><Link className="sp-btn" to="/contact">Discuss Your Digital Solution</Link></div>
        </div>
      </div>
    </section>
    </main>
  );
}
