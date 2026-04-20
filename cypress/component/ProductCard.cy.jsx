import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from '../../src/context/CartContext';
import ProductCard from '../../src/components/common/ProductCard';

const product = {
  id: 42,
  name: 'Wireless Headphones',
  price: 79.99,
  originalPrice: 129.99,
  discount: 38,
  category: 'electronics',
  image: 'https://picsum.photos/seed/test42/400/400',
  rating: 4.5,
  reviewCount: 1243,
  stock: 10,
  badge: 'Best Seller',
};

const Wrap = ({ children }) => (
  <MemoryRouter>
    <CartProvider>{children}</CartProvider>
  </MemoryRouter>
);

describe('ProductCard', () => {
  it('renders the product name', () => {
    cy.mount(<Wrap><ProductCard product={product} /></Wrap>);
    cy.get('.product-card__name').should('have.text', 'Wireless Headphones');
  });

  it('renders the current price', () => {
    cy.mount(<Wrap><ProductCard product={product} /></Wrap>);
    cy.get('.product-card__price').should('have.text', '$79.99');
  });

  it('renders the original crossed-out price', () => {
    cy.mount(<Wrap><ProductCard product={product} /></Wrap>);
    cy.get('.product-card__original').should('have.text', '$129.99');
  });

  it('does not show original price when there is no discount', () => {
    const noDiscount = { ...product, price: 79.99, originalPrice: 79.99, discount: 0 };
    cy.mount(<Wrap><ProductCard product={noDiscount} /></Wrap>);
    cy.get('.product-card__original').should('not.exist');
  });

  it('shows the badge label', () => {
    cy.mount(<Wrap><ProductCard product={product} /></Wrap>);
    cy.get('.product-card__badge').should('have.text', 'Best Seller');
  });

  it('does not show badge when badge prop is null', () => {
    cy.mount(<Wrap><ProductCard product={{ ...product, badge: null }} /></Wrap>);
    cy.get('.product-card__badge').should('not.exist');
  });

  it('shows the discount percentage', () => {
    cy.mount(<Wrap><ProductCard product={product} /></Wrap>);
    cy.get('.product-card__discount').should('have.text', '-38%');
  });

  it('does not show discount label when discount is 0', () => {
    cy.mount(<Wrap><ProductCard product={{ ...product, discount: 0 }} /></Wrap>);
    cy.get('.product-card__discount').should('not.exist');
  });

  it('renders a star rating', () => {
    cy.mount(<Wrap><ProductCard product={product} /></Wrap>);
    cy.get('.star-rating').should('exist');
    cy.get('.star--full').should('have.length.at.least', 1);
  });

  it('has an "Add to Cart" button', () => {
    cy.mount(<Wrap><ProductCard product={product} /></Wrap>);
    cy.contains('button', 'Add to Cart').should('exist');
  });

  it('the card wraps a link pointing to the product detail page', () => {
    cy.mount(<Wrap><ProductCard product={product} /></Wrap>);
    cy.get('a.product-card').should('have.attr', 'href', '/product/42');
  });

  it('Add to Cart does not navigate away (prevents default)', () => {
    cy.mount(<Wrap><ProductCard product={product} /></Wrap>);
    cy.contains('button', 'Add to Cart').click();
    // page should still show the product card — not navigated away
    cy.get('.product-card__name').should('be.visible');
  });
});
