import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export default function Header() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
      setSearch('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header__inner container">
        <Link to="/" className="header__logo">
          <span className="header__logo-icon">🛍️</span>
          <span className="header__logo-text">ShopLane</span>
        </Link>

        <form className="header__search" onSubmit={handleSearch}>
          <input
            type="text"
            className="header__search-input"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button type="submit" className="header__search-btn" aria-label="Search">🔍</button>
        </form>

        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
          <NavLink to="/" end className={({ isActive }) => `header__link ${isActive ? 'header__link--active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => `header__link ${isActive ? 'header__link--active' : ''}`}>
            Products
          </NavLink>
          <Link to="/cart" className="header__cart" aria-label="Cart">
            <span>🛒</span>
            {itemCount > 0 && <span className="header__cart-badge">{itemCount}</span>}
          </Link>
          <div className="header__user">
            <button className="header__user-btn">
              <span className="header__avatar">{user?.avatar}</span>
              <span className="header__user-name">{user?.name?.split(' ')[0]}</span>
              <span>▾</span>
            </button>
            <div className="header__dropdown">
              <span className="header__dropdown-email">{user?.email}</span>
              <Link to="/orders" className="header__dropdown-item">My Orders</Link>
              <button className="header__dropdown-item header__dropdown-item--logout" onClick={handleLogout}>
                Sign Out
              </button>
            </div>
          </div>
        </nav>

        <button className="header__hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
}
