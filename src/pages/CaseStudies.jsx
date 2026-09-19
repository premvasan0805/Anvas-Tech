import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';

const STUDIES = [
  {
    num: '01',
    name: 'Vishful',
    to: '/case-study-vishful',
    title: 'Property & Co-Living Operations',
    text: 'A property management platform for managing properties, apartments, beds, tenants, and occupancy.',
  },
  {
    num: '02',
    name: 'Vishful Attendance',
    to: '/case-study-vishful-attendance',
    title: 'Mobile Face-Scan Attendance',
    text: 'A workforce attendance application using the mobile camera for face-based attendance and employee check-in.',
  },
  {
    num: '03',
    name: 'eLegal / GetLegal',
    to: '/case-study-elegal',
    title: 'AI-Powered Property Legal Intelligence',
    text: 'A platform for property document analysis, OCR, title-chain analysis, and structured legal risk assessment.',
  },
  {
    num: '04',
    name: 'Anvas Logistics',
    to: '/case-study-anvas-logistics',
    title: 'Logistics Operations Platform',
    text: 'A logistics ERP for shipments, consignments, carrier operations, billing, and financial visibility.',
  },
  {
    num: '05',
    name: 'Anvas Comet',
    to: '/case-study-anvas-comet',
    title: 'Business Operations Platform',
    text: 'A unified platform connecting sales, inventory, procurement, accounting, finance, and AI-assisted business workflows.',
  },
  {
    num: '06',
    name: 'FinTech',
    to: '/case-study-fintech',
    title: 'Financial Technology Platform',
    text: 'A multi-tenant financial operations platform for managing financial workflows, transactions, reporting, and business data.',
  },
  {
    num: '07',
    name: 'eHealth / TN-IHIP',
    to: '/case-study-tn-ihip',
    title: 'Digital Healthcare Platform',
    text: 'A digital healthcare platform supporting patient management, OPD workflows, healthcare records, and operational processes.',
  },
  {
    num: '08',
    name: 'Kubera AI',
    to: '/case-study-kubera-ai',
    title: 'AI-Powered Trading Platform',
    text: 'A trading platform combining AI-assisted strategy creation, market analysis, backtesting, execution workflows, and risk controls.',
  },
];

export default function CaseStudies() {
  usePageMeta("Case Studies | AnvasTech", "The products AnvasTech has built — property operations, workforce attendance, legal intelligence, logistics, business operations, fintech, healthcare and AI trading.");
  return (
    <main id="main" className="solution-page">

    <section className="page-hero is-dark">
      <figure className="hero-art is-video art-company" aria-hidden="true">
        <video src="/assets/company-hero.mp4?v=1" poster="/assets/company-hero-poster.jpg?v=1" autoPlay muted loop playsInline preload="metadata" disablePictureInPicture></video>
      </figure>
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / Case studies</p>
        <h1>Real AnvasTech Case Studies</h1>
        <p className="lede">Each case study below covers a product AnvasTech has built: what it is, the need it addresses, and what the platform actually does.</p>
      </div>
    </section>

    <section className="sp-band is-white" id="all-case-studies">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">Products we have built</p>
            <h2 className="sp-h2">Eight products, eight case studies</h2>
          </div>
          <p className="sp-lede">Every entry below is a product AnvasTech has built and maintains. Nothing here is a concept.</p>
        </div>
        <ol className="sp-index" id="cs-list">
          {STUDIES.map((s) => (
            <Link to={s.to} key={s.num}>
              <span className="sp-index-num">{s.num}</span>
              <span className="sp-index-name">{s.name}</span>
              <span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </span>
              <span className="sp-link">Read Case Study</span>
            </Link>
          ))}
        </ol>
      </div>
    </section>

    <section className="sp-band is-ink" id="contact-cta">
      <div className="sp-wrap">
        <div className="sp-close">
          <p className="sp-eyebrow">Start here</p>
          <h2>Have a Complex Problem to Solve?</h2>
          <p className="sp-lede">Tell us where your process breaks today. We can explore the technology, engineering, and product approach needed to turn it into a working solution.</p>
          <div className="sp-actions"><Link className="sp-btn" to="/contact">Start a Conversation</Link></div>
        </div>
      </div>
    </section>
    </main>
  );
}
