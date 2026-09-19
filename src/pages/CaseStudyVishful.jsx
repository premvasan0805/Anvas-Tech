import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';

export default function CaseStudyVishful() {
  usePageMeta("Vishful | AnvasTech Case Study", "A property management platform for managing properties, apartments, beds, tenants, and occupancy.");
  return (
    <main id="main">

    <section className="page-hero">
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / <Link to="/case-studies">Case studies</Link> / Vishful</p>
        <h1>Vishful</h1>
        <p className="lede">A property management platform for managing properties, apartments, beds, tenants, and occupancy.</p>
      </div>
    </section>

    <section className="section" id="product">
      <div className="wrap split">
        <div>
          <p className="kicker"><span className="cs-step">01</span> &mdash; Product</p>
          <h2 className="display">Property &amp; Co-Living Operations</h2>
          <p className="prose">A property management platform for managing properties, apartments, beds, tenants, and occupancy.</p>
        </div>
        <figure className="media-frame">
          <img src="/assets/sol-vishful.jpg" alt="Vishful property management platform" width="622" height="406" />
        </figure>
      </div>
    </section>

    <section className="section mist" id="need">
      <div className="wrap">
        <p className="kicker"><span className="cs-step">02</span> &mdash; The need</p>
        <h2 className="display">Why this platform exists</h2>
        <div className="prose-block">
          <p className="prose">Co-living and managed-space operators work at a level of detail that general property software rarely models: not just a building, but the apartment inside it and the individual bed inside that.</p>
          <p className="prose">When the portfolio, the units, the tenants and the occupancy position are each held separately, the basic operational question &mdash; what is occupied right now, and what is free &mdash; has no single place to be answered.</p>
        </div>
      </div>
    </section>

    <section className="section" id="built">
      <div className="wrap">
        <p className="kicker"><span className="cs-step">03</span> &mdash; What AnvasTech built</p>
        <h2 className="display">The platform</h2>
        <p className="prose">AnvasTech built Vishful as a single workspace that holds properties, apartments, beds, tenants and occupancy in one connected structure.</p>
      </div>
    </section>

    <section className="section mist" id="capabilities">
      <div className="wrap">
        <p className="kicker"><span className="cs-step">04</span> &mdash; Capabilities</p>
        <h2 className="display">What the platform does</h2>
        <div className="list-cards">
          <article className="list-card"><h3>Property management</h3><p>Properties held and managed as records within the platform.</p></article>
          <article className="list-card"><h3>Apartment management</h3><p>Apartments managed as units within a property.</p></article>
          <article className="list-card"><h3>Bed management</h3><p>Beds managed as individual units within an apartment.</p></article>
          <article className="list-card"><h3>Tenant management</h3><p>Tenants held as records against the space they occupy.</p></article>
          <article className="list-card"><h3>Occupancy</h3><p>Occupancy tracked across the portfolio from one connected workspace.</p></article>
        </div>
      </div>
    </section>

    

    <section className="section" id="related">
      <div className="wrap">
        <p className="kicker">Related case studies</p>
        <h2 className="display">Other products we have built</h2>
        <div className="list-cards">
          <Link className="list-card" to="/case-study-vishful-attendance"><h3>Vishful Attendance</h3><p>Mobile Face-Scan Attendance</p></Link>
          <Link className="list-card" to="/case-study-elegal"><h3>eLegal / GetLegal</h3><p>AI-Powered Property Legal Intelligence</p></Link>
          <Link className="list-card" to="/case-study-anvas-logistics"><h3>Anvas Logistics</h3><p>Logistics Operations Platform</p></Link>
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
