import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';

export default function CaseStudyAnvasLogistics() {
  usePageMeta("Anvas Logistics | AnvasTech Case Study", "A logistics ERP for shipments, consignments, carrier operations, billing, and financial visibility.");
  return (
    <main id="main">

    <section className="page-hero">
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / <Link to="/case-studies">Case studies</Link> / Anvas Logistics</p>
        <h1>Anvas Logistics</h1>
        <p className="lede">A logistics ERP for shipments, consignments, carrier operations, billing, and financial visibility.</p>
      </div>
    </section>

    <section className="section" id="product">
      <div className="wrap split">
        <div>
          <p className="kicker"><span className="cs-step">01</span> &mdash; Product</p>
          <h2 className="display">Logistics Operations Platform</h2>
          <p className="prose">A logistics ERP for shipments, consignments, carrier operations, billing, and financial visibility.</p>
        </div>
        <figure className="media-frame">
          <img src="/assets/sol-anvas-logistics.png" alt="Anvas Logistics platform" width="1024" height="682" />
        </figure>
      </div>
    </section>

    <section className="section mist" id="need">
      <div className="wrap">
        <p className="kicker"><span className="cs-step">02</span> &mdash; The need</p>
        <h2 className="display">Why this platform exists</h2>
        <div className="prose-block">
          <p className="prose">Logistics operations and logistics finance are usually run in different systems: one records what moved, the other records what it cost and what was invoiced.</p>
          <p className="prose">When a consignment, the carrier that moved it and the billing raised against it are not held together, the financial position of the operation is assembled after the fact rather than visible during it.</p>
        </div>
      </div>
    </section>

    <section className="section" id="built">
      <div className="wrap">
        <p className="kicker"><span className="cs-step">03</span> &mdash; What AnvasTech built</p>
        <h2 className="display">The platform</h2>
        <p className="prose">AnvasTech built Anvas Logistics as an ERP that connects shipments, consignments, tracking, carrier operations, billing and financial visibility in one platform.</p>
      </div>
    </section>

    <section className="section mist" id="capabilities">
      <div className="wrap">
        <p className="kicker"><span className="cs-step">04</span> &mdash; Capabilities</p>
        <h2 className="display">What the platform does</h2>
        <div className="list-cards">
          <article className="list-card"><h3>Shipments</h3><p>Shipments recorded and managed within the platform.</p></article>
          <article className="list-card"><h3>Consignments</h3><p>Consignments held as records against shipments.</p></article>
          <article className="list-card"><h3>Tracking</h3><p>Shipment and consignment tracking within the platform.</p></article>
          <article className="list-card"><h3>Carrier operations</h3><p>Carrier operations managed as part of the logistics workflow.</p></article>
          <article className="list-card"><h3>Billing</h3><p>Billing raised within the same platform as the operational record.</p></article>
          <article className="list-card"><h3>Financial visibility</h3><p>Financial position visible against logistics operations.</p></article>
        </div>
      </div>
    </section>

    

    <section className="section" id="related">
      <div className="wrap">
        <p className="kicker">Related case studies</p>
        <h2 className="display">Other products we have built</h2>
        <div className="list-cards">
          <Link className="list-card" to="/case-study-anvas-comet"><h3>Anvas Comet</h3><p>Business Operations Platform</p></Link>
          <Link className="list-card" to="/case-study-fintech"><h3>FinTech</h3><p>Financial Technology Platform</p></Link>
          <Link className="list-card" to="/case-study-tn-ihip"><h3>eHealth / TN-IHIP</h3><p>Digital Healthcare Platform</p></Link>
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
