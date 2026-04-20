describe('Home Page', () => {
  beforeEach(() => {
    cy.loginAndVisit('/');
  });

  it('renders the hero headline', () => {
    cy.contains('Shop Everything You Love').should('be.visible');
  });

  it('hero has Shop Now and View Deals CTAs', () => {
    cy.contains('a', 'Shop Now').should('have.attr', 'href', '/products');
    cy.contains('a', 'View Deals').should('exist');
  });

  it('displays exactly 5 category cards', () => {
    cy.get('.category-card').should('have.length', 5);
  });

  it('category cards show icon, name and description', () => {
    cy.get('.category-card').first().within(() => {
      cy.get('.category-card__icon').should('not.be.empty');
      cy.get('.category-card__name').should('not.be.empty');
      cy.get('.category-card__desc').should('not.be.empty');
    });
  });

  it('shows the Featured Products section with at least 4 cards', () => {
    cy.contains('Featured Products').should('be.visible');
    cy.get('.product-card').should('have.length.at.least', 4);
  });

  it('each product card shows name, price and star rating', () => {
    cy.get('.product-card').first().within(() => {
      cy.get('.product-card__name').should('not.be.empty');
      cy.get('.product-card__price').invoke('text').should('match', /\$[\d.]+/);
      cy.get('.star-rating').should('exist');
    });
  });

  it('clicking a category card navigates to that category page', () => {
    cy.get('.category-card').contains('Electronics').click();
    cy.url().should('include', '/category/electronics');
  });

  it('clicking "See all" navigates to the products listing', () => {
    cy.contains('a', 'See all').first().click();
    cy.url().should('include', '/products');
  });

  it('header shows cart icon and user avatar', () => {
    cy.get('.header__cart').should('be.visible');
    cy.get('.header__avatar').should('be.visible');
  });

  it('header logo links back to home', () => {
    cy.get('.header__logo').should('have.attr', 'href', '/');
  });

  it('footer shows all category links', () => {
    cy.get('.footer__links').contains('Electronics').should('exist');
    cy.get('.footer__links').contains('Books').should('exist');
  });
});
