import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import ProductCard from '../components/common/ProductCard';
import Spinner from '../components/common/Spinner';

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.products.getFeatured(), api.categories.getAll()]).then(
      ([prods, cats]) => { setFeatured(prods); setCategories(cats); setLoading(false); }
    );
  }, []);

  if (loading) return <Spinner size="lg" text="Loading..." />;

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero__content">
          <span className="hero__eyebrow">Spring Sale — Up to 40% off</span>
          <h1 className="hero__title">Shop Everything You Love</h1>
          <p className="hero__subtitle">
            Discover thousands of products across electronics, fashion, home, books, and sports — all at unbeatable prices with fast delivery.
          </p>
          <div className="hero__actions">
            <Link to="/products" className="btn btn--primary btn--lg">Shop Now</Link>
            <Link to="/category/electronics" className="btn btn--outline btn--lg">View Deals</Link>
          </div>
        </div>
        <div className="hero__visual">
          <div className="hero__badge-grid">
            <div className="hero__badge">📦 Free Shipping<br /><small>Orders over $50</small></div>
            <div className="hero__badge">↩️ Easy Returns<br /><small>30-day policy</small></div>
            <div className="hero__badge">🔒 Secure Pay<br /><small>256-bit SSL</small></div>
            <div className="hero__badge">⭐ Top Rated<br /><small>4.8 avg. rating</small></div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <div className="container">
          <div className="section__header">
            <h2>Shop by Category</h2>
            <Link to="/products" className="section__link">Browse all →</Link>
          </div>
          <div className="category-grid">
            {categories.map(cat => (
              <Link key={cat.id} to={`/category/${cat.slug}`} className="category-card">
                <span className="category-card__icon">{cat.icon}</span>
                <h3 className="category-card__name">{cat.name}</h3>
                <p className="category-card__desc">{cat.description}</p>
                <span className="category-card__count">{cat.productCount} products</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section section--gray">
        <div className="container">
          <div className="section__header">
            <h2>Featured Products</h2>
            <Link to="/products" className="section__link">See all →</Link>
          </div>
          <div className="product-grid">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="promo-banner">
        <div className="container promo-banner__inner">
          <div>
            <h2>📚 New in Books</h2>
            <p>Expand your mind with our curated collection of bestsellers and classics.</p>
            <Link to="/category/books" className="btn btn--white btn--lg">Explore Books</Link>
          </div>
          <div>
            <h2>🏃 Sports & Fitness</h2>
            <p>Level up your workouts with premium gear and equipment.</p>
            <Link to="/category/sports" className="btn btn--white btn--lg">Shop Sports</Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="trust-section">
        <div className="container trust-grid">
          <div className="trust-item">
            <span>🚚</span>
            <h4>Free Shipping</h4>
            <p>On all orders above $50</p>
          </div>
          <div className="trust-item">
            <span>↩️</span>
            <h4>Easy Returns</h4>
            <p>30-day hassle-free returns</p>
          </div>
          <div className="trust-item">
            <span>🔒</span>
            <h4>Secure Checkout</h4>
            <p>Your data is always protected</p>
          </div>
          <div className="trust-item">
            <span>🎧</span>
            <h4>24/7 Support</h4>
            <p>We're here whenever you need us</p>
          </div>
        </div>
      </section>
    </div>
  );
}
