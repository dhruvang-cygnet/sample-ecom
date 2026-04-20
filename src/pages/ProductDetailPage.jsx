import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../api';
import { useCart } from '../context/CartContext';
import StarRating from '../components/common/StarRating';
import ProductCard from '../components/common/ProductCard';
import Spinner from '../components/common/Spinner';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [addedMsg, setAddedMsg] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    api.products.getById(id)
      .then(async (p) => {
        setProduct(p);
        setSelectedImage(0);
        setQuantity(1);
        if (p.relatedIds?.length) {
          const rel = await api.products.getRelated(p.relatedIds);
          setRelated(rel);
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedMsg(true);
    setTimeout(() => setAddedMsg(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  if (loading) return <Spinner size="lg" />;
  if (error) return (
    <div className="container empty-state">
      <span>❌</span>
      <h3>{error}</h3>
      <button className="btn btn--primary" onClick={() => navigate('/products')}>Back to Products</button>
    </div>
  );
  if (!product) return null;

  const savings = product.originalPrice - product.price;

  return (
    <div className="container product-detail-page">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <Link to="/">Home</Link> /
        <Link to="/products">Products</Link> /
        <Link to={`/category/${product.category}`}>{product.category.replace('-', ' ')}</Link> /
        <span>{product.name}</span>
      </nav>

      {/* Main Section */}
      <div className="product-detail">
        {/* Image Gallery */}
        <div className="product-gallery">
          <div className="product-gallery__main">
            <img src={product.images[selectedImage]} alt={product.name} />
            {product.badge && <span className="product-card__badge product-gallery__badge">{product.badge}</span>}
          </div>
          {product.images.length > 1 && (
            <div className="product-gallery__thumbs">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  className={`product-gallery__thumb ${selectedImage === i ? 'product-gallery__thumb--active' : ''}`}
                  onClick={() => setSelectedImage(i)}
                >
                  <img src={img} alt={`View ${i + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="product-info">
          <p className="product-info__category">
            <Link to={`/category/${product.category}`}>{product.category.replace('-', ' ')}</Link>
          </p>
          <h1 className="product-info__name">{product.name}</h1>

          <div className="product-info__rating">
            <StarRating rating={product.rating} reviewCount={product.reviewCount} size="md" />
          </div>

          <div className="product-info__pricing">
            <span className="product-info__price">${product.price.toFixed(2)}</span>
            {savings > 0 && (
              <>
                <span className="product-info__original">${product.originalPrice.toFixed(2)}</span>
                <span className="product-info__savings">Save ${savings.toFixed(2)} ({product.discount}%)</span>
              </>
            )}
          </div>

          <div className="product-info__stock">
            {product.stock > 10 ? (
              <span className="badge badge--success">✓ In Stock</span>
            ) : product.stock > 0 ? (
              <span className="badge badge--warning">⚡ Only {product.stock} left</span>
            ) : (
              <span className="badge badge--error">Out of Stock</span>
            )}
          </div>

          {/* Quantity */}
          <div className="product-info__qty">
            <label>Quantity:</label>
            <div className="qty-control">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}>+</button>
            </div>
          </div>

          {/* Actions */}
          <div className="product-info__actions">
            <button
              className="btn btn--primary btn--lg"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {addedMsg ? '✓ Added to Cart!' : '🛒 Add to Cart'}
            </button>
            <button
              className="btn btn--secondary btn--lg"
              onClick={handleBuyNow}
              disabled={product.stock === 0}
            >
              Buy Now
            </button>
          </div>

          {addedMsg && (
            <div className="alert alert--success">
              Added {quantity} item{quantity > 1 ? 's' : ''} to cart. <Link to="/cart">View Cart →</Link>
            </div>
          )}

          {/* Highlights */}
          <div className="product-info__highlights">
            <div className="highlight"><span>🚚</span> Free shipping over $50</div>
            <div className="highlight"><span>↩️</span> 30-day easy returns</div>
            <div className="highlight"><span>🔒</span> Secure checkout</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="product-tabs">
        <div className="product-tabs__nav">
          {['description', 'features', 'reviews'].map(tab => (
            <button
              key={tab}
              className={`product-tabs__tab ${activeTab === tab ? 'product-tabs__tab--active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === 'reviews' && ` (${product.reviews?.length || 0})`}
            </button>
          ))}
        </div>

        <div className="product-tabs__content">
          {activeTab === 'description' && (
            <div className="tab-description">
              <p>{product.description}</p>
            </div>
          )}
          {activeTab === 'features' && (
            <ul className="features-list">
              {product.features.map((f, i) => <li key={i}>✓ {f}</li>)}
            </ul>
          )}
          {activeTab === 'reviews' && (
            <div className="reviews-list">
              {product.reviews?.length ? product.reviews.map(r => (
                <div key={r.id} className="review-item">
                  <div className="review-item__header">
                    <div className="review-item__avatar">{r.user[0]}</div>
                    <div>
                      <strong>{r.user}</strong>
                      <StarRating rating={r.rating} size="sm" />
                    </div>
                    <span className="review-item__date">{r.date}</span>
                  </div>
                  <p>{r.comment}</p>
                </div>
              )) : <p>No reviews yet.</p>}
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="related-products">
          <h2>Related Products</h2>
          <div className="product-grid">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
