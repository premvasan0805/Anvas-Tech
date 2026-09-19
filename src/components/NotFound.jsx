import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';

/* Without this, an unmatched URL renders nothing at all. */
export default function NotFound() {
  usePageMeta('Page not found | AnvasTech', 'That page does not exist.');
  return (
    <main id="main">
      <section className="page-hero">
        <div className="wrap">
          <p className="crumbs"><Link to="/">Home</Link> / Not found</p>
          <h1>Page not found</h1>
          <p className="lede">That page does not exist. It may have moved.</p>
          <div className="actions"><Link className="btn-blue" to="/">Back to home</Link></div>
        </div>
      </section>
    </main>
  );
}
