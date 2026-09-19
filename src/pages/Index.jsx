import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';

export default function Index() {
  usePageMeta("AnvasTech: Supercharging Progress | AI, Cloud and Engineering", "AnvasTech is a product and technology company building real-world digital products and delivering software solutions powered by modern engineering, automation, and AI.");
  return (
    <main id="main">

    <section className="hero" aria-roledescription="carousel" aria-label="Featured stories">
      <video className="hero-video" autoPlay muted loop playsInline preload="auto" poster="/assets/hero-bg-poster.jpg?v=5" aria-hidden="true">
        <source src="/assets/hero-bg.mp4?v=5" type="video/mp4" />
      </video>
      <div className="hero-slides">
        <article className="slide is-active">
          <div className="slide-inner">
            <div className="hero-shell">
              <div className="slide-copy">
                <p className="hero-kicker">Engineering with AI</p>
                <h1>AI Is Our Accelerator. Engineering Is Our Foundation.</h1>
                <p>We use modern AI-assisted development tools to support our software development &mdash; helping us explore ideas, refine code, solve technical problems, and build applications more efficiently.</p>
                <Link className="now-cta" to="/ai-assisted-engineering"><span>Explore AI-Assisted Development</span></Link>
              </div>
            </div>
          </div>
        </article>
        <article className="slide">
          <div className="slide-inner">
            <div className="hero-shell">
              <div className="slide-copy">
                <p className="hero-kicker">Our approach</p>
                <h2>Think. Design. Build. Improve.</h2>
                <p>We start by understanding the problem, define the right solution, build with modern engineering practices, and continuously improve what we create.</p>
                <Link className="now-cta" to="/ai-development-workspace"><span>Discover Our Approach</span></Link>
              </div>
            </div>
          </div>
        </article>
        <article className="slide">
          <div className="slide-inner">
            <div className="hero-shell">
              <div className="slide-copy">
                <p className="hero-kicker">How we use AI</p>
                <h2>Explore. Build. Improve.</h2>
                <p>We use AI-assisted development to explore ideas, support coding, solve technical problems, and improve our development workflow. Our engineers remain responsible for the technical decisions, implementation, testing, and quality of the software we build.</p>
                <Link className="now-cta" to="/ai-assisted-engineering#how-we-use-ai"><span>See How We Use AI</span></Link>
              </div>
            </div>
          </div>
        </article>
      </div>
      <div className="hero-shell hero-controls">
        <div className="tabs" role="tablist">
          <button className="tab is-active" type="button">AI-Assisted Development</button>
          <button className="tab" type="button">Our Approach</button>
          <button className="tab" type="button">How We Use AI</button>
        </div>
        <button className="hero-pause" type="button" data-pause="" aria-pressed="false" aria-label="Pause">
          <span className="hero-pause-icon ico-pause" aria-hidden="true"></span>
          <span className="hero-pause-icon ico-play" aria-hidden="true"></span>
          <span className="hero-pause-text">Pause</span>
        </button>
      </div>
    </section>

    <section className="ask-panel" id="ask">
      <div className="ask-shell">
        <h2>Have tech questions?<br />Our <span>AI answer engine</span> can help.</h2>
        <form className="ask-form" id="ask-form">
          <span className="ask-orb" aria-hidden="true">
            <svg viewBox="0 0 36 36">
              <defs>
                <linearGradient id="askOrb" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="55%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
              </defs>
              <circle cx="18" cy="18" r="18" fill="url(#askOrb)" />
              <path d="M18 8.5c.4 3.2 2.2 6.2 5.5 8-3.3 1.8-5.1 4.8-5.5 8-.4-3.2-2.2-6.2-5.5-8 3.3-1.8 5.1-4.8 5.5-8Z" fill="#fff" opacity=".92" />
            </svg>
          </span>
          <input type="search" name="q" placeholder="Please ask a question or initiate a search" required />
          <button type="submit" aria-label="Search"></button>
        </form>
        <div className="ask-result" id="ask-result">
          <h3></h3>
          <p></p>
        </div>
      </div>
    </section>

    <div className="home-stack">

    <section className="ai-stage" aria-label="AI stories">
      <div className="ai-slides">
        <article className="ai-slide ai-force is-active">
          <div className="ai-slide-bg"><img src="/assets/ai-slide-2.jpg?v=2" alt="" width="1024" height="399" /></div>
          <div className="wrap ai-slide-copy">
            <p className="ai-kicker">AI Force</p>
            <h2>From Generative AI to Agentic Systems</h2>
            <p>A GenAI and Agentic AI platform built to automate and augment complex workflows across software engineering, data engineering, IT operations and enterprise processes.</p>
            <p className="ai-topics">Generative AI · Agentic AI · Workflow Automation · Enterprise AI</p>
            <div className="actions">
              <Link className="hero-cta" to="/what-we-do#ai">Explore AI Force <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h9M8.5 4.5 12.5 8 8.5 11.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></Link>
            </div>
          </div>
        </article>
        <article className="ai-slide darker">
          <div className="ai-slide-bg"><img src="/assets/ai-slide-4.jpg?v=3" alt="" width="1024" height="521" /></div>
          <div className="wrap ai-slide-copy">
            <p className="ai-kicker">AI Leadership</p>
            <h2>Conversations with Pioneers of Enterprise AI</h2>
            <p>Hear from technology leaders on scaling AI beyond pilots, building AI-ready workforces, designing enterprise AI architectures, and turning experimentation into measurable business value.</p>
            <p className="ai-topics">Enterprise AI · GenAI · AI Strategy · AI Transformation</p>
            <div className="actions"><Link className="hero-cta" to="/resources">Watch the Conversation <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h9M8.5 4.5 12.5 8 8.5 11.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></Link></div>
          </div>
        </article>
        <article className="ai-slide darker">
          <div className="ai-slide-bg"><img src="/assets/ai-leadership.jpg?v=2" alt="" width="1024" height="529" /></div>
          <div className="wrap ai-slide-copy">
            <p className="ai-kicker">AI Research</p>
            <h2>The Blueprint for AI Leadership</h2>
            <h3>What does it take to move from AI experimentation to enterprise-wide impact?</h3>
            <p>Our research explores the strategy, data, architecture, workforce and operating-model shifts required to build AI that delivers meaningful business value at scale.</p>
            <p className="ai-topics">AI Strategy · Data Readiness · Enterprise Architecture · AI Transformation</p>
            <div className="actions"><Link className="hero-cta" to="/resources">Read the Report <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h9M8.5 4.5 12.5 8 8.5 11.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></Link></div>
          </div>
        </article>
        <article className="ai-slide ai-overview">
          <div className="ai-slide-bg"><img src="/assets/ai-easy.jpg?v=2" alt="" width="1024" height="416" /></div>
          <div className="wrap ai-slide-copy">
            <p className="ai-kicker">Our Perspective</p>
            <h2>AI Is Easy. Impact Is Hard.</h2>
            <h3>Building with AI is becoming easier. Building AI that delivers real business impact is not.</h3>
            <p>We believe meaningful AI requires more than powerful models. It requires strong engineering, reliable data, intelligent workflows, responsible architecture and measurable outcomes.</p>
            <p className="ai-topics">AI Engineering · Data Intelligence · Agentic Systems · Enterprise AI</p>
            <div className="actions"><Link className="hero-cta" to="/what-we-do#ai">Discover Our Approach <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h9M8.5 4.5 12.5 8 8.5 11.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></Link></div>
          </div>
        </article>
      </div>
      <div className="ai-controls">
        <div className="tabs" role="tablist">
          <button className="tab is-active" type="button" data-ai-tab="">AI Force</button>
          <button className="tab" type="button" data-ai-tab="">AI Leadership</button>
          <button className="tab" type="button" data-ai-tab="">AI Research</button>
          <button className="tab" type="button" data-ai-tab="">Our Perspective</button>
        </div>
        <button className="pause" type="button" data-ai-pause="" aria-pressed="false" aria-label="Pause">
          <svg className="ico-pause" viewBox="0 0 12 12" aria-hidden="true"><rect x="2" y="1.5" width="2.4" height="9" rx="0.4" fill="currentColor" /><rect x="7.6" y="1.5" width="2.4" height="9" rx="0.4" fill="currentColor" /></svg>
          <svg className="ico-play" viewBox="0 0 12 12" aria-hidden="true"><path d="M3.2 1.6v8.8L10.4 6Z" fill="currentColor" /></svg>
        </button>
      </div>
    </section>
    </div>

    <section className="sol-sticky" id="solutions" style={{"--sol-card-h": "437px", "--sol-head-top": "88px", "--sol-head-h": "168px"}}>
      <div className="sol-sticky-shell">
        <div className="sol-sticky-head">
          <div className="sol-tag"><p>Featured solutions</p></div>
          <h2 className="sol-sticky-title">Solutions</h2>
        </div>
        <div className="sol-sticky-stack">
          <article className="sol-stack-card">
            <div className="sol-stack-media">
              <img src="/assets/sol-vishful.jpg?v=1" alt="Vishful properties app" width="622" height="406" loading="lazy" />
            </div>
            <div className="sol-stack-copy">
              <h3><Link to="/what-we-do#vishful">Vishful</Link></h3>
              <p className="sol-stack-tag">Property &amp; Co-Living Operations, Simplified</p>
              <p>A modern platform for managing properties, apartments, beds, tenants, and live occupancy from one connected workspace.</p>
              <ul>
                <li>Centralized property and portfolio management</li>
                <li>Occupancy, apartment and bed tracking</li>
                <li>Tenant records and operational workflows</li>
                <li>Built for co-living and managed spaces</li>
              </ul>
            </div>
          </article>
          <article className="sol-stack-card">
            <div className="sol-stack-media">
              <img src="/assets/sol-attendance.png?v=1" alt="Vishful Attendance app" width="1024" height="682" loading="lazy" />
            </div>
            <div className="sol-stack-copy">
              <h3><Link to="/what-we-do#attendance">Vishful Attendance</Link></h3>
              <p className="sol-stack-tag">Smart Workforce Attendance, Simplified</p>
              <p>An intelligent attendance platform for managing employees, check-ins, leave, reports, and workforce operations from one connected workspace.</p>
              <ul>
                <li>Digital employee attendance</li>
                <li>In/out and remote attendance tracking</li>
                <li>Real-time reports &amp; admin dashboard</li>
                <li>Leave and payroll-ready workflows</li>
              </ul>
            </div>
          </article>
          <article className="sol-stack-card">
            <div className="sol-stack-media">
              <img src="/assets/sol-healthcare.webp?v=1" alt="TN-IHIP OPD platform" width="622" height="406" loading="lazy" />
            </div>
            <div className="sol-stack-copy">
              <h3><Link to="/what-we-do#healthcare">TN-IHIP OPD Platform</Link></h3>
              <p className="sol-stack-tag">Digital Healthcare &amp; OPD Management</p>
              <p>A modern healthcare platform designed to digitize patient management, OPD workflows, healthcare records, and day-to-day clinical operations.</p>
              <ul>
                <li>Digital patient management</li>
                <li>OPD registration &amp; workflows</li>
                <li>Centralized healthcare records</li>
                <li>Healthcare operations dashboard</li>
              </ul>
            </div>
          </article>
          <article className="sol-stack-card">
            {/* A diagram, not a photograph — it is shown whole rather than
                cropped to the frame, or the Inputs and Outputs columns are
                lost off the sides. */}
            <div className="sol-stack-media is-diagram">
              <img src="/assets/sol-anvas-logistics-flow.webp?v=1" alt="How Anvas Logistics fits together: shipments, billing data, operations and access rules feed the logistics ERP, which produces live tracking, GST billing, operations control and role-based access." width="1377" height="688" loading="lazy" />
            </div>
            <div className="sol-stack-copy">
              <h3><Link to="/what-we-do#anvas-logistics">Anvas Logistics</Link></h3>
              <p className="sol-stack-tag">Fleet, Freight &amp; Delivery Operations</p>
              <p>A logistics platform that connects fleet, freight, dispatch and delivery into one live view of the network.</p>
              <ul>
                <li>Fleet, driver and compliance records</li>
                <li>Trip planning, dispatch and live tracking</li>
                <li>Digital e-way bills, LRs and PODs</li>
                <li>Freight billing and operations dashboards</li>
              </ul>
            </div>
          </article>
          <article className="sol-stack-card">
            <div className="sol-stack-media">
              <img src="/assets/sol-comet.png?v=1" alt="Anvas Comet" width="773" height="600" loading="lazy" />
            </div>
            <div className="sol-stack-copy">
              <h3><Link to="/what-we-do#anvas-comet">Anvas Comet</Link></h3>
              <p className="sol-stack-tag">Intelligent Business Operations</p>
              <p>An operations platform that brings tasks, approvals, data and reporting into one connected workspace.</p>
              <ul>
                <li>Configurable workflows without code</li>
                <li>Role-based approvals with a full audit trail</li>
                <li>One unified work queue per user</li>
                <li>Live dashboards and ERP/CRM integrations</li>
              </ul>
            </div>
          </article>
          <article className="sol-stack-card">
            <div className="sol-stack-media">
              <img src="/assets/sol-fintrack.png?v=1" alt="FinTrack financial operations platform" width="997" height="627" loading="lazy" />
            </div>
            <div className="sol-stack-copy">
              <h3><Link to="/what-we-do#fintech-platform">FinTrack</Link></h3>
              <p className="sol-stack-tag">Multi-Tenant Financial Operations</p>
              <p>A modern financial operations platform built to centralize transactions, financial workflows, reporting, and business data across multiple organizations.</p>
              <ul>
                <li>Multi-tenant financial operations</li>
                <li>Transaction &amp; workflow management</li>
                <li>Centralized financial reporting</li>
                <li>Operational dashboards &amp; data</li>
              </ul>
            </div>
          </article>
          <article className="sol-stack-card">
            <div className="sol-stack-media">
              <img src="/assets/sol-kubera.png?v=1" alt="Kubera AI" width="991" height="611" loading="lazy" />
            </div>
            <div className="sol-stack-copy">
              <h3><Link to="/what-we-do#kubera-ai">Kubera AI</Link></h3>
              <p className="sol-stack-tag">AI Decision &amp; Automation Layer</p>
              <p>An AI layer that reads your business data, explains what it finds and acts inside your existing workflows.</p>
              <ul>
                <li>Natural-language querying of live data</li>
                <li>Document intelligence for invoices and contracts</li>
                <li>Anomaly and risk detection</li>
                <li>Grounded answers with access governance</li>
              </ul>
            </div>
          </article>
          <article className="sol-stack-card">
            <div className="sol-stack-media">
              <img src="/assets/sol-elegal.png?v=1" alt="eLegal" width="1034" height="693" loading="lazy" />
            </div>
            <div className="sol-stack-copy">
              <h3><Link to="/what-we-do#elegal">eLegal</Link></h3>
              <p className="sol-stack-tag">Case, Matter &amp; Document Management</p>
              <p>One reliable record of every matter a legal team runs, from first filing through final order.</p>
              <ul>
                <li>Matter, party and stage tracking</li>
                <li>Hearing and cause-list management</li>
                <li>Versioned document repository</li>
                <li>Deadline and limitation alerts</li>
              </ul>
            </div>
          </article>
          <article className="sol-stack-card">
            <div className="sol-stack-media">
              <img src="/assets/sol-government.jpg?v=2" alt="Ungal Pakkam – Manu System" width="1024" height="682" loading="lazy" />
            </div>
            <div className="sol-stack-copy">
              <h3><Link to="/what-we-do#ungal-pakkam">Ungal Pakkam – Manu System</Link></h3>
              <p className="sol-stack-tag">Citizen Grievance &amp; Service Delivery</p>
              <p>A grievance and service delivery system that gives every request an owner, a status and a closing record.</p>
              <ul>
                <li>Multi-channel petition intake</li>
                <li>Automatic routing and SLA escalation</li>
                <li>Field verification from mobile</li>
                <li>Constituency analytics and reporting</li>
              </ul>
            </div>
          </article>
          <article className="sol-stack-card">
            <div className="sol-stack-media">
              <img src="/assets/sol-mla-calendar.png?v=1" alt="MLA Calendar" width="1016" height="643" loading="lazy" />
            </div>
            <div className="sol-stack-copy">
              <h3><Link to="/what-we-do#mla-calendar">MLA Calendar</Link></h3>
              <p className="sol-stack-tag">Schedule &amp; Constituency Management</p>
              <p>Schedule, commitments and constituency activity management built for the pace of public office.</p>
              <ul>
                <li>One shared office-wide schedule</li>
                <li>Invitation screening and records</li>
                <li>Constituency activity logging</li>
                <li>Commitment follow-up tracking</li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section className="section growth-band" id="growth">
      <div className="wrap growth-split">
        <div className="growth-intro">
          <h2 className="display">How We Build:<br />AI Is Our Accelerator,<br />Engineering Our Foundation</h2>
          <p className="lede">We use AI-assisted development tools, modern engineering practices and cloud technologies to turn complex ideas into real, production-ready products — faster, smarter and with greater iteration.</p>
        </div>
        <div className="growth-cards">
          <Link className="growth-card" to="/ai-assisted-engineering">
            <span className="growth-ico"><img src="/assets/growth-ai.png" alt="" width="70" height="62" /></span>
            <span className="growth-text">
              <strong>AI-Assisted Engineering</strong>
              <span>Build faster with AI-assisted development using tools such as Claude, Cursor and intelligent coding assistants.</span>
              <span className="growth-topics">AI CODING · CLAUDE · CURSOR</span>
            </span>
            <span className="growth-go" aria-hidden="true"></span>
          </Link>
          <Link className="growth-card" to="/what-we-do#infra">
            <span className="growth-ico"><img src="/assets/growth-cloud.png" alt="" width="68" height="53" /></span>
            <span className="growth-text">
              <strong>Cloud &amp; Infrastructure</strong>
              <span>Scalable cloud foundations for modern applications, data-intensive workloads and production systems.</span>
              <span className="growth-topics">CLOUD · SCALABILITY · DEPLOYMENT</span>
            </span>
            <span className="growth-go" aria-hidden="true"></span>
          </Link>
          <Link className="growth-card" to="/what-we-do#ers">
            <span className="growth-ico"><img src="/assets/growth-eng.png" alt="" width="65" height="65" /></span>
            <span className="growth-text">
              <strong>Product Engineering</strong>
              <span>From requirements to production — combining AI-assisted development, software engineering and UI/UX.</span>
              <span className="growth-topics">PRODUCT · UI/UX · FULL-STACK</span>
            </span>
            <span className="growth-go" aria-hidden="true"></span>
          </Link>
        </div>
      </div>
    </section>

    <div className="home-wrap">
      <div className="home-wrap-shell">
        <div className="home-wrap-inner">
          <section className="now-band" id="now">
            <div className="now-top">
              <div className="now-copy">
                <h2 className="display">Built for Today.<br />Ready for What's Next.</h2>
                <img className="now-mobile-img" src="/assets/now-portrait.jpg?v=3" alt="" width="731" height="1024" />
                <p>We combine AI-assisted engineering, product thinking and real-world experience to build systems that solve complex problems today — and evolve with what comes next.</p>
                <p>AnvasTech brings together people, technology and modern AI development workflows to turn ideas into working digital products, intelligent systems and scalable applications.</p>
                <Link className="now-cta" to="/what-we-do"><span>See What We Build</span></Link>
              </div>
              <div className="now-media">
                <img src="/assets/now-portrait.jpg?v=3" alt="AnvasTech professional in dual-tone studio lighting" width="731" height="1024" loading="lazy" />
              </div>
            </div>
            <div className="now-facts">
              <div className="now-fact-col">
                <div className="now-fact">
                  <div className="now-num">11+</div>
                  <p>Active / Completed&nbsp;<br />Systems</p>
                </div>
              </div>
              <div className="now-fact-col">
                <div className="now-fact">
                  <div className="now-num">7+</div>
                  <p>AI &amp; Digital Initiatives</p>
                </div>
              </div>
              <div className="now-fact-col">
                <div className="now-fact">
                  <div className="now-num">Multiple</div>
                  <p>Industry Domains</p>
                </div>
              </div>
              <div className="now-fact-col">
                <div className="now-fact">
                  <div className="now-num">AI-First</div>
                  <p>Development&nbsp;<br />Workflow</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>

    <section className="section recog-band" id="recognition">
      <div className="wrap">
        <div className="recog-split">
          <div>
            <p className="recog-kicker">What We Build</p>
            <h2 className="display">Our Work Speaks Through What We Build</h2>
            <p className="lede">Rather than listing awards or recognition that we cannot substantiate, AnvasTech focuses on the products, platforms, and technology solutions we build across real-world domains.</p>
            <Link className="gartner-card" to="/case-study-vishful">
              <span className="src">Vishful</span>
              <p>Property &amp; Co-Living Operations Platform</p>
              <span className="go" aria-hidden="true"></span>
            </Link>
            <Link className="gartner-card" to="/case-study-anvas-logistics">
              <span className="src">Anvas Logistics</span>
              <p>Logistics Operations Platform</p>
              <span className="go" aria-hidden="true"></span>
            </Link>
            <Link className="gartner-card" to="/case-study-elegal">
              <span className="src">eLegal</span>
              <p>Property Legal Intelligence Platform</p>
              <span className="go" aria-hidden="true"></span>
            </Link>
            <Link className="gartner-card" to="/case-study-vishful-attendance">
              <span className="src">Vishful Attendance</span>
              <p>Face-Scan Workforce Attendance Application</p>
              <span className="go" aria-hidden="true"></span>
            </Link>
          </div>

          <div className="award-web" aria-label="AnvasTech products and platforms">
            <div className="award-web-inner">
            <svg className="award-lines" aria-hidden="true"></svg>
            <div className="award-col">
              <div className="award-track scroll-up speed-fast">
                <div className="award-tile"><img src="/assets/logo-vishful.png?v=1" alt="Vishful" /></div>
                <div className="award-tile"><img src="/assets/logo-lp.png?v=1" alt="LP" /></div>
                <div className="award-tile"><img src="/assets/logo-vishful-spaces.png?v=1" alt="Vishful Spaces LLP" /></div>
                <div className="award-tile"><img src="/assets/logo-comet.png?v=1" alt="Comet" /></div>
                <div className="award-tile"><img src="/assets/logo-tamil-nadu.png?v=1" alt="Government of Tamil Nadu" /></div>
                <div className="award-tile"><img src="/assets/logo-grow-insttafresh.png?v=1" alt="Grow Insttafresh LLP" /></div>
                <div className="award-tile"><img src="/assets/logo-fintech.png?v=1" alt="Fintech" /></div>
                <div className="award-tile"><img src="/assets/logo-vishful-attendance.png?v=1" alt="Vishful Attendance" /></div>
                <div className="award-tile"><img src="/assets/logo-anvas-logistics.png?v=1" alt="AnvasTech Logistics" /></div>
                <div className="award-tile"><img src="/assets/logo-kubera-ai.png?v=1" alt="Kubera AI" /></div>
                <div className="award-tile"><img src="/assets/logo-elegal.png?v=1" alt="eLegal" /></div>
                <div className="award-tile"><img src="/assets/logo-mla-calendar.png?v=1" alt="MLA Calendar" /></div>
                <div className="award-tile"><img src="/assets/logo-ungal-pakkam.png?v=1" alt="Ungal Pakkam" /></div>
                <div className="award-tile"><img src="/assets/logo-vishful.png?v=1" alt="" /></div>
                <div className="award-tile"><img src="/assets/logo-lp.png?v=1" alt="" /></div>
                <div className="award-tile"><img src="/assets/logo-vishful-spaces.png?v=1" alt="" /></div>
                <div className="award-tile"><img src="/assets/logo-comet.png?v=1" alt="" /></div>
                <div className="award-tile"><img src="/assets/logo-tamil-nadu.png?v=1" alt="" /></div>
                <div className="award-tile"><img src="/assets/logo-grow-insttafresh.png?v=1" alt="" /></div>
                <div className="award-tile"><img src="/assets/logo-fintech.png?v=1" alt="" /></div>
                <div className="award-tile"><img src="/assets/logo-vishful-attendance.png?v=1" alt="" /></div>
                <div className="award-tile"><img src="/assets/logo-anvas-logistics.png?v=1" alt="" /></div>
                <div className="award-tile"><img src="/assets/logo-kubera-ai.png?v=1" alt="" /></div>
                <div className="award-tile"><img src="/assets/logo-elegal.png?v=1" alt="" /></div>
                <div className="award-tile"><img src="/assets/logo-mla-calendar.png?v=1" alt="" /></div>
                <div className="award-tile"><img src="/assets/logo-ungal-pakkam.png?v=1" alt="" /></div>
              </div>
            </div>
            <div className="award-col">
              <div className="award-track scroll-down speed-medium">
                <div className="award-tile"><img src="/assets/logo-grow-insttafresh.png?v=1" alt="Grow Insttafresh LLP" /></div>
                <div className="award-tile"><img src="/assets/logo-fintech.png?v=1" alt="Fintech" /></div>
                <div className="award-tile"><img src="/assets/logo-vishful-attendance.png?v=1" alt="Vishful Attendance" /></div>
                <div className="award-tile"><img src="/assets/logo-vishful.png?v=1" alt="Vishful" /></div>
                <div className="award-tile"><img src="/assets/logo-lp.png?v=1" alt="LP" /></div>
                <div className="award-tile"><img src="/assets/logo-vishful-spaces.png?v=1" alt="Vishful Spaces LLP" /></div>
                <div className="award-tile"><img src="/assets/logo-comet.png?v=1" alt="Comet" /></div>
                <div className="award-tile"><img src="/assets/logo-anvas-logistics.png?v=1" alt="AnvasTech Logistics" /></div>
                <div className="award-tile"><img src="/assets/logo-kubera-ai.png?v=1" alt="Kubera AI" /></div>
                <div className="award-tile"><img src="/assets/logo-elegal.png?v=1" alt="eLegal" /></div>
                <div className="award-tile"><img src="/assets/logo-mla-calendar.png?v=1" alt="MLA Calendar" /></div>
                <div className="award-tile"><img src="/assets/logo-ungal-pakkam.png?v=1" alt="Ungal Pakkam" /></div>
                <div className="award-tile"><img src="/assets/logo-grow-insttafresh.png?v=1" alt="" /></div>
                <div className="award-tile"><img src="/assets/logo-fintech.png?v=1" alt="" /></div>
                <div className="award-tile"><img src="/assets/logo-vishful-attendance.png?v=1" alt="" /></div>
                <div className="award-tile"><img src="/assets/logo-vishful.png?v=1" alt="" /></div>
                <div className="award-tile"><img src="/assets/logo-lp.png?v=1" alt="" /></div>
                <div className="award-tile"><img src="/assets/logo-vishful-spaces.png?v=1" alt="" /></div>
                <div className="award-tile"><img src="/assets/logo-comet.png?v=1" alt="" /></div>
                <div className="award-tile"><img src="/assets/logo-anvas-logistics.png?v=1" alt="" /></div>
                <div className="award-tile"><img src="/assets/logo-kubera-ai.png?v=1" alt="" /></div>
                <div className="award-tile"><img src="/assets/logo-elegal.png?v=1" alt="" /></div>
                <div className="award-tile"><img src="/assets/logo-mla-calendar.png?v=1" alt="" /></div>
                <div className="award-tile"><img src="/assets/logo-ungal-pakkam.png?v=1" alt="" /></div>
              </div>
            </div>
            <div className="award-col">
              <div className="award-track scroll-up speed-slow">
                <div className="award-tile"><img src="/assets/logo-tamil-nadu.png?v=1" alt="Government of Tamil Nadu" /></div>
                <div className="award-tile"><img src="/assets/logo-vishful-spaces.png?v=1" alt="Vishful Spaces LLP" /></div>
                <div className="award-tile"><img src="/assets/logo-comet.png?v=1" alt="Comet" /></div>
                <div className="award-tile"><img src="/assets/logo-vishful-attendance.png?v=1" alt="Vishful Attendance" /></div>
                <div className="award-tile"><img src="/assets/logo-fintech.png?v=1" alt="Fintech" /></div>
                <div className="award-tile"><img src="/assets/logo-grow-insttafresh.png?v=1" alt="Grow Insttafresh LLP" /></div>
                <div className="award-tile"><img src="/assets/logo-lp.png?v=1" alt="LP" /></div>
                <div className="award-tile"><img src="/assets/logo-vishful.png?v=1" alt="Vishful" /></div>
                <div className="award-tile"><img src="/assets/logo-anvas-logistics.png?v=1" alt="AnvasTech Logistics" /></div>
                <div className="award-tile"><img src="/assets/logo-kubera-ai.png?v=1" alt="Kubera AI" /></div>
                <div className="award-tile"><img src="/assets/logo-elegal.png?v=1" alt="eLegal" /></div>
                <div className="award-tile"><img src="/assets/logo-mla-calendar.png?v=1" alt="MLA Calendar" /></div>
                <div className="award-tile"><img src="/assets/logo-ungal-pakkam.png?v=1" alt="Ungal Pakkam" /></div>
                <div className="award-tile"><img src="/assets/logo-tamil-nadu.png?v=1" alt="" /></div>
                <div className="award-tile"><img src="/assets/logo-vishful-spaces.png?v=1" alt="" /></div>
                <div className="award-tile"><img src="/assets/logo-comet.png?v=1" alt="" /></div>
                <div className="award-tile"><img src="/assets/logo-vishful-attendance.png?v=1" alt="" /></div>
                <div className="award-tile"><img src="/assets/logo-fintech.png?v=1" alt="" /></div>
                <div className="award-tile"><img src="/assets/logo-grow-insttafresh.png?v=1" alt="" /></div>
                <div className="award-tile"><img src="/assets/logo-lp.png?v=1" alt="" /></div>
                <div className="award-tile"><img src="/assets/logo-vishful.png?v=1" alt="" /></div>
                <div className="award-tile"><img src="/assets/logo-anvas-logistics.png?v=1" alt="" /></div>
                <div className="award-tile"><img src="/assets/logo-kubera-ai.png?v=1" alt="" /></div>
                <div className="award-tile"><img src="/assets/logo-elegal.png?v=1" alt="" /></div>
                <div className="award-tile"><img src="/assets/logo-mla-calendar.png?v=1" alt="" /></div>
                <div className="award-tile"><img src="/assets/logo-ungal-pakkam.png?v=1" alt="" /></div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="clients-band" id="clients">
      <div className="clients-shell">
        <div className="clients-row">
          <div className="clients-copy">
            <div className="clients-intro">
              <h2 className="display">Built Together.<br />Measured by Impact.</h2>
              <p className="lede">The strongest technology partnerships go beyond delivery. They help organizations solve complex problems, accelerate innovation and create lasting business value.</p>
            </div>
            <article className="clients-quote is-active" data-quote="">
              <p>AnvasTech helped us turn a complex technology challenge into a practical, scalable solution. Their combination of engineering expertise and AI-assisted development enabled our teams to move faster from concept to production.</p>
              <div className="clients-who">
                <div className="clients-logo clients-initials" aria-hidden="true"><span>AM</span></div>
                <div className="clients-meta">
                  <p className="clients-name">Arjun Mehta</p>
                  <p>VP, Digital Engineering</p>
                </div>
              </div>
            </article>
            <article className="clients-quote" data-quote="">
              <p>What stood out was their ability to understand the problem before choosing the technology. The team worked closely with us to build intelligent workflows that improved operational efficiency and gave our teams better visibility.</p>
              <div className="clients-who">
                <div className="clients-logo clients-initials" aria-hidden="true"><span>SM</span></div>
                <div className="clients-meta">
                  <p className="clients-name">Sarah Mitchell</p>
                  <p>Director of Technology</p>
                </div>
              </div>
            </article>
            <article className="clients-quote" data-quote="">
              <p>AnvasTech brought strong product thinking and engineering discipline to the engagement. Their AI-assisted development approach helped us iterate quickly while maintaining the quality required for production systems.</p>
              <div className="clients-who">
                <div className="clients-logo clients-initials" aria-hidden="true"><span>DC</span></div>
                <div className="clients-meta">
                  <p className="clients-name">David Chen</p>
                  <p>CTO, Enterprise Platforms</p>
                </div>
              </div>
            </article>
          </div>
          <div className="clients-stage">
            <figure className="clients-card is-active" data-slide="">
              <img src="/assets/client-roy.jpg?v=2" alt="Arjun Mehta" width="522" height="625" />
            </figure>
            <figure className="clients-card" data-slide="">
              <img src="/assets/client-kari.jpg?v=2" alt="Sarah Mitchell" width="522" height="625" />
            </figure>
            <figure className="clients-card" data-slide="">
              <img src="/assets/client-stanley.png" alt="David Chen" width="522" height="625" />
            </figure>
            <div className="clients-arrows">
              <button type="button" className="clients-arrow clients-prev" data-q-prev="" aria-label="Previous testimonial"></button>
              <button type="button" className="clients-arrow clients-next" data-q-next="" aria-label="Next testimonial"></button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="cs-band" id="case-studies">
      <div className="cs-bg" aria-hidden="true"></div>
      <div className="cs-shell">
        <div className="cs-head">
          <div className="cs-head-copy">
            <h2 className="display">Products We Have Built</h2>
            <p>The products AnvasTech has built: what each one is, the need it addresses, and what the platform actually does.</p>
          </div>
          <Link className="cs-all" to="/case-studies">See all case studies</Link>
        </div>
        <div className="cs-grid">
          <Link className="cs-card" to="/case-study-vishful">
            <div className="cs-card-inner">
              <div className="cs-card-media">
                <img src="/assets/cs-ai-automation.jpg?v=1" alt="" width="1200" height="800" loading="lazy" />
              </div>
              <div className="cs-card-body">
                <p className="cs-card-eyebrow"><span className="cs-step">01</span> &mdash; Vishful</p>
                <h3>Property &amp; Co-Living Operations</h3>
                <p className="cs-card-desc">A property management platform for managing properties, apartments, beds, tenants, and occupancy.</p>
                <span className="cs-link">Read Case Study</span>
              </div>
            </div>
          </Link>
          <Link className="cs-card" to="/case-study-vishful-attendance">
            <div className="cs-card-inner">
              <div className="cs-card-media">
                <img src="/assets/cs-property-tech.jpg?v=1" alt="" width="1200" height="800" loading="lazy" />
              </div>
              <div className="cs-card-body">
                <p className="cs-card-eyebrow"><span className="cs-step">02</span> &mdash; Vishful Attendance</p>
                <h3>Mobile Face-Scan Attendance</h3>
                <p className="cs-card-desc">A workforce attendance application using the mobile camera for face-based attendance and employee check-in.</p>
                <span className="cs-link">Read Case Study</span>
              </div>
            </div>
          </Link>
          <Link className="cs-card" to="/case-study-elegal">
            <div className="cs-card-inner">
              <div className="cs-card-media">
                <img src="/assets/cs-pharma.jpg" alt="" width="600" height="360" loading="lazy" />
              </div>
              <div className="cs-card-body">
                <p className="cs-card-eyebrow"><span className="cs-step">03</span> &mdash; eLegal / GetLegal</p>
                <h3>AI-Powered Property Legal Intelligence</h3>
                <p className="cs-card-desc">A platform for property document analysis, OCR, title-chain analysis, and structured legal risk assessment.</p>
                <span className="cs-link">Read Case Study</span>
              </div>
            </div>
          </Link>
          <Link className="cs-card" to="/case-study-anvas-logistics">
            <div className="cs-card-inner">
              <div className="cs-card-media">
                <img src="/assets/cs-telco.webp" alt="" width="600" height="360" loading="lazy" />
              </div>
              <div className="cs-card-body">
                <p className="cs-card-eyebrow"><span className="cs-step">04</span> &mdash; Anvas Logistics</p>
                <h3>Logistics Operations Platform</h3>
                <p className="cs-card-desc">A logistics ERP for shipments, consignments, carrier operations, billing, and financial visibility.</p>
                <span className="cs-link">Read Case Study</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>

    <section className="cine-career" id="careers">
      <div className="cine-track">
        <div className="cine-sticky">
          <div className="cine-row">
            <figure className="cine-frame">
              <img src="/assets/career-scroll.jpg" alt="AnvasTech colleagues collaborating" width="1024" height="589" />
            </figure>
            <div className="cine-copy-window">
              <div className="cine-copy">
                <p className="cine-kicker">Careers</p>
                <h2>Build the Future.<br />Grow With Us.</h2>
                <p className="cine-lede">Join a team building real products with AI-assisted development, modern engineering and ambitious ideas.</p>
                <p className="cine-lede">Work on challenging projects, experiment with emerging technologies, and grow alongside people who are building what's next.</p>
                <p className="cine-topics">AI · Engineering · Product · Innovation</p>
                <Link className="cine-join" to="/careers">
                  <span>Explore Careers</span>
                  <span className="cine-join-go" aria-hidden="true"></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="news-band" aria-labelledby="news-heading">
      <div className="wrap">
        <p className="news-eyebrow">Trends &amp; Insights</p>
        <div className="news-layout">
          <div className="news-copy">
            <h2 id="news-heading">Stay Ahead of What's Next</h2>
            <p>Get occasional updates on AI, emerging technologies, engineering and the products we're building.</p>
            <p id="news-note" className="ask-note" hidden></p>
          </div>
          <form className="news-form" id="news-form">
            <label className="news-label" htmlFor="news-email">Work email</label>
            <div className="news-fields">
              <input id="news-email" type="email" name="email" placeholder="Enter your email" autoComplete="email" required />
              <button className="news-submit" type="submit">Stay connected →</button>
            </div>
          </form>
        </div>
      </div>
    </section>
    </main>
  );
}
