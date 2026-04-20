import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import StarRating from './StarRating';
import { useCart } from '../../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-card__image-wrap">
        <img src={product.image} alt={product.name} className="product-card__image" loading="lazy" />
        {product.badge && <span className="product-card__badge">{product.badge}</span>}
        {product.discount > 0 && (
          <span className="product-card__discount">-{product.discount}%</span>
        )}
      </div>
      <div className="product-card__body">
        <p className="product-card__category">{product.category.replace('-', ' ')}</p>
        <h3 className="product-card__name">{product.name}</h3>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        <div className="product-card__pricing">
          <span className="product-card__price">${product.price.toFixed(2)}</span>
          {product.originalPrice > product.price && (
            <span className="product-card__original">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
        <button className="btn btn--primary btn--sm btn--full" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </Link>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    originalPrice: PropTypes.number,
    discount: PropTypes.number,
    category: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    reviewCount: PropTypes.number,
    badge: PropTypes.string,
  }).isRequired,
};
