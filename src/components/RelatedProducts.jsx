import { Link } from 'react-router-dom';
import { relatedProducts } from '../lib/products.js';
import ProductCard from './ProductCard.jsx';

/* The "Explore more products" row that closes every product page. Cards carry
 * each product's published description, the same one the Products index shows,
 * rather than repeating the category line the title already implies.
 *
 * `ids` keeps each page's own editorial pick, in its own order.
 */
export default function RelatedProducts({ ids }) {
  return (
    <section className="sp-band is-tight is-white" id="related">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">Products</p>
            <h2 className="sp-h2">Explore More Products</h2>
          </div>
        </div>
        <div className="sp-cards">
          {relatedProducts(ids).map((p) => <ProductCard product={p} key={p.id} />)}
        </div>
        <div className="sp-actions"><Link className="sp-btn" to="/industries">View all products</Link></div>
      </div>
    </section>
  );
}
