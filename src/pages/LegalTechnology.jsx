import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';

export default function LegalTechnology() {
  usePageMeta("Legal Technology | AnvasTech", "Case management, document workflow and compliance tooling for in-house teams, law firms and legal operations.");
  return (
    <main id="main">

    <section className="page-hero">
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / <Link to="/what-we-do">Solutions</Link> / Legal Technology</p>
        <h1>Legal Technology</h1>
        <p className="lede">Case management, document workflow and compliance tooling for in-house teams, law firms and legal operations.</p>
      </div>
    </section>

    <section className="section" id="overview">
      <div className="wrap split">
        <div>
          <p className="kicker">Industries &amp; Use Cases</p>
          <h2 className="display">Legal work with a reliable record</h2>
          <p className="prose">Legal teams lose time to retrieval: finding the current version, the last order, the agreed position. A system organized around the matter removes most of that.</p>
          <p className="prose">Deadlines and limitation periods are tracked by the platform, which is where that responsibility belongs.</p>
          <div className="actions"><Link className="btn-blue" to="/contact">Talk to our team</Link></div>
        </div>
        <figure className="media-frame">
          <img src="/assets/sol-elegal.png" alt="Legal technology platform" width="1034" height="693" />
        </figure>
      </div>
    </section>

    <section className="section mist" id="capabilities">
      <div className="wrap">
        <p className="kicker">What we deliver</p>
        <h2 className="display">Legal operations, digitized</h2>
        <div className="list-cards">
          <article className="list-card"><h3>Matter and case management</h3><p>Every matter with its parties, stage, counsel and history in one place.</p></article>
          <article className="list-card"><h3>Document lifecycle</h3><p>Versioning, templates, approvals and secure sharing.</p></article>
          <article className="list-card"><h3>Contract management</h3><p>Drafting, negotiation tracking, obligations and renewal alerts.</p></article>
          <article className="list-card"><h3>Deadline tracking</h3><p>Hearing dates, filings and limitation periods with automatic reminders.</p></article>
          <article className="list-card"><h3>Legal spend management</h3><p>External counsel budgets, invoices and matter-wise cost reporting.</p></article>
          <article className="list-card"><h3>Compliance registers</h3><p>Statutory obligations tracked with owners and evidence.</p></article>
        </div>
      </div>
    </section>

    <section className="section" id="outcomes">
      <div className="wrap">
        <p className="kicker">Outcomes</p>
        <h2 className="display">Where it makes a difference</h2>
        <div className="list-cards">
          <article className="list-card"><h3>Time back for legal work</h3><p>Less searching, more advising.</p></article>
          <article className="list-card"><h3>Controlled risk</h3><p>Deadlines and obligations do not depend on individual memory.</p></article>
          <article className="list-card"><h3>Visible spend</h3><p>Legal cost becomes reportable by matter and by counsel.</p></article>
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
          <Link className="list-card" to="/public-digital-platforms"><h3>Public-Facing Digital Platforms</h3><p>Citizen services, constituency tools and trusted public delivery.</p></Link>
        </div>
      </div>
    </section>

    <section className="section" id="contact-cta">
      <div className="wrap split">
        <div>
          <h2 className="display">Digitize your legal function</h2>
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
