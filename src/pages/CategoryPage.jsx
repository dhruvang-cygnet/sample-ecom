import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api';
import ProductCard from '../components/common/ProductCard';
import Spinner from '../components/common/Spinner';

const CATEGORY_META = {
  electronics: { icon: '💻', title: 'Electronics', description: 'The latest gadgets, devices, and tech accessories.' },
  clothing: { icon: '👕', title: 'Clothing', description: 'Fashion-forward styles for every occasion.' },
  'home-kitchen': { icon: '🏠', title: 'Home & Kitchen', description: 'Everything you need to make your home shine.' },
  books: { icon: '📚', title: 'Books', description: 'Expand your knowledge with our curated book collection.' },
  sports: { icon: '🏃', title: 'Sports & Outdoors', description: 'Gear up for your next adventure or workout.' },
};

const SORT_OPTIONS = [
  { value: '', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'discount', label: 'Biggest Discount' },
];

export default function CategoryPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('');

  const meta = CATEGORY_META[slug] || { icon: '📦', title: slug, description: '' };

  useEffect(() => {
    setLoading(true);
    api.products.getAll({ category: slug, sort })
      .then(({ products: p }) => setProducts(p))
      .finally(() => setLoading(false));
  }, [slug, sort]);

  return (
    <div className="category-page">
      <div className="category-hero">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link> / <Link to="/products">Products</Link> / <span>{meta.title}</span>
          </nav>
          <div className="category-hero__content">
            <span className="category-hero__icon">{meta.icon}</span>
            <div>
              <h1>{meta.title}</h1>
              <p>{meta.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="category-page__toolbar">
          <p>{!loading && `${products.length} products`}</p>
          <select
            className="form-select"
            value={sort}
            onChange={e => setSort(e.target.value)}
          >
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        {loading ? (
          <Spinner size="lg" />
        ) : (
          <div className="product-grid">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}

        {/* Other Categories */}
        <div className="other-categories">
          <h3>Explore Other Categories</h3>
          <div className="other-categories__list">
            {Object.entries(CATEGORY_META)
              .filter(([s]) => s !== slug)
              .map(([s, m]) => (
                <Link key={s} to={`/category/${s}`} className="other-cat-chip">
                  {m.icon} {m.title}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
