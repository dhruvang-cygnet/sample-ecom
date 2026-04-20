import { useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  if (isAuthenticated) return <Navigate to="/" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch {
      // error displayed via context
    }
  };

  const fillDemo = (e) => {
    e.preventDefault();
    setEmail('user@demo.com');
    setPassword('password123');
  };

  return (
    <div className="login-page">
      <div className="login-hero">
        <div className="login-hero__content">
          <h1>🛍️ ShopLane</h1>
          <p>Discover amazing products at unbeatable prices. Shop smarter, live better.</p>
          <ul className="login-hero__features">
            <li>✓ Free shipping on orders over $50</li>
            <li>✓ Easy 30-day returns</li>
            <li>✓ Secure checkout</li>
            <li>✓ 25,000+ products</li>
          </ul>
        </div>
      </div>

      <div className="login-form-section">
        <div className="login-card">
          <h2>Welcome back</h2>
          <p className="login-card__sub">Sign in to your account</p>

          {error && <div className="alert alert--error">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="form-control"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn--primary btn--full btn--lg" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="login-demo">
            <p>Demo credentials:</p>
            <button className="demo-cred-btn" onClick={fillDemo}>
              <strong>user@demo.com</strong> / password123
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
