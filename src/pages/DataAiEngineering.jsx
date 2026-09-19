import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';

const CAPABILITIES = [
  { num: '01', title: 'Data Collection', text: 'Organize data generated through applications and workflows.' },
  { num: '02', title: 'Data Management', text: 'Structure information for use within software systems.' },
  { num: '03', title: 'Reporting', text: 'Present relevant information through application-based reports.' },
  { num: '04', title: 'Data Analysis', text: 'Examine available data to identify useful information.' },
  { num: '05', title: 'Dashboards', text: 'Create interfaces for viewing relevant business information.' },
  { num: '06', title: 'Data-Driven Applications', text: 'Incorporate data and reporting into digital products.' },
];

const STEPS = [
  { num: '01', title: 'Understand', text: 'Understand the questions the data needs to answer.' },
  { num: '02', title: 'Collect', text: 'Bring together the data the application and workflow produce.' },
  { num: '03', title: 'Organize', text: 'Structure the information so it can be used consistently.' },
  { num: '04', title: 'Analyze', text: 'Examine the data to identify what is useful.' },
  { num: '05', title: 'Present', text: 'Surface the information through reports and dashboards.' },
  { num: '06', title: 'Improve', text: 'Refine the data and reporting as requirements evolve.' },
];

export default function DataAiEngineering() {
  usePageMeta("Data and Analytics | AnvasTech", "AnvasTech works with data within software applications to organize information and support reporting and analysis.");
  return (
    <main id="main" className="solution-page">

    <section className="page-hero is-dark">
      <figure className="hero-art is-video art-solutions" aria-hidden="true">
        <video src="/assets/solutions-hero.mp4?v=1" poster="/assets/solutions-hero-poster.jpg?v=1" autoPlay muted loop playsInline preload="metadata" disablePictureInPicture></video>
      </figure>
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / <Link to="/what-we-do">Solutions</Link> / Data &amp; Analytics</p>
        <h1>Data &amp; Analytics</h1>
        <p className="lede">Turn application data into useful information. AnvasTech works with data within software applications to organize information and support reporting and analysis.</p>
      </div>
    </section>

    <section className="sp-band" id="capabilities">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">Business &amp; Digital Solutions</p>
            <h2 className="sp-h2">What We Deliver</h2>
          </div>
          <p className="sp-lede">From the data an application produces through to the report someone actually reads.</p>
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
      <img src="/assets/ai-leadership.jpg" alt="" width="1024" height="529" decoding="async" fetchPriority="low" aria-hidden="true" />
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
          <h2>Have a data requirement?</h2>
          <p className="sp-lede">Tell us what you need to see and where the data sits today, and we will map the approach.</p>
          <div className="sp-actions"><Link className="sp-btn" to="/contact">Discuss Your Data Requirement</Link></div>
        </div>
      </div>
    </section>
    </main>
  );
}
