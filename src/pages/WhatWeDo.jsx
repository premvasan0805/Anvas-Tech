import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';
import { relatedProducts } from '../lib/products.js';
import ProductCard from '../components/ProductCard.jsx';

/* Every id below is a menu or cross-page anchor target. Keep them.

   These are ids into src/lib/products.js, not descriptions. The descriptions
   that used to sit here were written for this page and did not match the
   products: FinTech Platform was credited with "payments, compliance and
   digital banking journeys" and Ungal Pakkam with "service delivery", though
   both pages state their feature lists are unverified and unpublished; Kubera
   AI lost trading entirely; eLegal gained case management. A product is now
   described here in the same words its own page uses. */
const PROJECT_IDS = ['anvas-logistics', 'anvas-comet', 'fintech', 'kubera-ai', 'elegal', 'ungal-pakkam', 'mla-calendar'];

/* The footer links to /what-we-do#fintech-platform, which is not the id this
   product carries in the shared map. Keep the anchor the footer expects. */
const PROJECT_ANCHORS = { fintech: 'fintech-platform' };

const AI = [
  { id: 'ai', to: '/generative-ai', title: 'Generative AI', text: 'Practical GenAI programs that move from pilots to production outcomes.' },
  { id: 'ai-automation', to: '/ai-assisted-automation', title: 'AI-Assisted Automation', text: 'Use AI to make software workflows more efficient.' },
  { id: 'intelligent-workflows', to: '/intelligent-workflows', title: 'Business Automation', text: 'Simplify repetitive business processes with software.' },
  { id: 'ai-agents', to: '/ai-agents', title: 'AI Agents', text: 'Agentic systems that plan, act and collaborate across enterprise tools.' },
  { id: 'data-ai-engineering', to: '/data-ai-engineering', title: 'Data & Analytics', text: 'Turn application data into useful information.' },
];

const ENGINEERING = [
  { id: 'product-engineering-card', to: '/product-engineering', title: 'Product Development', text: 'Turn ideas into working digital products.' },
  { id: 'ai-dev-workspace', to: '/ai-development-workspace', title: 'AI Development Workspace', text: 'AI-assisted development using modern coding tools and delivery practices.' },
  { id: 'web-applications', to: '/web-applications', title: 'Web Applications', text: 'Build web applications around real user and business needs.' },
  { id: 'mobile-applications', to: '/mobile-applications', title: 'Mobile Applications', text: 'Build mobile applications around real user needs.' },
  { id: 'uiux', to: '/ui-ux-product-design', title: 'UI/UX & Product Design', text: 'Design digital products around people and their needs.' },
  { id: 'cloud-deployment', to: '/cloud-deployment', title: 'Cloud & Deployment', text: 'Scalable infrastructure, CI/CD and production-ready cloud deployment.' },
];

const SECTORS = [
  { id: 'logistics', to: '/logistics-operations', title: 'Logistics & Operations', text: 'Systems for fleet, freight, inventory and operational visibility.' },
  { id: 'fintech', to: '/financial-technology', title: 'Financial Technology', text: 'Platforms and products for digital finance, payments and compliance.' },
  { id: 'legal', to: '/legal-technology', title: 'Legal Technology', text: 'Workflows and case systems for legal teams and public institutions.' },
  { id: 'public', to: '/public-digital-platforms', title: 'Public-Facing Digital Platforms', text: 'Citizen services, constituency tools and trusted public delivery.' },
  { id: 'enterprise', to: '/enterprise-applications', title: 'Enterprise Applications', text: 'Business applications that simplify day-to-day work across teams.' },
];

