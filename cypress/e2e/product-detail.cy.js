describe('Product Detail Page', () => {
  beforeEach(() => {
    cy.loginAndVisit('/product/1');
    cy.get('.product-info__name').should('be.visible'); // wait for load
  });

  it('shows the product name and price', () => {
    cy.get('.product-info__name').should('not.be.empty');
    cy.get('.product-info__price').invoke('text').should('match', /\$[\d.]+/);
  });

  it('shows the original crossed-out price and savings badge', () => {
    cy.get('.product-info__original').should('contain.text', '$');
    cy.get('.product-info__savings').should('contain.text', 'Save');
  });

  it('shows the main product image', () => {
    cy.get('.product-gallery__main img').should('exist');
  });

  it('shows thumbnail images and clicking one becomes active', () => {
    cy.get('.product-gallery__thumbs .product-gallery__thumb').should('have.length.at.least', 1);
    cy.get('.product-gallery__thumb').eq(0).should('have.class', 'product-gallery__thumb--active');
    cy.get('.product-gallery__thumb').eq(1).click();
    cy.get('.product-gallery__thumb').eq(1).should('have.class', 'product-gallery__thumb--active');
  });

  it('shows the star rating', () => {
    cy.get('.star-rating').should('exist');
    cy.get('.star--full').should('have.length.at.least', 1);
  });

  it('shows a stock status badge', () => {
    cy.get('.product-info__stock .badge').should('be.visible');
  });

  it('quantity defaults to 1', () => {
    cy.get('.qty-control span').should('have.text', '1');
  });

  it('+ button increments quantity', () => {
    cy.get('.qty-control button').last().click();
    cy.get('.qty-control span').should('have.text', '2');
  });

  it('− button decrements quantity but not below 1', () => {
    cy.get('.qty-control button').first().click();
    cy.get('.qty-control span').should('have.text', '1');
    cy.get('.qty-control button').last().click();
    cy.get('.qty-control span').should('have.text', '2');
    cy.get('.qty-control button').first().click();
    cy.get('.qty-control span').should('have.text', '1');
  });

  it('Add to Cart shows confirmation and updates the header badge', () => {
    cy.contains('button', 'Add to Cart').click();
    cy.contains('Added to Cart').should('be.visible');
    cy.get('.header__cart-badge').should('be.visible').and('contain.text', '1');
  });

  it('alert links to the cart page', () => {
    cy.contains('button', 'Add to Cart').click();
    cy.get('.alert--success a').should('have.attr', 'href', '/cart');
  });

  it('switching to Features tab shows the features list', () => {
    cy.get('.product-tabs__tab').contains('Features').click();
    cy.get('.product-tabs__tab--active').should('contain.text', 'Features');
    cy.get('.features-list li').should('have.length.at.least', 1);
  });

  it('switching to Reviews tab shows review items', () => {
    cy.get('.product-tabs__tab').contains('Reviews').click();
    cy.get('.reviews-list').should('be.visible');
    cy.get('.review-item').should('have.length.at.least', 1);
  });

  it('switching back to Description tab shows description text', () => {
    cy.get('.product-tabs__tab').contains('Features').click();
    cy.get('.product-tabs__tab').contains('Description').click();
    cy.get('.tab-description p').should('not.be.empty');
  });

  it('shows the related products section', () => {
    cy.get('.related-products').should('be.visible');
    cy.get('.related-products .product-card').should('have.length.at.least', 1);
  });

  it('clicking a related product card navigates to that product', () => {
    cy.get('.related-products .product-card').first().click();
    cy.url().should('match', /\/product\/\d+/);
  });

  it('breadcrumb Home link goes to home page', () => {
    cy.get('.breadcrumb').contains('Home').click();
    cy.url().should('eq', Cypress.config('baseUrl') + '/');
  });

  it('Buy Now button adds to cart and navigates to cart', () => {
    cy.contains('button', 'Buy Now').click();
    cy.url().should('include', '/cart');
    cy.get('.cart-item').should('have.length', 1);
  });
});
