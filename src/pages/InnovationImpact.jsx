import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';

export default function InnovationImpact() {
  usePageMeta("Turning Innovation Into Business Value | AnvasTech", "AnvasTech turns emerging technologies into practical digital products, intelligent systems and solutions that help organizations operate smarter and grow faster.");
  return (
    <main id="main">

    <section className="page-hero">
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / <Link to="/#recognition">What We Build</Link> / Innovation &amp; Impact</p>
        <h1>Turning Innovation Into Business Value</h1>
        <p className="lede">Innovation matters when it creates real outcomes. AnvasTech transforms emerging technologies and ambitious ideas into practical digital products, intelligent systems, and solutions that help organizations operate smarter and grow faster.</p>
      </div>
    </section>

    <section className="section" id="innovation-at-anvastech">
      <div className="wrap split">
        <div>
          <p className="kicker">Innovation at AnvasTech</p>
          <h2 className="display">New technology, ordinary Tuesday</h2>
          <p className="prose">The test of an innovation is not the demo. It is whether someone is still using it on an ordinary Tuesday three months later, without being asked to.</p>
          <p className="prose">So we start from the work: the step that takes too long, the decision made on incomplete information, the handoff where things get lost. Then we bring the technology that changes it — and leave out the technology that does not.</p>
          <div className="actions"><Link className="btn-blue" to="/industries">Explore our products</Link></div>
        </div>
        <figure className="media-frame">
          <img src="/assets/ai-force.jpg" alt="Innovation at AnvasTech" width="1400" height="874" />
        </figure>
      </div>
    </section>

    <section className="section mist" id="ai-intelligent-systems">
      <div className="wrap">
        <p className="kicker">AI &amp; intelligent systems</p>
        <h2 className="display">Systems that read, reason and report back</h2>
        <div className="list-cards">
          <Link className="list-card" to="/generative-ai"><h3>Generative AI</h3><p>Grounded, governed GenAI programs built to leave the pilot stage and reach production.</p></Link>
          <Link className="list-card" to="/ai-agents"><h3>AI Agents</h3><p>AI systems designed to assist with tasks and workflows that involve multiple steps.</p></Link>
          <Link className="list-card" to="/intelligent-workflows"><h3>Business Automation</h3><p>Simplify repetitive business processes with software.</p></Link>
          <Link className="list-card" to="/data-ai-engineering"><h3>Data &amp; Analytics</h3><p>Turn application data into useful information.</p></Link>
          <Link className="list-card" to="/kubera-ai"><h3>Kubera AI</h3><p>An AI decision layer over your own data, with answers that cite the records behind them.</p></Link>
          <Link className="list-card" to="/anvas-comet"><h3>Anvas Comet</h3><p>Configurable operations workflows with approvals, SLAs and live reporting built in.</p></Link>
        </div>
      </div>
    </section>

    <section className="section" id="intelligent-automation">
      <div className="wrap split reverse">
        <figure className="media-frame">
          <img src="/assets/ai-easy.jpg" alt="Intelligent automation" width="1024" height="416" loading="lazy" />
        </figure>
        <div>
          <p className="kicker">Intelligent automation</p>
          <h2 className="display">Automate the routine, escalate the rest</h2>
          <p className="prose">Rule-based automation breaks the moment the input is unstructured or the process has exceptions — which is to say, almost immediately. Adding a model to the pipeline covers those gaps: reading a document, classifying a request, drafting a reply.</p>
          <p className="prose">Deterministic steps keep the process predictable, confidence thresholds decide what a person sees, and every automated action is logged and reversible where it can be. Capacity grows without the queue growing with it.</p>
        </div>
      </div>
    </section>

    <section className="section mist" id="digital-products">
      <div className="wrap">
        <p className="kicker">Digital products</p>
        <h2 className="display">Products built for a real operating context</h2>
        <div className="list-cards">
          <Link className="list-card" to="/anvas-logistics"><h3>Anvas Logistics</h3><p>Fleet, freight, dispatch and last-mile in one live view — designed for patchy connectivity and paper-heavy workflows.</p></Link>
          <Link className="list-card" to="/fintech-platform"><h3>FinTech Platform</h3><p>Payments, onboarding, ledgers and reporting with the controls regulated finance demands.</p></Link>
          <Link className="list-card" to="/elegal"><h3>eLegal</h3><p>Matters, hearings, documents and deadlines organized around the case rather than the person.</p></Link>
          <Link className="list-card" to="/ungal-pakkam"><h3>Ungal Pakkam – Manu System</h3><p>Citizen petitions with a reference number, an owner and a status both sides can see.</p></Link>
          <Link className="list-card" to="/mla-calendar"><h3>MLA Calendar</h3><p>One coordinated schedule and commitment register for a constituency office.</p></Link>
          <Link className="list-card" to="/industries"><h3>All products</h3><p>The full AnvasTech product and platform portfolio in one place.</p></Link>
        </div>
      </div>
    </section>

    <section className="section" id="idea-to-implementation">
      <div className="wrap">
        <p className="kicker">From idea to implementation</p>
        <h2 className="display">How an idea becomes a running system</h2>
        <div className="list-cards">
          <article className="list-card"><h3>1. Frame the problem</h3><p>Name the decision or step that needs to change, and what better looks like in numbers.</p></article>
          <article className="list-card"><h3>2. Prove the hard part</h3><p>Build the riskiest piece first on real data, before committing to the rest.</p></article>
          <article className="list-card"><h3>3. Design for adoption</h3><p>Fit the solution to the existing workflow, because a parallel process gets abandoned.</p></article>
          <article className="list-card"><h3>4. Build and integrate</h3><p>Ship in slices, connected to the systems of record from the start rather than at the end.</p></article>
          <article className="list-card"><h3>5. Measure against baseline</h3><p>Compare to how the process ran before. Without a baseline there is no result.</p></article>
          <article className="list-card"><h3>6. Scale what works</h3><p>Extend to the next team, region or use case once the first one holds up unattended.</p></article>
        </div>
      </div>
    </section>

    <section className="section mist" id="measurable-impact">
      <div className="wrap">
        <p className="kicker">Measurable business impact</p>
        <h2 className="display">What we hold ourselves to</h2>
        <div className="stats-row">
          <div className="stat"><b>11+</b><span>Active and completed systems in production</span></div>
          <div className="stat"><b>7+</b><span>AI and digital initiatives underway</span></div>
          <div className="stat"><b>Multiple</b><span>Industry domains served</span></div>
          <div className="stat"><b>AI-First</b><span>Development workflow across delivery</span></div>
        </div>
        <div className="list-cards">
          <article className="list-card"><h3>Cycle time</h3><p>How long the process takes end to end, before and after — the number most projects forget to record.</p></article>
          <article className="list-card"><h3>Manual touchpoints</h3><p>How many times a person has to intervene in a case that should run straight through.</p></article>
          <article className="list-card"><h3>Error and rework rate</h3><p>Work returned for missing or wrong information, which is where cost quietly accumulates.</p></article>
          <article className="list-card"><h3>Adoption</h3><p>Whether the intended users are still using it once the launch attention has moved on.</p></article>
        </div>
      </div>
    </section>

    <section className="section" id="innovation-stories">
      <div className="wrap">
        <p className="kicker">Innovation stories</p>
        <h2 className="display">Three problems, three systems</h2>
        <div className="list-cards">
          <Link className="list-card" to="/anvas-logistics"><h3>Logistics without the paper trail</h3><p>Dispatch, documentation and billing were running on phone calls and paper. One trip record now carries all three, and it works when the network drops.</p></Link>
          <Link className="list-card" to="/ungal-pakkam"><h3>Petitions that get followed up</h3><p>Citizen requests arriving through camps, counters and phone now share one reference number, one owner and one escalation path.</p></Link>
          <Link className="list-card" to="/kubera-ai"><h3>Answers without the reporting queue</h3><p>Routine questions about operational data used to wait on an analyst. Now they are asked in plain language and answered with citations.</p></Link>
        </div>
      </div>
    </section>

    <section className="section mist" id="contact-cta">
      <div className="wrap split">
        <div>
          <h2 className="display">Bring us the idea</h2>
          <p className="prose">Tell us the step that takes too long or the decision made on incomplete information. We will show you what we would build first.</p>
          <div className="actions"><Link className="btn-blue" to="/contact">Start a conversation</Link></div>
        </div>
        <figure className="media-frame">
          <img src="/assets/ai-slide-4.jpg?v=3" alt="" width="1024" height="521" loading="lazy" />
        </figure>
      </div>
    </section>
    </main>
  );
}
