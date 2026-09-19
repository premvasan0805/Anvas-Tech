import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';

const CAPABILITIES = [
  { num: '01', title: 'Application Development', text: 'Build software around specific requirements and workflows.' },
  { num: '02', title: 'Frontend Development', text: 'Create user interfaces and application experiences.' },
  { num: '03', title: 'Backend Development', text: 'Develop the application logic and required functionality.' },
  { num: '04', title: 'Database Development', text: 'Structure and connect the data required by the application.' },
  { num: '05', title: 'API Integration', text: 'Connect applications with required services and systems.' },
  { num: '06', title: 'Software Improvement', text: 'Enhance existing applications as requirements evolve.' },
];

const STEPS = [
  { num: '01', title: 'Understand', text: 'Understand the requirements, users, and workflow.' },
  { num: '02', title: 'Plan', text: 'Define scope, functionality, and the development approach.' },
  { num: '03', title: 'Design', text: 'Shape the interface and application structure.' },
  { num: '04', title: 'Develop', text: 'Build the application and required functionality.' },
  { num: '05', title: 'Test', text: 'Check functionality and identify issues.' },
  { num: '06', title: 'Improve', text: 'Refine the software as requirements evolve.' },
];

export default function CustomSoftwareDevelopment() {
  usePageMeta("Custom Software Development | AnvasTech", "AnvasTech develops software solutions around defined business, product, and operational requirements.");
  return (
    <main id="main" className="solution-page">

    <section className="page-hero is-dark">
      <figure className="hero-art is-video art-solutions" aria-hidden="true">
        <video src="/assets/solutions-hero.mp4?v=1" poster="/assets/solutions-hero-poster.jpg?v=1" autoPlay muted loop playsInline preload="metadata" disablePictureInPicture></video>
      </figure>
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / <Link to="/what-we-do">Solutions</Link> / Custom Software Development</p>
        <h1>Custom Software Development</h1>
        <p className="lede">Build software around your specific requirements. AnvasTech develops software solutions around defined business, product, and operational requirements.</p>
      </div>
    </section>

    <section className="sp-band" id="capabilities">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">Business &amp; Digital Solutions</p>
            <h2 className="sp-h2">What We Deliver</h2>
          </div>
          <p className="sp-lede">Interface, logic, data and the connections between them &mdash; built to a requirement rather than to a template.</p>
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
      <img src="/assets/ai-slide-4.jpg?v=3" alt="" width="1024" height="521" decoding="async" fetchPriority="low" aria-hidden="true" />
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
          <Link to="/digital-solutions">
            <h3>Digital Solutions</h3>
            <p>Turn real-world requirements into practical software solutions.</p>
            <span className="sp-link">Read more</span>
          </Link>
        </div>
      </div>
    </section>

    <section className="sp-band is-neutral" id="contact-cta">
      <div className="sp-wrap">
        <div className="sp-close">
          <p className="sp-eyebrow">Start here</p>
          <h2>Have a software requirement?</h2>
          <p className="sp-lede">Tell us what the software needs to do, and we will map the approach it would take to build it.</p>
          <div className="sp-actions"><Link className="sp-btn" to="/contact">Discuss Your Software Requirement</Link></div>
        </div>
      </div>
    </section>
    </main>
  );
}
