import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';

const WHAT_WE_DO = [
  { num: '01', title: 'Build Products', text: 'We develop our own software products designed around real-world business and operational needs.' },
  { num: '02', title: 'Engineer Solutions', text: 'We build custom web applications, mobile applications, business software, and digital solutions based on specific requirements.' },
  { num: '03', title: 'Use AI as an Accelerator', text: 'We use modern AI tools and AI-assisted development to help our engineers explore ideas, develop software, solve problems, and improve development workflows.' },
];

const FOCUS = [
  { to: '/product-engineering', title: 'Product Development', text: 'Turn ideas into working digital products.' },
  { to: '/custom-software-development', title: 'Custom Software Development', text: 'Build software around your specific requirements.' },
  { to: '/web-applications', title: 'Web & Mobile Applications', text: 'Build applications for web and mobile users.' },
  { to: '/ui-ux-product-design', title: 'UI/UX & Product Design', text: 'Design digital products around people and their needs.' },
  { to: '/intelligent-workflows', title: 'Business Automation', text: 'Simplify repetitive business processes with software.' },
  { to: '/what-we-do#ai', title: 'AI & Intelligent Systems', text: 'Generative AI, AI agents, and intelligent automation.' },
  { to: '/ai-assisted-engineering', title: 'AI-Assisted Engineering', text: 'Build faster with Claude, Cursor and intelligent coding assistants.' },
  { to: '/digital-solutions', title: 'Data & Digital Solutions', text: 'Turn real-world requirements into practical software solutions.' },
];

const LEADERSHIP = [
  { num: '01', title: 'Product Thinking', text: 'We build software products around real business and operational needs.' },
  { num: '02', title: 'Engineering First', text: 'We focus on scalable software, clean architecture, and reliable engineering practices.' },
  { num: '03', title: 'AI-Accelerated Development', text: 'We use modern AI tools such as Claude, Cursor, and intelligent coding assistants to accelerate development and problem-solving.' },
  { num: '04', title: 'Continuous Innovation', text: 'We continuously explore new technologies and improve the products and solutions we build.' },
];

const WORK = [
  { to: '/vishful', title: 'Vishful', text: 'Property & Co-Living Management' },
  { to: '/anvas-logistics', title: 'Anvas Logistics', text: 'Logistics Operations Platform' },
  { to: '/elegal', title: 'eLegal', text: 'AI-Powered Property Legal Intelligence' },
  { to: '/vishful-attendance', title: 'Vishful Attendance', text: 'Face-Scan Workforce Attendance' },
];

