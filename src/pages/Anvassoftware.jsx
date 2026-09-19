import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';

export default function Anvassoftware() {
  usePageMeta("AnvasSoftware | AnvasTech", "");
  return (
    <main id="main">

    <section className="page-hero">
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / AnvasSoftware</p>
        <h1>AnvasSoftware</h1>
        <p className="lede">Products used by 20,000+ clients — from BigFix and AppScan to collaboration and marketing platforms.</p>
      </div>
    </section>
    <section className="section">
      <div className="wrap list-cards">
        <article className="list-card"><h3>Anvas BigFix</h3><p>Intelligent endpoint management for enterprise estates.</p></article>
        <article className="list-card"><h3>Anvas AppScan</h3><p>Application security testing across the software lifecycle.</p></article>
        <article className="list-card"><h3>Sovereign Collaboration</h3><p>Collaboration designed for control, residency and trust.</p></article>
        <article className="list-card"><h3>MarTech</h3><p>Hyper-personalized marketing technology platforms.</p></article>
      </div>
    </section>
    </main>
  );
}
