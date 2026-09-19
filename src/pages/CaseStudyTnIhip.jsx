import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';

export default function CaseStudyTnIhip() {
  usePageMeta("eHealth / TN-IHIP | AnvasTech Case Study", "A digital healthcare platform supporting patient management, OPD workflows, healthcare records, and operational processes.");
  return (
    <main id="main">

    <section className="page-hero">
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / <Link to="/case-studies">Case studies</Link> / eHealth / TN-IHIP</p>
        <h1>eHealth / TN-IHIP</h1>
        <p className="lede">A digital healthcare platform supporting patient management, OPD workflows, healthcare records, and operational processes.</p>
      </div>
    </section>

    <section className="section" id="product">
      <div className="wrap split">
        <div>
          <p className="kicker"><span className="cs-step">01</span> &mdash; Product</p>
          <h2 className="display">Digital Healthcare Platform</h2>
          <p className="prose">A digital healthcare platform supporting patient management, OPD workflows, healthcare records, and operational processes.</p>
        </div>
        <figure className="media-frame">
          <img src="/assets/sol-healthcare.webp" alt="TN-IHIP digital healthcare platform" width="622" height="406" />
        </figure>
      </div>
    </section>

    <section className="section mist" id="need">
      <div className="wrap">
        <p className="kicker"><span className="cs-step">02</span> &mdash; The need</p>
        <h2 className="display">Why this platform exists</h2>
        <div className="prose-block">
          <p className="prose">Outpatient departments handle high patient volume against a short consultation window, and the record of each visit is traditionally created on paper as the visit happens.</p>
          <p className="prose">When a patient returns, the value of that record depends entirely on it being findable and attached to the right person.</p>
        </div>
      </div>
    </section>

    <section className="section" id="built">
      <div className="wrap">
        <p className="kicker"><span className="cs-step">03</span> &mdash; What AnvasTech built</p>
        <h2 className="display">The platform</h2>
        <p className="prose">AnvasTech built TN-IHIP as a digital healthcare platform covering patient management, OPD workflows, healthcare records and the operational processes around them.</p>
      </div>
    </section>

    <section className="section mist" id="capabilities">
      <div className="wrap">
        <p className="kicker"><span className="cs-step">04</span> &mdash; Capabilities</p>
        <h2 className="display">What the platform does</h2>
        <div className="list-cards">
          <article className="list-card"><h3>Patient management</h3><p>Patients held and managed as records within the platform.</p></article>
          <article className="list-card"><h3>OPD workflows</h3><p>Outpatient department workflows supported in the platform.</p></article>
          <article className="list-card"><h3>Healthcare records</h3><p>Healthcare records held against the patient.</p></article>
          <article className="list-card"><h3>Operational processes</h3><p>Day-to-day operational processes supported alongside clinical records.</p></article>
        </div>
      </div>
    </section>

    

    <section className="section" id="related">
      <div className="wrap">
        <p className="kicker">Related case studies</p>
        <h2 className="display">Other products we have built</h2>
        <div className="list-cards">
          <Link className="list-card" to="/case-study-kubera-ai"><h3>Kubera AI</h3><p>AI-Powered Trading Platform</p></Link>
          <Link className="list-card" to="/case-study-vishful"><h3>Vishful</h3><p>Property &amp; Co-Living Operations</p></Link>
          <Link className="list-card" to="/case-study-vishful-attendance"><h3>Vishful Attendance</h3><p>Mobile Face-Scan Attendance</p></Link>
        </div>
        <div className="actions"><Link className="btn-blue" to="/case-studies">See all case studies</Link></div>
      </div>
    </section>

    <section className="section mist" id="contact-cta">
      <div className="wrap split">
        <div>
          <h2 className="display">Building something similar?</h2>
          <p className="prose">Tell us what you are trying to build. We will tell you what it would take.</p>
          <div className="actions"><Link className="btn-blue" to="/contact">Talk to our team</Link></div>
        </div>
        <figure className="media-frame">
          <img src="/assets/ai-slide-4.jpg?v=3" alt="" width="1024" height="521" loading="lazy" />
        </figure>
      </div>
    </section>
    </main>
  );
}
