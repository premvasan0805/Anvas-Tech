import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';

const CAPABILITIES = [
  { num: '01', title: 'Product Discovery', text: 'Understand requirements, users, workflows, and the problem the product needs to solve.' },
  { num: '02', title: 'Product Design', text: 'Create user flows, interfaces, wireframes, and prototypes that shape the product experience.' },
  { num: '03', title: 'Software Development', text: 'Develop the frontend, backend, APIs, database, and application functionality required for the product.' },
  { num: '04', title: 'AI-Assisted Development', text: 'Use tools such as Claude, Cursor, and AI coding assistants to support software development.' },
  { num: '05', title: 'Testing & Improvement', text: 'Test the software, identify issues, and improve the product through iteration.' },
  { num: '06', title: 'Product Maintenance', text: 'Continue developing and improving the product as requirements and features evolve.' },
];

const STEPS = [
  { num: '01', title: 'Understand', text: 'Requirements, users, and the problem.' },
  { num: '02', title: 'Plan', text: 'Features, workflows, technology, and development scope.' },
  { num: '03', title: 'Design', text: 'UI/UX, user flows, and product experience.' },
  { num: '04', title: 'Develop', text: 'Build the application and required functionality.' },
  { num: '05', title: 'Test', text: 'Validate functionality and identify issues.' },
  { num: '06', title: 'Improve', text: 'Iterate based on requirements and product needs.' },
];

const AREAS = [
  { num: '01', title: 'New Digital Products', text: 'Develop a new software product from an initial idea.' },
  { num: '02', title: 'Business Applications', text: 'Build software around specific business processes and requirements.' },
  { num: '03', title: 'Web & Mobile Products', text: 'Create digital products for web and mobile users.' },
  { num: '04', title: 'Existing Product Improvement', text: 'Add features, improve workflows, and continue developing an existing application.' },
];

export default function ProductEngineering() {
  usePageMeta("Product Development | AnvasTech", "AnvasTech builds software products around real requirements, combining product thinking, UI/UX, software engineering, and AI-assisted development.");
  return (
    <main id="main" className="solution-page">

    <section className="page-hero is-dark">
      <figure className="hero-art is-video art-company" aria-hidden="true">
        <video src="/assets/company-hero.mp4?v=1" poster="/assets/company-hero-poster.jpg?v=1" autoPlay muted loop playsInline preload="metadata" disablePictureInPicture></video>
      </figure>
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / <Link to="/what-we-do">Solutions</Link> / Product Development</p>
        <h1>Product Development</h1>
        <p className="lede">Turn ideas into working digital products. AnvasTech builds software products around real requirements, combining product thinking, UI/UX, software engineering, and AI-assisted development.</p>
      </div>
    </section>

    <section className="sp-band is-white" id="overview">
      <div className="sp-wrap">
        <div className="sp-intro">
          <div>
            <p className="sp-eyebrow">Product &amp; Software Engineering</p>
            <h2 className="sp-h2">Build the Product from the Ground Up</h2>
            <p className="sp-p" style={{ marginTop: '24px' }}>We work across the product development process, from understanding requirements and shaping the product to designing, developing, testing, and improving the software.</p>
            <p className="sp-p">Our focus is on building practical digital products around real user and business requirements.</p>
            <div className="sp-actions"><Link className="sp-btn" to="/contact">Talk to Our Team</Link></div>
          </div>
          {/* "From the ground up" — so the steps climb rather than stack. */}
          <figure className="sp-plate is-rise">
            <p className="sp-plate-cap">From the ground up</p>
            <ol className="sp-rise">
              {STEPS.map((st, i) => (
                <li key={st.num} style={{ '--i': i + 1 }}>
                  <b>{st.num}</b>
                  <span>{st.title}</span>
                </li>
              ))}
            </ol>
          </figure>
        </div>
      </div>
    </section>

    <section className="sp-band" id="capabilities">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">What we deliver</p>
            <h2 className="sp-h2">Product Development Across the Lifecycle</h2>
          </div>
          <p className="sp-lede">AnvasTech develops digital products through product planning, design, software development, testing, and continuous improvement.</p>
        </div>
        <div className="sp-grid is-3up">
          {CAPABILITIES.map((c) => (
            <article className="sp-cell" key={c.num}>
              <span className="sp-num">{c.num}</span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="sp-band is-neutral" id="process">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">How we build</p>
            <h2 className="sp-h2">Our Product Development Process</h2>
          </div>
          <p className="sp-lede">The same six moves on every product, from the first requirement through to the improvements that follow release.</p>
        </div>
        <ol className="sp-steps is-3up">
          {STEPS.map((st) => (
            <li className="sp-step" key={st.num}>
              <span className="sp-step-num">{st.num}</span>
              <h3>{st.title}</h3>
              <p>{st.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <section className="sp-fits" id="where-it-helps">
      <img src="/assets/ai-slide-4.jpg?v=3" alt="" width="1024" height="521" decoding="async" fetchPriority="low" aria-hidden="true" />
      <div className="sp-wrap">
        <p className="sp-eyebrow">Where it applies</p>
        <h2 className="sp-h2">Where Product Development Helps</h2>
        <ol className="sp-areas is-4up">
          {AREAS.map((a) => (
            <li className="sp-area" key={a.num}>
              <span className="sp-area-num">{a.num}</span>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <section className="sp-band is-white" id="related">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">Product &amp; Software Engineering</p>
            <h2 className="sp-h2">Explore More</h2>
          </div>
        </div>
        <div className="sp-links">
          <Link to="/web-applications">
            <h3>Web Applications</h3>
            <p>Build web applications around real user and business needs.</p>
            <span className="sp-link">Read more</span>
          </Link>
          <Link to="/mobile-applications">
            <h3>Mobile Applications</h3>
            <p>Build mobile applications around real user needs.</p>
            <span className="sp-link">Read more</span>
          </Link>
          <Link to="/ui-ux-product-design">
            <h3>UI/UX &amp; Product Design</h3>
            <p>Design digital products around people and their needs.</p>
            <span className="sp-link">Read more</span>
          </Link>
        </div>
      </div>
    </section>

    <section className="sp-band is-ink" id="contact-cta">
      <div className="sp-wrap">
        <div className="sp-close">
          <p className="sp-eyebrow">Start here</p>
          <h2>Have a Product Idea? Let&rsquo;s Build It.</h2>
          <p className="sp-lede">Share your idea or product requirement with our team and explore the right approach for turning it into working software.</p>
          <div className="sp-actions"><Link className="sp-btn" to="/contact">Start a Conversation</Link></div>
        </div>
      </div>
    </section>
    </main>
  );
}
