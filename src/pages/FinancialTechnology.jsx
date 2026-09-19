import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';

export default function FinancialTechnology() {
  usePageMeta("Financial Technology | AnvasTech", "Technology for payments, lending, compliance and digital banking \u2014 built to the standard regulated finance demands.");
  return (
    <main id="main">

    <section className="page-hero">
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / <Link to="/what-we-do">Solutions</Link> / Financial Technology</p>
        <h1>Financial Technology</h1>
        <p className="lede">Technology for payments, lending, compliance and digital banking — built to the standard regulated finance demands.</p>
      </div>
    </section>

    <section className="section" id="overview">
      <div className="wrap split">
        <div>
          <p className="kicker">Industries &amp; Use Cases</p>
          <h2 className="display">Financial systems that can be audited</h2>
          <p className="prose">In financial technology, correctness and traceability outrank everything else. Every transaction needs a ledger entry, an audit trail and a reconciliation path.</p>
          <p className="prose">We build with those controls in the architecture, so compliance is a property of the system rather than a reporting exercise.</p>
          <div className="actions"><Link className="btn-blue" to="/contact">Talk to our team</Link></div>
        </div>
        <figure className="media-frame">
          <img src="/assets/sol-fintrack.png" alt="Financial technology platform" width="997" height="627" />
        </figure>
      </div>
    </section>

    <section className="section mist" id="capabilities">
      <div className="wrap">
        <p className="kicker">What we deliver</p>
        <h2 className="display">Across the financial stack</h2>
        <div className="list-cards">
          <article className="list-card"><h3>Payments and collections</h3><p>UPI, cards, net banking, mandates and settlement handling.</p></article>
          <article className="list-card"><h3>Lending journeys</h3><p>Application, underwriting support, disbursement and collections workflows.</p></article>
          <article className="list-card"><h3>Onboarding and KYC</h3><p>Digital identity verification with risk scoring and re-verification.</p></article>
          <article className="list-card"><h3>Ledgers and reconciliation</h3><p>Double-entry accounting reconciled against bank and gateway data.</p></article>
          <article className="list-card"><h3>Risk and fraud controls</h3><p>Limits, velocity checks, screening and anomaly detection.</p></article>
          <article className="list-card"><h3>Regulatory reporting</h3><p>Scheduled reporting and audit extracts in required formats.</p></article>
        </div>
      </div>
    </section>

    <section className="section" id="outcomes">
      <div className="wrap">
        <p className="kicker">Outcomes</p>
        <h2 className="display">Where it makes a difference</h2>
        <div className="list-cards">
          <article className="list-card"><h3>Faster customer journeys</h3><p>Onboarding and disbursement compress from days to minutes.</p></article>
          <article className="list-card"><h3>Reconciled books</h3><p>Differences are caught daily rather than at close.</p></article>
          <article className="list-card"><h3>Regulator-ready</h3><p>Evidence is produced by the system when it is asked for.</p></article>
        </div>
      </div>
    </section>

    <section className="section mist" id="related">
      <div className="wrap">
        <p className="kicker">Industries &amp; Use Cases</p>
        <h2 className="display">Explore more</h2>
        <div className="list-cards">
          <Link className="list-card" to="/logistics-operations"><h3>Logistics &amp; Operations</h3><p>Fleet, freight, warehouse and last-mile operations on one connected system.</p></Link>
          <Link className="list-card" to="/legal-technology"><h3>Legal Technology</h3><p>Case management, document workflow and compliance for legal teams.</p></Link>
          <Link className="list-card" to="/public-digital-platforms"><h3>Public-Facing Digital Platforms</h3><p>Citizen services, constituency tools and trusted public delivery.</p></Link>
        </div>
      </div>
    </section>

    <section className="section" id="contact-cta">
      <div className="wrap split">
        <div>
          <h2 className="display">Build regulated financial technology</h2>
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
