import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { api } from '../api';

const STEPS = ['Shipping', 'Payment', 'Review'];

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [placing, setPlacing] = useState(false);

  const [shipping, setShipping] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '', country: 'US',
  });
  const [payment, setPayment] = useState({
    cardName: '', cardNumber: '', expiry: '', cvv: '',
  });

  const shippingCost = subtotal >= 50 ? 0 : 7.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  if (items.length === 0) {
    return (
      <div className="container empty-state">
        <span>🛒</span>
        <h2>Your cart is empty</h2>
        <Link to="/products" className="btn btn--primary">Shop Now</Link>
      </div>
    );
  }

  const updateShipping = (e) => setShipping(s => ({ ...s, [e.target.name]: e.target.value }));
  const updatePayment = (e) => setPayment(p => ({ ...p, [e.target.name]: e.target.value }));

  const handlePlace = async () => {
    setPlacing(true);
    try {
      const order = await api.orders.place({
        items: items.map(i => ({ id: i.product.id, name: i.product.name, qty: i.quantity, price: i.product.price })),
        shipping,
        total,
      });
      clearCart();
      navigate('/order-success', { state: { order } });
    } finally {
      setPlacing(false);
    }
  };

  const formatCard = (v) => v.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
  const formatExpiry = (v) => v.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5);

  return (
    <div className="container checkout-page">
      {/* Steps */}
      <div className="checkout-steps">
        {STEPS.map((s, i) => (
          <div key={s} className={`checkout-step ${i === step ? 'checkout-step--active' : ''} ${i < step ? 'checkout-step--done' : ''}`}>
            <span className="checkout-step__num">{i < step ? '✓' : i + 1}</span>
            <span className="checkout-step__label">{s}</span>
            {i < STEPS.length - 1 && <span className="checkout-step__line" />}
          </div>
        ))}
      </div>

      <div className="checkout-layout">
        <div className="checkout-main">
          {/* Step 0: Shipping */}
          {step === 0 && (
            <div className="checkout-section">
              <h2>Shipping Information</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input name="firstName" className="form-control" value={shipping.firstName} onChange={updateShipping} required />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input name="lastName" className="form-control" value={shipping.lastName} onChange={updateShipping} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input name="email" type="email" className="form-control" value={shipping.email} onChange={updateShipping} required />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input name="phone" type="tel" className="form-control" value={shipping.phone} onChange={updateShipping} />
                </div>
              </div>
              <div className="form-group">
                <label>Address</label>
                <input name="address" className="form-control" placeholder="123 Main St, Apt 4B" value={shipping.address} onChange={updateShipping} required />
              </div>
              <div className="form-row form-row--3">
                <div className="form-group">
                  <label>City</label>
                  <input name="city" className="form-control" value={shipping.city} onChange={updateShipping} required />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input name="state" className="form-control" value={shipping.state} onChange={updateShipping} required />
                </div>
                <div className="form-group">
                  <label>ZIP Code</label>
                  <input name="zip" className="form-control" value={shipping.zip} onChange={updateShipping} required />
                </div>
              </div>
              <button
                className="btn btn--primary btn--lg"
                onClick={() => setStep(1)}
                disabled={!shipping.firstName || !shipping.lastName || !shipping.email || !shipping.address || !shipping.city || !shipping.zip}
              >
                Continue to Payment →
              </button>
            </div>
          )}

          {/* Step 1: Payment */}
          {step === 1 && (
            <div className="checkout-section">
              <h2>Payment Details</h2>
              <div className="mock-payment-note">
                🔒 This is a demo. No real payment is processed.
              </div>
              <div className="form-group">
                <label>Name on Card</label>
                <input name="cardName" className="form-control" value={payment.cardName} onChange={updatePayment} placeholder="Jane Smith" />
              </div>
              <div className="form-group">
                <label>Card Number</label>
                <input
                  name="cardNumber"
                  className="form-control"
                  value={payment.cardNumber}
                  onChange={e => setPayment(p => ({ ...p, cardNumber: formatCard(e.target.value) }))}
                  placeholder="4242 4242 4242 4242"
                  maxLength={19}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Expiry</label>
                  <input
                    name="expiry"
                    className="form-control"
                    value={payment.expiry}
                    onChange={e => setPayment(p => ({ ...p, expiry: formatExpiry(e.target.value) }))}
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input
                    name="cvv"
                    className="form-control"
                    value={payment.cvv}
                    onChange={e => setPayment(p => ({ ...p, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                    placeholder="123"
                    maxLength={4}
                  />
                </div>
              </div>
              <div className="checkout-section__actions">
                <button className="btn btn--outline" onClick={() => setStep(0)}>← Back</button>
                <button className="btn btn--primary btn--lg" onClick={() => setStep(2)}>Review Order →</button>
              </div>
            </div>
          )}

          {/* Step 2: Review */}
          {step === 2 && (
            <div className="checkout-section">
              <h2>Review Your Order</h2>
              <div className="review-section">
                <h4>Shipping to</h4>
                <p>{shipping.firstName} {shipping.lastName}</p>
                <p>{shipping.address}</p>
                <p>{shipping.city}, {shipping.state} {shipping.zip}</p>
                <p>{shipping.email}</p>
              </div>
              <div className="review-section">
                <h4>Items ({items.length})</h4>
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="review-item">
                    <img src={product.image} alt={product.name} />
                    <div>
                      <p>{product.name}</p>
                      <small>Qty: {quantity}</small>
                    </div>
                    <span>${(product.price * quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="checkout-section__actions">
                <button className="btn btn--outline" onClick={() => setStep(1)}>← Back</button>
                <button className="btn btn--secondary btn--lg" onClick={handlePlace} disabled={placing}>
                  {placing ? 'Placing Order...' : `Place Order • $${total.toFixed(2)}`}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <aside className="cart-summary">
          <h3>Order Summary</h3>
          <div className="cart-summary__rows">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="cart-summary__row cart-summary__row--item">
                <span>{product.name} × {quantity}</span>
                <span>${(product.price * quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="cart-summary__divider" />
            <div className="cart-summary__row">
              <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="cart-summary__row">
              <span>Shipping</span>
              <span>{shippingCost === 0 ? <span className="text-success">FREE</span> : `$${shippingCost.toFixed(2)}`}</span>
            </div>
            <div className="cart-summary__row">
              <span>Tax (8%)</span><span>${tax.toFixed(2)}</span>
            </div>
            <div className="cart-summary__divider" />
            <div className="cart-summary__row cart-summary__row--total">
              <span>Total</span><span>${total.toFixed(2)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
