import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';

const CAPABILITIES = [
  {
    title: 'AI-Powered Applications',
    text: 'Integrate Generative AI capabilities into web and software applications.',
  },
  {
    title: 'Intelligent Workflows',
    text: 'Use AI to assist with repetitive and knowledge-intensive business workflows.',
  },
  {
    title: 'Document & Information Intelligence',
    text: 'Apply AI to work with documents, information, and structured business content.',
  },
  {
    title: 'AI-Assisted Development',
    text: 'Use tools such as Claude, Cursor, and AI coding assistants to accelerate software development.',
  },
];

const STEPS = [
  { num: '01', title: 'Understand', text: 'Understand the product, workflow, and actual problem.' },
  { num: '02', title: 'Identify', text: 'Determine where Generative AI can provide practical value.' },
  { num: '03', title: 'Build', text: 'Develop and integrate the AI capability into the software solution.' },
  { num: '04', title: 'Test & Refine', text: 'Evaluate the experience and improve the solution through iteration.' },
];

const FITS = [
  {
    num: '01',
    title: 'Software Development',
    text: 'AI-assisted coding, debugging, documentation, and development workflows.',
  },
  {
    num: '02',
    title: 'Business Operations',
    text: 'AI assistance for repetitive and information-heavy workflows.',
  },
  {
    num: '03',
    title: 'Digital Products',
    text: 'Intelligent capabilities integrated into applications and software products.',
  },
];

export default function GenerativeAi() {
  usePageMeta("Generative AI | AnvasTech", "We explore and integrate Generative AI into applications, workflows, and software development to help solve real-world business and technology problems.");
  return (
    <main id="main" className="solution-page">

    <section className="page-hero is-dark">
      <figure className="hero-art" aria-hidden="true">
        <picture>
          <source srcSet="assets/genai-hero.webp?v=1" type="image/webp" />
          <img src="/assets/genai-hero.jpg?v=1" alt="" width="2000" height="695" fetchPriority="high" />
        </picture>
      </figure>
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / <Link to="/what-we-do">Solutions</Link> / Generative AI</p>
        <h1>Generative AI</h1>
        <p className="lede">Build practical software with Generative AI. We explore and integrate Generative AI into applications, workflows, and software development to help solve real-world business and technology problems.</p>
      </div>
    </section>

    <section className="sp-band is-white" id="overview">
      <div className="sp-wrap">
        <div className="sp-intro">
          <div>
            <p className="sp-eyebrow">AI &amp; Intelligent Systems</p>
            <h2 className="sp-h2">From Ideas to AI-Powered Solutions</h2>
            <p className="sp-p" style={{ marginTop: '24px' }}>We combine software engineering with modern AI capabilities to build practical solutions around real business and product requirements.</p>
            <p className="sp-p">Our approach focuses on understanding the problem first, then identifying where Generative AI can add meaningful value.</p>
            <div className="sp-actions"><Link className="sp-btn" to="/contact">Talk to Our Team</Link></div>
          </div>
          <figure className="sp-plate is-quad">
            <p className="sp-plate-cap">How we approach it</p>
            <ol className="sp-quad">
              {STEPS.map((st) => (
                <li key={st.num}>
                  <b>{st.num}</b>
                  <strong>{st.title}</strong>
                  <span>{st.text}</span>
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
            <p className="sp-eyebrow">Capabilities</p>
            <h2 className="sp-h2">What We Deliver</h2>
          </div>
          <p className="sp-lede">Four places Generative AI does real work in the software we build &mdash; inside the product, inside the workflow, and inside our own development.</p>
        </div>
        <div className="sp-grid">
          {CAPABILITIES.map((c) => (
            <article className="sp-cell" key={c.title}>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="sp-band is-neutral" id="approach">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">How we work</p>
            <h2 className="sp-h2">Our Generative AI Approach</h2>
          </div>
          <p className="sp-lede">The same four moves on every engagement: understand the problem, decide where AI belongs, build it into the software, then evaluate and refine.</p>
        </div>
        <ol className="sp-steps">
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

    <section className="sp-fits" id="where-it-fits">
      <img src="/assets/ai-easy.jpg?v=1" alt="" width="1024" height="416" decoding="async" fetchPriority="low" aria-hidden="true" />
      <div className="sp-wrap">
        <p className="sp-eyebrow">Where it applies</p>
        <h2 className="sp-h2">Where Generative AI Fits</h2>
        <ol className="sp-areas">
          {FITS.map((f) => (
            <li className="sp-area" key={f.num}>
              <span className="sp-area-num">{f.num}</span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <section className="sp-band" id="in-our-products">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">Our products</p>
            <h2 className="sp-h2">Generative AI in Our Products</h2>
          </div>
          <p className="sp-lede">AnvasTech builds its own products as well as delivering software for others. These are the ones where AI is part of what the product does.</p>
        </div>
        <div className="cs-grid cols-2">
          <Link className="cs-card" to="/case-study-kubera-ai">
            <div className="cs-card-inner">
              <div className="cs-card-media">
                <img src="/assets/sol-kubera.png?v=1" alt="" width="991" height="611" loading="lazy" />
              </div>
              <div className="cs-card-body">
                <p className="cs-card-eyebrow"><span className="cs-step">01</span> &mdash; Kubera AI</p>
                <h3>AI-Powered Trading &amp; Strategy Platform</h3>
                <p className="cs-card-desc">A trading platform combining AI-assisted strategy creation, market analysis, backtesting, execution workflows, and risk controls.</p>
                <span className="cs-link">Read Case Study</span>
              </div>
            </div>
          </Link>
          <Link className="cs-card" to="/case-study-elegal">
            <div className="cs-card-inner">
              <div className="cs-card-media">
                <img src="/assets/sol-elegal.png?v=1" alt="" width="1034" height="693" loading="lazy" />
              </div>
              <div className="cs-card-body">
                <p className="cs-card-eyebrow"><span className="cs-step">02</span> &mdash; eLegal</p>
                <h3>AI-Powered Property Legal Intelligence</h3>
                <p className="cs-card-desc">A platform for property document analysis, OCR, title-chain analysis, and structured legal risk assessment.</p>
                <span className="cs-link">Read Case Study</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>

    <section className="sp-band is-white" id="related">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">AI &amp; Intelligent Systems</p>
            <h2 className="sp-h2">Explore more</h2>
          </div>
        </div>
        <div className="sp-links">
          <Link to="/ai-agents">
            <h3>AI Agents</h3>
            <p>AI systems designed to assist with tasks and workflows that involve multiple steps.</p>
            <span className="sp-link">Read more</span>
          </Link>
          <Link to="/ai-assisted-automation">
            <h3>AI-Assisted Automation</h3>
            <p>Use AI to make software workflows more efficient.</p>
            <span className="sp-link">Read more</span>
          </Link>
          <Link to="/ai-assisted-engineering">
            <h3>AI-Assisted Development</h3>
            <p>Build faster with Claude, Cursor and intelligent coding assistants.</p>
            <span className="sp-link">Read more</span>
          </Link>
        </div>
      </div>
    </section>

    <section className="sp-band is-ink" id="contact-cta">
      <div className="sp-wrap">
        <div className="sp-close">
          <p className="sp-eyebrow">Start here</p>
          <h2>Have an AI Idea? Let&rsquo;s Build It.</h2>
          <p className="sp-lede">Tell us what you&rsquo;re trying to solve. We can explore the technology, product, and engineering approach needed to turn the idea into a working solution.</p>
          <div className="sp-actions"><Link className="sp-btn" to="/contact">Start a Conversation</Link></div>
        </div>
      </div>
    </section>
    </main>
  );
}
