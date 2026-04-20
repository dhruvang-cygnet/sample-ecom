import { useLocation, Link, Navigate } from 'react-router-dom';

export default function OrderSuccessPage() {
  const { state } = useLocation();
  const order = state?.order;

  if (!order) return <Navigate to="/" replace />;

  return (
    <div className="container order-success-page">
      <div className="order-success-card">
        <div className="order-success-icon">✓</div>
        <h1>Order Confirmed!</h1>
        <p className="order-success-sub">Thank you for your purchase. We'll send a confirmation to your email shortly.</p>

        <div className="order-success-details">
          <div className="order-detail-row">
            <span>Order Number</span>
            <strong>{order.orderId}</strong>
          </div>
          <div className="order-detail-row">
            <span>Estimated Delivery</span>
            <strong>{order.estimatedDelivery}</strong>
          </div>
          <div className="order-detail-row">
            <span>Status</span>
            <span className="badge badge--success">Confirmed</span>
          </div>
        </div>

        <div className="order-success-items">
          <h3>Items Ordered</h3>
          {order.items.map((item, i) => (
            <div key={i} className="order-success-item">
              <span>{item.name}</span>
              <span>× {item.qty}</span>
              <span>${(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
          <div className="order-success-total">
            <span>Total Paid</span>
            <strong>${order.total.toFixed(2)}</strong>
          </div>
        </div>

        <div className="order-success-actions">
          <Link to="/" className="btn btn--primary btn--lg">Continue Shopping</Link>
          <Link to="/products" className="btn btn--outline btn--lg">Browse More Products</Link>
        </div>
      </div>
    </div>
  );
}
