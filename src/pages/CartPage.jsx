import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, subtotal, itemCount } = useCart();
  const navigate = useNavigate();

  const shipping = subtotal >= 50 ? 0 : 7.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="container empty-state">
        <span>🛒</span>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <Link to="/products" className="btn btn--primary btn--lg">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container cart-page">
      <h1>Shopping Cart <span className="cart-page__count">({itemCount} items)</span></h1>

      <div className="cart-layout">
        {/* Items */}
        <div className="cart-items">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="cart-item">
              <Link to={`/product/${product.id}`} className="cart-item__image">
                <img src={product.image} alt={product.name} />
              </Link>
              <div className="cart-item__details">
                <Link to={`/product/${product.id}`} className="cart-item__name">{product.name}</Link>
                <p className="cart-item__category">{product.category.replace('-', ' ')}</p>
                {product.stock <= 5 && (
                  <p className="cart-item__stock-warn">⚡ Only {product.stock} left</p>
                )}
              </div>
              <div className="cart-item__qty">
                <button
                  className="qty-btn"
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                >−</button>
                <span>{quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => updateQuantity(product.id, Math.min(product.stock, quantity + 1))}
                >+</button>
              </div>
              <div className="cart-item__price">
                <span className="cart-item__total">${(product.price * quantity).toFixed(2)}</span>
                <span className="cart-item__unit">${product.price.toFixed(2)} each</span>
              </div>
              <button className="cart-item__remove" onClick={() => removeFromCart(product.id)} aria-label="Remove">✕</button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <aside className="cart-summary">
          <h3>Order Summary</h3>
          <div className="cart-summary__rows">
            <div className="cart-summary__row">
              <span>Subtotal ({itemCount} items)</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="cart-summary__row">
              <span>Shipping</span>
              <span>{shipping === 0 ? <span className="text-success">FREE</span> : `$${shipping.toFixed(2)}`}</span>
            </div>
            {shipping > 0 && (
              <p className="cart-summary__shipping-note">
                Add ${(50 - subtotal).toFixed(2)} more for free shipping
              </p>
            )}
            <div className="cart-summary__row">
              <span>Estimated Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="cart-summary__divider" />
            <div className="cart-summary__row cart-summary__row--total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <button className="btn btn--primary btn--full btn--lg" onClick={() => navigate('/checkout')}>
            Proceed to Checkout →
          </button>
          <Link to="/products" className="cart-summary__continue">← Continue Shopping</Link>
        </aside>
      </div>
    </div>
  );
}
