import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';

export default function EnterpriseApplications() {
  usePageMeta("Enterprise Applications | AnvasTech", "Enterprise applications \u2014 built, integrated or modernized \u2014 that make daily work simpler instead of adding another login.");
  return (
    <main id="main">

    <section className="page-hero">
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / <Link to="/what-we-do">Solutions</Link> / Enterprise Applications</p>
        <h1>Enterprise Applications</h1>
        <p className="lede">Enterprise applications — built, integrated or modernized — that make daily work simpler instead of adding another login.</p>
      </div>
    </section>

    <section className="section" id="overview">
      <div className="wrap split">
        <div>
          <p className="kicker">Industries &amp; Use Cases</p>
          <h2 className="display">Fewer systems, better connected</h2>
          <p className="prose">Most enterprises do not need another application; they need the ones they have to talk to each other and to reflect how the business actually works.</p>
          <p className="prose">We modernize what is worth keeping, replace what is not, and integrate the result so data stops being retyped between systems.</p>
          <div className="actions"><Link className="btn-blue" to="/contact">Talk to our team</Link></div>
        </div>
        <figure className="media-frame">
          <img src="/assets/cs-pharma.jpg" alt="Enterprise applications" width="800" height="480" />
        </figure>
      </div>
    </section>

    <section className="section mist" id="capabilities">
      <div className="wrap">
        <p className="kicker">What we deliver</p>
        <h2 className="display">Modernize, integrate, extend</h2>
        <div className="list-cards">
          <article className="list-card"><h3>Application modernization</h3><p>Move legacy systems to supportable architectures without a big-bang rewrite.</p></article>
          <article className="list-card"><h3>Custom business applications</h3><p>Build the system the process needs when packaged software does not fit.</p></article>
          <article className="list-card"><h3>Integration layer</h3><p>APIs and event flows connecting ERP, CRM, HR and finance systems.</p></article>
          <article className="list-card"><h3>Workflow and approvals</h3><p>Digitize the approvals that still run on email and spreadsheets.</p></article>
          <article className="list-card"><h3>Reporting and dashboards</h3><p>One reporting layer across systems instead of per-system exports.</p></article>
          <article className="list-card"><h3>Rollout and adoption</h3><p>Training, change management and hypercare so the system is actually used.</p></article>
        </div>
      </div>
    </section>

    <section className="section" id="outcomes">
      <div className="wrap">
        <p className="kicker">Outcomes</p>
        <h2 className="display">Where it makes a difference</h2>
        <div className="list-cards">
          <article className="list-card"><h3>Less duplicate data entry</h3><p>Integration removes the retyping between systems.</p></article>
          <article className="list-card"><h3>Processes that match reality</h3><p>Applications reflect how the business runs today.</p></article>
          <article className="list-card"><h3>Lower maintenance load</h3><p>Modernized systems cost less to keep running.</p></article>
        </div>
      </div>
    </section>

    <section className="section mist" id="related">
      <div className="wrap">
        <p className="kicker">Industries &amp; Use Cases</p>
        <h2 className="display">Explore more</h2>
        <div className="list-cards">
          <Link className="list-card" to="/logistics-operations"><h3>Logistics &amp; Operations</h3><p>Fleet, freight, warehouse and last-mile operations on one connected system.</p></Link>
          <Link className="list-card" to="/financial-technology"><h3>Financial Technology</h3><p>Payments, lending, compliance and digital banking journeys.</p></Link>
          <Link className="list-card" to="/legal-technology"><h3>Legal Technology</h3><p>Case management, document workflow and compliance for legal teams.</p></Link>
        </div>
      </div>
    </section>

    <section className="section" id="contact-cta">
      <div className="wrap split">
        <div>
          <h2 className="display">Modernize your business applications</h2>
          <p className="prose">Tell us where you are today. We will map the shortest route to a working solution.</p>
          <div className="actions"><Link className="btn-blue" to="/contact">Start a conversation</Link></div>
        </div>
        <figure className="media-frame">
          <img src="/assets/cs-tile-2.jpg" alt="AnvasTech team" width="760" height="375" />
        </figure>
      </div>
    </section>
    </main>
  );
}
