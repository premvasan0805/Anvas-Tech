import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';

export default function LogisticsOperations() {
  usePageMeta("Logistics &amp; Operations | AnvasTech", "Technology for fleet, freight, warehouse and last-mile operations \u2014 built for the way logistics actually runs.");
  return (
    <main id="main">

    <section className="page-hero">
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / <Link to="/what-we-do">Solutions</Link> / Logistics &amp; Operations</p>
        <h1>Logistics &amp; Operations</h1>
        <p className="lede">Technology for fleet, freight, warehouse and last-mile operations — built for the way logistics actually runs.</p>
      </div>
    </section>

    <section className="section" id="overview">
      <div className="wrap split">
        <div>
          <p className="kicker">Industries &amp; Use Cases</p>
          <h2 className="display">Operations that stay visible end to end</h2>
          <p className="prose">Logistics runs on exceptions: the vehicle that broke down, the consignment that missed the cut-off, the document that never reached the customer. Systems that only model the happy path get abandoned within a month.</p>
          <p className="prose">We build for the exceptions first, so the platform stays useful on the difficult days.</p>
          <div className="actions"><Link className="btn-blue" to="/contact">Talk to our team</Link></div>
        </div>
        <figure className="media-frame">
          <img src="/assets/sol-logistics.png" alt="Logistics operations" width="999" height="612" />
        </figure>
      </div>
    </section>

    <section className="section mist" id="capabilities">
      <div className="wrap">
        <p className="kicker">What we deliver</p>
        <h2 className="display">Where we work in logistics</h2>
        <div className="list-cards">
          <article className="list-card"><h3>Fleet and transport management</h3><p>Vehicles, drivers, documents and compliance in one register.</p></article>
          <article className="list-card"><h3>Warehouse operations</h3><p>Inbound, putaway, picking and dispatch with stock accuracy that holds.</p></article>
          <article className="list-card"><h3>Last-mile delivery</h3><p>Route planning, delivery apps, proof of delivery and failed-attempt handling.</p></article>
          <article className="list-card"><h3>Freight billing and settlement</h3><p>Rate contracts, trip costing, invoicing and vendor settlement.</p></article>
          <article className="list-card"><h3>Control tower visibility</h3><p>One view across trips, orders and exceptions for the operations desk.</p></article>
          <article className="list-card"><h3>Integration with partners</h3><p>Data exchange with customers, 3PLs and transporters without manual files.</p></article>
        </div>
      </div>
    </section>

    <section className="section" id="outcomes">
      <div className="wrap">
        <p className="kicker">Outcomes</p>
        <h2 className="display">Where it makes a difference</h2>
        <div className="list-cards">
          <article className="list-card"><h3>Higher asset utilization</h3><p>Better planning gets more trips out of the same fleet.</p></article>
          <article className="list-card"><h3>Fewer disputes</h3><p>Documented proof of delivery and costing settle claims faster.</p></article>
          <article className="list-card"><h3>Customers informed</h3><p>Status reaches the customer without the operations desk relaying it.</p></article>
        </div>
      </div>
    </section>

    <section className="section mist" id="related">
      <div className="wrap">
        <p className="kicker">Industries &amp; Use Cases</p>
        <h2 className="display">Explore more</h2>
        <div className="list-cards">
          <Link className="list-card" to="/financial-technology"><h3>Financial Technology</h3><p>Payments, lending, compliance and digital banking journeys.</p></Link>
          <Link className="list-card" to="/legal-technology"><h3>Legal Technology</h3><p>Case management, document workflow and compliance for legal teams.</p></Link>
          <Link className="list-card" to="/public-digital-platforms"><h3>Public-Facing Digital Platforms</h3><p>Citizen services, constituency tools and trusted public delivery.</p></Link>
        </div>
      </div>
    </section>

    <section className="section" id="contact-cta">
      <div className="wrap split">
        <div>
          <h2 className="display">Modernize your logistics operations</h2>
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