export default function WhatWeDo() {
  usePageMeta("Solutions | AnvasTech", "Capabilities, industries and real projects — from logistics and fintech to AI platforms and public-facing systems.");
  return (
    <main id="main" className="solution-page wwd-page">

    <section className="page-hero is-dark">
      <figure className="hero-art is-video art-company" aria-hidden="true">
        <video src="/assets/company-hero.mp4?v=1" poster="/assets/company-hero-poster.jpg?v=1" autoPlay muted loop playsInline preload="metadata" disablePictureInPicture></video>
      </figure>
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / Solutions</p>
        <h1>Solutions</h1>
        <p className="lede">Capabilities, industries and real projects &mdash; from logistics and fintech to AI platforms and public-facing systems.</p>
      </div>
    </section>

    <section className="sp-band is-white" id="projects">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">Featured projects</p>
            <h2 className="sp-h2">Built for real-world impact</h2>
          </div>
          <p className="sp-lede">Seven platforms AnvasTech has built, each with its own page.</p>
        </div>
        <div className="sp-cards">
          {relatedProducts(PROJECT_IDS).map((pr) => <ProductCard product={pr} anchorId={PROJECT_ANCHORS[pr.id]} key={pr.id} />)}
        </div>
      </div>
    </section>

    <section className="sp-band is-tight" id="vishful">
      <div className="sp-wrap">
        <div className="sp-intro">
          <div>
            <p className="sp-eyebrow">Product</p>
            <h2 className="sp-h2">Vishful</h2>
            <p className="sp-p" style={{ marginTop: '24px' }}>A digital platform for managing properties, apartments, beds, tenants, and occupancy from a connected workspace.</p>
            <div className="sp-actions"><Link className="sp-btn" to="/vishful">View product</Link></div>
          </div>
          <figure className="sp-shot">
            <img src="/assets/sol-vishful.jpg" alt="Vishful property management app" width="572" height="910" />
          </figure>
        </div>
      </div>
    </section>

    <section className="sp-band is-white is-tight" id="attendance">
      <div className="sp-wrap">
        <div className="sp-intro">
          <div>
            <p className="sp-eyebrow">Workforce</p>
            <h2 className="sp-h2">Vishful Attendance</h2>
            <p className="sp-p" style={{ marginTop: '24px' }}>A mobile attendance application that uses the mobile camera for face-based employee attendance.</p>
            <div className="sp-actions"><Link className="sp-btn" to="/vishful-attendance">View product</Link></div>
          </div>
          <figure className="sp-shot">
            <img src="/assets/sol-attendance.png?v=3" alt="Vishful Attendance mobile application" width="1024" height="682" />
          </figure>
        </div>
      </div>
    </section>

    <section className="sp-band is-tight" id="healthcare">
      <div className="sp-wrap">
        <div className="sp-intro">
          <div>
            <p className="sp-eyebrow">Healthcare</p>
            <h2 className="sp-h2">eHealth / TN-IHIP</h2>
            <p className="sp-p" style={{ marginTop: '24px' }}>A healthcare-focused digital platform supporting healthcare and OPD-related workflows.</p>
            <div className="sp-actions"><Link className="sp-btn" to="/tn-ihip">View platform</Link></div>
          </div>
          {/* This section used to show a stock photograph of a masked worker
              in the product-screenshot frame, captioned "Healthcare app" — a
              picture of a stranger presented as this platform in use. There is
              no published shot of it, so the plate carries the name only, the
              same as the product's own page. Do not put a photograph here. */}
          <figure className="sp-plate is-mark">
            <p className="sp-mark-kicker">Digital Healthcare Platform</p>
            <p className="sp-mark-name">eHealth / TN-IHIP</p>
            <div className="sp-mark-rule" aria-hidden="true" />
          </figure>
        </div>
      </div>
    </section>

    <section className="sp-band is-white" id="generative-ai">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">AI &amp; Intelligent Systems</p>
            <h2 className="sp-h2">Intelligence that scales with your work</h2>
          </div>
          <p className="sp-lede">Where AI does real work inside a product, a workflow, or our own development.</p>
        </div>
        <div className="sp-links is-4up">
          {AI.map((a) => (
            <Link to={a.to} id={a.id} key={a.id}>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
              <span className="sp-link">Read more</span>
            </Link>
          ))}
        </div>
      </div>
    </section>

    <section className="sp-band" id="product-engineering">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">Digital Engineering</p>
            <h2 className="sp-h2">Engineering that ships</h2>
          </div>
          <p className="sp-lede">From the first requirement through to the infrastructure it runs on.</p>
        </div>
        <div className="sp-links is-4up">
          {ENGINEERING.map((e) => (
            <Link to={e.to} id={e.id} key={e.id}>
              <h3>{e.title}</h3>
              <p>{e.text}</p>
              <span className="sp-link">Read more</span>
            </Link>
          ))}
        </div>
      </div>
    </section>

    <section className="sp-fits" id="industries">
      <img src="/assets/ai-slide-4.jpg?v=3" alt="" width="1024" height="521" decoding="async" fetchPriority="low" aria-hidden="true" />
      <div className="sp-wrap">
        <p className="sp-eyebrow">Industries &amp; Use Cases</p>
        <h2 className="sp-h2">Where we create impact</h2>
        <ol className="sp-areas">
          {SECTORS.slice(0, 3).map((s, i) => (
            <li className="sp-area" key={s.id}>
              <span className="sp-area-num">{String(i + 1).padStart(2, '0')}</span>
              <h3><Link to={s.to} id={s.id}>{s.title}</Link></h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        <ol className="sp-areas" style={{ marginTop: '36px' }}>
          {SECTORS.slice(3).map((s, i) => (
            <li className="sp-area" key={s.id}>
              <span className="sp-area-num">{String(i + 4).padStart(2, '0')}</span>
              <h3><Link to={s.to} id={s.id}>{s.title}</Link></h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    {/* The four sections below (#apps, #ers, #infra, #products, #bpo) describe
        capabilities that are not evidenced anywhere else on this site. They are
        kept because they are existing menu targets, but they need verifying or
        removing — see the note in the section itself. */}
    <section className="sp-band is-white" id="apps">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">Under review</p>
            <h2 className="sp-h2">Capabilities being verified</h2>
          </div>
          <p className="sp-lede">These service lines are being checked against what AnvasTech actually delivers before they are described in detail here.</p>
        </div>
        <div className="sp-note">
          <p>Advisory and consulting, enterprise application platforms, IT infrastructure, cloud and network operations, security services, and business process operations were listed here without supporting detail elsewhere on this site.</p>
          <p>Rather than describe them as delivered capabilities, this section is held until each one is confirmed. If you need detail on any of them, ask us directly.</p>
          <div className="sp-actions"><Link className="sp-btn" to="/contact">Ask about a capability</Link></div>
        </div>
        <div id="ers" />
        <div id="infra" />
        <div id="cybersecurity" />
        <div id="products" />
        <div id="bpo" />
        <div id="edtech" />
        <div id="gcc" />
        <div id="supply" />
      </div>
    </section>

    <section className="sp-band is-ink" id="contact-cta">
      <div className="sp-wrap">
        <div className="sp-close">
          <p className="sp-eyebrow">Start here</p>
          <h2>Tell us what you need built</h2>
          <p className="sp-lede">Share the requirement and we will map the product, design and engineering approach that fits it.</p>
          <div className="sp-actions">
            <Link className="sp-btn" to="/contact">Start a Conversation</Link>
            <Link className="sp-btn-ghost" to="/industries">Explore Our Products</Link>
          </div>
        </div>
      </div>
    </section>
    </main>
  );
}
