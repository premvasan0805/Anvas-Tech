import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';

export default function Ecosystem() {
  usePageMeta("Ecosystem | AnvasTech", "");
  return (
    <main id="main">

    <section className="page-hero">
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / Ecosystem</p>
        <h1>Ecosystem</h1>
        <p className="lede">Alliances that extend what we can build with clients — from hyperscalers to specialist AI partners.</p>
      </div>
    </section>
    <section className="section">
      <div className="wrap list-cards">
        <article className="list-card"><h3>OpenAI</h3><p>Advanced Partner to scale enterprise AI with governed adoption.</p></article>
        <article className="list-card"><h3>NetApp</h3><p>Expanded partnership for enterprise AI cloud storage.</p></article>
        <article className="list-card"><h3>Sarvam</h3><p>Strategic investment opening a new chapter in language AI.</p></article>
        <article className="list-card"><h3>Oracle</h3><p>Cloud-first transformations including Fonterra on OCI.</p></article>
        <article className="list-card"><h3>Microsoft, AWS, Google</h3><p>CloudSMART programs across the major clouds.</p></article>
        <article className="list-card"><h3>Industry partners</h3><p>Engineering and product alliances from Teradyne to Ericsson.</p></article>
      </div>
    </section>
    </main>
  );
}
