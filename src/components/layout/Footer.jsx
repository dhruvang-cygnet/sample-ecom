import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">🛍️ ShopLane</span>
          <p>Your one-stop destination for quality products at unbeatable prices.</p>
        </div>
        <div className="footer__links">
          <h4>Categories</h4>
          <Link to="/category/electronics">Electronics</Link>
          <Link to="/category/clothing">Clothing</Link>
          <Link to="/category/home-kitchen">Home & Kitchen</Link>
          <Link to="/category/books">Books</Link>
          <Link to="/category/sports">Sports</Link>
        </div>
        <div className="footer__links">
          <h4>Help</h4>
          <a href="#">FAQs</a>
          <a href="#">Returns</a>
          <a href="#">Shipping Info</a>
          <a href="#">Track Order</a>
        </div>
        <div className="footer__links">
          <h4>Company</h4>
          <a href="#">About Us</a>
          <a href="#">Careers</a>
          <a href="#">Blog</a>
          <a href="#">Contact</a>
        </div>
      </div>
      <div className="footer__bottom">
        <p>© 2026 ShopLane. All rights reserved. | Demo App</p>
      </div>
    </footer>
  );
}
