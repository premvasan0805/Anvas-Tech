import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';

export default function CaseStudyVishfulAttendance() {
  usePageMeta("Vishful Attendance | AnvasTech Case Study", "A workforce attendance application using the mobile camera for face-based attendance and employee check-in.");
  return (
    <main id="main">

    <section className="page-hero">
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / <Link to="/case-studies">Case studies</Link> / Vishful Attendance</p>
        <h1>Vishful Attendance</h1>
        <p className="lede">A workforce attendance application using the mobile camera for face-based attendance and employee check-in.</p>
      </div>
    </section>

    <section className="section" id="product">
      <div className="wrap split">
        <div>
          <p className="kicker"><span className="cs-step">01</span> &mdash; Product</p>
          <h2 className="display">Mobile Face-Scan Attendance</h2>
          <p className="prose">A workforce attendance application using the mobile camera for face-based attendance and employee check-in.</p>
        </div>
        <figure className="media-frame">
          <img src="/assets/sol-attendance.png" alt="Vishful Attendance mobile application" width="1024" height="682" />
        </figure>
      </div>
    </section>

    <section className="section mist" id="need">
      <div className="wrap">
        <p className="kicker"><span className="cs-step">02</span> &mdash; The need</p>
        <h2 className="display">Why this platform exists</h2>
        <div className="prose-block">
          <p className="prose">Attendance capture usually depends either on fixed biometric hardware installed at one location, or on a manual register that has to be reconciled later.</p>
          <p className="prose">Neither travels well to distributed teams, additional sites or field staff, where the device that is reliably present is the phone the employee already carries.</p>
        </div>
      </div>
    </section>

    <section className="section" id="built">
      <div className="wrap">
        <p className="kicker"><span className="cs-step">03</span> &mdash; What AnvasTech built</p>
        <h2 className="display">The platform</h2>
        <p className="prose">AnvasTech built Vishful Attendance as a mobile application that uses the phone camera for face-based attendance, with check-in, attendance tracking, leave management and reporting in the same system.</p>
      </div>
    </section>

    <section className="section mist" id="capabilities">
      <div className="wrap">
        <p className="kicker"><span className="cs-step">04</span> &mdash; Capabilities</p>
        <h2 className="display">What the platform does</h2>
        <div className="list-cards">
          <article className="list-card"><h3>Face-based attendance</h3><p>Attendance captured using the mobile camera through face scanning.</p></article>
          <article className="list-card"><h3>Employee check-in</h3><p>Employee check-in performed from the mobile application.</p></article>
          <article className="list-card"><h3>Attendance tracking</h3><p>Attendance records tracked within the platform.</p></article>
          <article className="list-card"><h3>Leave management</h3><p>Leave managed against the same employee record as attendance.</p></article>
          <article className="list-card"><h3>Reporting</h3><p>Attendance and leave reporting available from the platform.</p></article>
        </div>
      </div>
    </section>

    

    <section className="section" id="related">
      <div className="wrap">
        <p className="kicker">Related case studies</p>
        <h2 className="display">Other products we have built</h2>
        <div className="list-cards">
          <Link className="list-card" to="/case-study-elegal"><h3>eLegal / GetLegal</h3><p>AI-Powered Property Legal Intelligence</p></Link>
          <Link className="list-card" to="/case-study-anvas-logistics"><h3>Anvas Logistics</h3><p>Logistics Operations Platform</p></Link>
          <Link className="list-card" to="/case-study-anvas-comet"><h3>Anvas Comet</h3><p>Business Operations Platform</p></Link>
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
