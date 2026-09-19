import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';
import { relatedProducts } from '../lib/products.js';
import ProductCard from '../components/ProductCard.jsx';

const TECH_TOPICS = [
  { num: '01', title: 'Software Development', text: 'Practical perspectives on building and improving modern software applications.' },
  { num: '02', title: 'Digital Products', text: 'Insights into product development, user experience, and turning requirements into working products.' },
  { num: '03', title: 'AI & Emerging Technology', text: 'Our perspective on using AI and emerging technologies in practical software development.' },
  { num: '04', title: 'Technology Practices', text: 'Lessons and approaches around development, problem solving, and building reliable digital solutions.' },
];

const ENG_TOPICS = [
  { num: '01', title: 'Product Engineering', text: 'Approaches to turning product requirements into working software.' },
  { num: '02', title: 'AI-Assisted Engineering', text: 'How AI tools such as Claude, Cursor, and coding assistants can support engineering workflows.' },
  { num: '03', title: 'Software Architecture', text: 'Perspectives on structuring applications and making engineering decisions based on project requirements.' },
  { num: '04', title: 'Development Practices', text: 'Practical approaches to coding, debugging, testing, and continuously improving software.' },
];

/* The same ten products the Products index lists, in this page's own grouping
   and order. Titles, categories, descriptions and screenshots come from
   src/lib/products.js so a product reads the same wherever it appears. */
const PROJECT_GROUPS = [
  { kicker: 'Property & Workforce', items: ['vishful', 'attendance'] },
  { kicker: 'Business & Operations', items: ['anvas-comet', 'anvas-logistics', 'fintech'] },
  { kicker: 'AI-Powered Products', items: ['kubera-ai', 'elegal'] },
  { kicker: 'Digital Platforms', items: ['tn-ihip', 'mla-calendar', 'ungal-pakkam'] },
];

const STORY_STEPS = [
  { num: '01', title: 'The Requirement', text: 'What problem, need, or opportunity led to the project.' },
  { num: '02', title: 'The Approach', text: 'How the product, workflow, and technology were planned.' },
  { num: '03', title: 'The Product', text: 'What AnvasTech built and the capabilities it provides.' },
  { num: '04', title: 'The Engineering', text: 'The software, design, AI, automation, or other technical approaches used.' },
  { num: '05', title: 'The Result', text: 'The completed product and its capabilities. Where outcomes are documented, they are stated; where they are not, they are left out.' },
];

export default function Resources() {
  usePageMeta("Resources | AnvasTech", "Technology and engineering insights from AnvasTech, the products and platforms we build, and the story behind how they were built.");
  return (
    <main id="main" className="solution-page">

    <section className="page-hero is-dark">
      <figure className="hero-art is-video art-company" aria-hidden="true">
        <video src="/assets/company-hero.mp4?v=1" poster="/assets/company-hero-poster.jpg?v=1" autoPlay muted loop playsInline preload="metadata" disablePictureInPicture></video>
      </figure>
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / Resources</p>
        <h1>Resources</h1>
        <p className="lede">What we are exploring across technology and engineering &mdash; and the projects behind the products we build.</p>
      </div>
    </section>

    <section className="sp-band is-white" id="technology-insights">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">Insights</p>
            <h2 className="sp-h2">Technology Insights</h2>
          </div>
          <p className="sp-lede">Practical perspectives on technology, software, and digital products.</p>
        </div>
        <div className="sp-grid">
          {TECH_TOPICS.map((t) => (
            <article className="sp-cell" key={t.num}>
              <span className="sp-num">{t.num}</span>
              <h3>{t.title}</h3>
              <p>{t.text}</p>
            </article>
          ))}
        </div>
        {/* No articles are published yet, so this says so rather than linking
            to an empty index. */}
        <div className="sp-note" style={{ marginTop: '36px' }}>
          <p>We have not published technology articles yet. When we do, they will appear here.</p>
        </div>
      </div>
    </section>

    <section className="sp-band" id="engineering-insights">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">Insights</p>
            <h2 className="sp-h2">Engineering Insights</h2>
          </div>
          <p className="sp-lede">How we think about building, developing, and improving software.</p>
        </div>
        <div className="sp-grid">
          {ENG_TOPICS.map((t) => (
            <article className="sp-cell" key={t.num}>
              <span className="sp-num">{t.num}</span>
              <h3>{t.title}</h3>
              <p>{t.text}</p>
            </article>
          ))}
        </div>
        <div className="sp-note" style={{ marginTop: '36px' }}>
          <p>We have not published engineering articles yet. When we do, they will appear here.</p>
        </div>
      </div>
    </section>

    <section className="sp-band is-white" id="our-projects">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">Projects</p>
            <h2 className="sp-h2">Our Projects</h2>
          </div>
          <p className="sp-lede">AnvasTech works across different domains to build practical digital products and software platforms around real-world requirements.</p>
        </div>
        {PROJECT_GROUPS.map((g) => (
          <div className="sp-group" key={g.kicker}>
            <p className="sp-eyebrow">{g.kicker}</p>
            <div className="sp-cards">
              {relatedProducts(g.items).map((pr) => <ProductCard product={pr} key={pr.id} />)}
            </div>
          </div>
        ))}
        <div className="sp-actions"><Link className="sp-btn" to="/industries">Explore Our Products</Link></div>
      </div>
    </section>

    <section className="sp-fits" id="project-stories">
      <img src="/assets/ai-slide-4.jpg?v=3" alt="" width="1024" height="521" decoding="async" fetchPriority="low" aria-hidden="true" />
      <div className="sp-wrap">
        <p className="sp-eyebrow">Projects</p>
        <h2 className="sp-h2">Project Stories</h2>
        <p className="sp-lede" style={{ marginTop: '20px', maxWidth: '62ch' }}>Project Stories show the thinking and engineering behind AnvasTech&rsquo;s work &mdash; from the initial requirement to the product that was built.</p>
        <ol className="sp-steps is-3up" style={{ marginTop: '48px' }}>
          {STORY_STEPS.map((s) => (
            <li className="sp-step" key={s.num}>
              <span className="sp-step-num">{s.num}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="sp-actions"><Link className="sp-btn" to="/case-studies">Read the project stories</Link></div>
      </div>
    </section>

    <section className="sp-band is-ink" id="contact-cta">
      <div className="sp-wrap">
        <div className="sp-close">
          <p className="sp-eyebrow">Start here</p>
          <h2>Want to talk it through?</h2>
          <p className="sp-lede">Tell us what you are trying to build. We will tell you what it would take.</p>
          <div className="sp-actions"><Link className="sp-btn" to="/contact">Talk to our team</Link></div>
        </div>
      </div>
    </section>
    </main>
  );
}