export default function WhoWeAre() {
  usePageMeta("About AnvasTech | AnvasTech", "AnvasTech is a product and technology company focused on building real-world digital products and delivering software solutions for businesses.");
  return (
    <main id="main" className="solution-page">

    <section className="page-hero is-dark">
      <figure className="hero-art is-video art-company" aria-hidden="true">
        <video src="/assets/company-hero.mp4?v=1" poster="/assets/company-hero-poster.jpg?v=1" autoPlay muted loop playsInline preload="metadata" disablePictureInPicture></video>
      </figure>
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / About AnvasTech</p>
        <h1>About AnvasTech</h1>
        <p className="lede">Building Products. Engineering Solutions. Accelerating with AI.</p>
      </div>
    </section>

    <section className="sp-band is-white" id="story">
      <div className="sp-wrap">
        <div className="sp-intro">
          <div>
            <p className="sp-eyebrow">Who we are</p>
            <h2 className="sp-h2">Building Products. Engineering Solutions. Accelerating with AI.</h2>
            <p className="sp-p" style={{ marginTop: '24px' }}>AnvasTech is a product and technology company focused on building real-world digital products and delivering software solutions for businesses.</p>
            <p className="sp-p">We combine product thinking, UI/UX design, software engineering, automation, and AI-assisted development to turn ideas and requirements into practical digital solutions.</p>
          </div>
          {/* The heading beside this is three clauses; the plate sets them as
              three lines. No portrait — nothing here should read as a
              photograph of an AnvasTech employee. */}
          <figure className="sp-plate is-verse">
            <ol className="sp-verse">
              {WHAT_WE_DO.map((w) => (
                <li key={w.num}>
                  <b>{w.num}</b>
                  <strong>{w.title}</strong>
                  <span>{w.text}</span>
                </li>
              ))}
            </ol>
          </figure>
        </div>
      </div>
    </section>

    <section className="sp-band" id="what-we-do">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">What we do</p>
            <h2 className="sp-h2">What We Do</h2>
          </div>
          <p className="sp-lede">Our own products, software built to a client's requirement, and AI used to move both along faster.</p>
        </div>
        <div className="sp-grid is-3up">
          {WHAT_WE_DO.map((w) => (
            <article className="sp-cell" key={w.num}>
              <span className="sp-num">{w.num}</span>
              <h3>{w.title}</h3>
              <p>{w.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="sp-band is-white" id="focus">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">Our focus</p>
            <h2 className="sp-h2">Our Focus</h2>
          </div>
          <p className="sp-lede">The eight areas the work falls into, each with its own page.</p>
        </div>
        <div className="sp-links is-4up">
          {FOCUS.map((f) => (
            <Link to={f.to} key={f.to}>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
              <span className="sp-link">Read more</span>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* One statement, on the dark band, because it is the position the rest
        of the page is built on. */}
    <section className="sp-fits" id="approach">
      <img src="/assets/ai-slide-4.jpg?v=3" alt="" width="1024" height="521" decoding="async" fetchPriority="low" aria-hidden="true" />
      <div className="sp-wrap">
        <p className="sp-eyebrow">How we think</p>
        <h2 className="sp-h2">Technology should solve real problems.</h2>
        <p className="sp-lede" style={{ marginTop: '24px', maxWidth: '62ch' }}>We focus on understanding the problem first, choosing the right approach, and building software that is practical, usable, and continuously improvable.</p>
      </div>
    </section>

    <section className="sp-band" id="leadership">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">Our team</p>
            <h2 className="sp-h2">Our Approach to Leadership</h2>
          </div>
          <p className="sp-lede">AnvasTech is driven by a technology-focused team that combines product thinking, software engineering, and modern development practices to build practical digital solutions.</p>
        </div>
        <div className="sp-grid">
          {LEADERSHIP.map((l) => (
            <article className="sp-cell" key={l.num}>
              <span className="sp-num">{l.num}</span>
              <h3>{l.title}</h3>
              <p>{l.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="sp-band is-white" id="our-work">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">Our work</p>
            <h2 className="sp-h2">Our Work Speaks Through What We Build</h2>
          </div>
          {/* Deliberate: no awards or recognition are claimed here. */}
          <p className="sp-lede">Rather than listing awards or recognition that we cannot substantiate, AnvasTech focuses on the products, platforms, and technology solutions we build across real-world domains.</p>
        </div>
        <div className="sp-links is-4up">
          {WORK.map((w) => (
            <Link to={w.to} key={w.to}>
              <h3>{w.title}</h3>
              <p>{w.text}</p>
              <span className="sp-link">Read more</span>
            </Link>
          ))}
        </div>
        <div className="sp-actions"><Link className="sp-btn" to="/industries">Explore Our Products</Link></div>
      </div>
    </section>

    <section className="sp-band is-ink" id="contact-cta">
      <div className="sp-wrap">
        <div className="sp-close">
          <p className="sp-eyebrow">Start here</p>
          <h2>Have an idea or technology requirement?</h2>
          <p className="sp-lede">Let&rsquo;s explore what we can build together.</p>
          <div className="sp-actions">
            <Link className="sp-btn" to="/industries">Explore Our Products</Link>
            <Link className="sp-btn-ghost" to="/what-we-do">Explore Our Solutions</Link>
          </div>
        </div>
      </div>
    </section>
    </main>
  );
}
