import { Link } from 'react-router-dom';

/* One product, as a card. Used by the Products index and by the "Explore more
 * products" row, so a product looks the same wherever it is listed.
 *
 * The thumbnail is a real screenshot. Two products have none published, and
 * those fall back to the product's name set on ink — the same thing their own
 * pages do. Do not give them stock artwork to even the row up.
 */
export default function ProductCard({ product, anchorId }) {
  const { to, title, kicker, desc, shot } = product;
  /* Some pages are the target of footer and menu anchors that predate the
     shared product map and use their own id. Those pages pass `anchorId`. */
  const id = anchorId || product.id;
  return (
    <Link className="sp-card" to={to} id={id}>
      <span className="sp-card-thumb">
        {shot ? (
          <img src={shot.src} alt="" width={shot.w} height={shot.h} loading="lazy" decoding="async" />
        ) : (
          <span className="sp-card-mark">{title}</span>
        )}
      </span>
      <span className="sp-card-body">
        <span className="sp-card-kicker">{kicker}</span>
        <h3>{title}</h3>
        <p>{desc}</p>
        <span className="sp-link">Read more</span>
      </span>
    </Link>
  );
}
