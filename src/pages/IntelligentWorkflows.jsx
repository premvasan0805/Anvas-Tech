import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';

const CAPABILITIES = [
  { num: '01', title: 'Workflow Automation', text: 'Automate defined steps within business processes.' },
  { num: '02', title: 'Process Digitization', text: 'Move manual processes into software-based workflows.' },
  { num: '03', title: 'Data & Information Handling', text: 'Organize information within connected workflows.' },
  { num: '04', title: 'AI-Assisted Automation', text: 'Apply AI where it can support practical automation tasks.' },
  { num: '05', title: 'Application Integration', text: 'Connect automation with the software required by the workflow.' },
  { num: '06', title: 'Workflow Improvement', text: 'Refine processes as requirements change.' },
];

const STEPS = [
  { num: '01', title: 'Understand', text: 'Understand the existing process and what it has to achieve.' },
  { num: '02', title: 'Map', text: 'Record the steps, handoffs, and information the process depends on.' },
  { num: '03', title: 'Design', text: 'Decide which steps software should own and how they connect.' },
  { num: '04', title: 'Automate', text: 'Build the automated workflow and its integrations.' },
  { num: '05', title: 'Test', text: 'Check the workflow behaves correctly across its cases.' },
  { num: '06', title: 'Improve', text: 'Refine the process as requirements change.' },
];

export default function IntelligentWorkflows() {
  usePageMeta("Business Automation | AnvasTech", "AnvasTech develops digital solutions that help organize and automate defined business workflows.");
  return (
    <main id="main" className="solution-page">

    <section className="page-hero is-dark">
      <figure className="hero-art is-video art-solutions" aria-hidden="true">
        <video src="/assets/solutions-hero.mp4?v=1" poster="/assets/solutions-hero-poster.jpg?v=1" autoPlay muted loop playsInline preload="metadata" disablePictureInPicture></video>
      </figure>
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / <Link to="/what-we-do">Solutions</Link> / Business Automation</p>
        <h1>Business Automation</h1>
        <p className="lede">Simplify repetitive business processes with software. AnvasTech develops digital solutions that help organize and automate defined business workflows.</p>
      </div>
    </section>

    <section className="sp-band" id="capabilities">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">Business &amp; Digital Solutions</p>
            <h2 className="sp-h2">What We Deliver</h2>
          </div>
          <p className="sp-lede">The parts of a process software can take over, and the information it has to carry while doing it.</p>
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
      <img src="/assets/ai-easy.jpg?v=1" alt="" width="1024" height="416" decoding="async" fetchPriority="low" aria-hidden="true" />
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
          <h2>Have a process to automate?</h2>
          <p className="sp-lede">Tell us how the process runs today, and we will map where software can take over the repetitive parts.</p>
          <div className="sp-actions"><Link className="sp-btn" to="/contact">Explore an Automation Requirement</Link></div>
        </div>
      </div>
    </section>
    </main>
  );
}
