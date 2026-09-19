import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';
import RelatedProducts from '../components/RelatedProducts.jsx';

/* Three moments of one scan, in the order they happen: the camera reads, the
   check-in is recorded, the record joins the register. A real sequence. */
const COVERS = [
  { title: 'Face-Based Attendance', text: 'Use the mobile camera to support employee attendance.' },
  { title: 'Employee Check-In', text: 'Record employee attendance through the application.' },
  { title: 'Attendance Management', text: 'Manage workforce attendance information digitally.' },
];

export default function VishfulAttendance() {
  usePageMeta("Vishful Attendance | AnvasTech", "A mobile attendance application that uses the mobile camera for face-based employee attendance.");
  return (
    <main id="main" className="solution-page">

    <section className="page-hero is-light">
      <figure className="hero-art art-products" aria-hidden="true">
        <video src="/assets/products-hero.mp4?v=1" poster="/assets/products-hero-poster.jpg?v=1" autoPlay muted loop playsInline preload="metadata" disablePictureInPicture></video>
      </figure>
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / <Link to="/industries">Products</Link> / Vishful Attendance</p>
        <p className="kicker">Face-Scan Workforce Attendance</p>
        <h1>Vishful Attendance</h1>
        <p className="lede">A mobile attendance application that uses the mobile camera for face-based employee attendance.</p>
      </div>
    </section>

    <section className="sp-band is-tight is-white" id="overview">
      <div className="sp-wrap">
        <div className="sp-intro">
          <div>
            <p className="sp-eyebrow">Product</p>
            <h2 className="sp-h2">A Simpler Way to Record Workforce Attendance</h2>
            <p className="sp-p" style={{ marginTop: '24px' }}>Vishful Attendance brings mobile-based face scanning into the employee attendance process.</p>
            <div className="sp-actions"><Link className="sp-btn" to="/contact">Talk to Our Team</Link></div>
          </div>
          <figure className="sp-shot">
            <img src="/assets/sol-attendance.png" alt="Vishful Attendance mobile application" width="1024" height="682" />
          </figure>
        </div>
      </div>
    </section>

    <section className="sp-band is-tight is-ink" id="covers">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">Product</p>
            <h2 className="sp-h2">What It Covers</h2>
          </div>
          <p className="sp-lede">The camera does the recognising; the application handles the check-in and the record that follows it.</p>
        </div>
        <p className="sp-device-cap">One scan, end to end</p>
        <ol className="sp-beats">
          {COVERS.map((c) => (
            <li key={c.title}>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <RelatedProducts ids={['anvas-comet', 'mla-calendar', 'kubera-ai']} />

    <section className="sp-band is-tight is-neutral" id="contact-cta">
      <div className="sp-wrap">
        <div className="sp-close">
          <p className="sp-eyebrow">Start here</p>
          <h2>Want to know more?</h2>
          <p className="sp-lede">Ask us about Vishful Attendance, or tell us what you are trying to build.</p>
          <div className="sp-actions"><Link className="sp-btn" to="/contact">Start a Conversation</Link></div>
        </div>
      </div>
    </section>
    </main>
  );
}
