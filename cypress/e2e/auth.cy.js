describe('Logout Flow', () => {
  beforeEach(() => {
    cy.loginAndVisit('/');
    cy.get('.header__user').trigger('mouseover');
    cy.get('.header__dropdown-item--logout').click();
  });

  it('clears the session and redirects to login', () => {
    cy.url().should('include', '/login');
  });

  it('shows login page after logout', () => {
    cy.get('.login-form').should('be.visible');
  });

  it('cannot access protected routes after logout', () => {
    cy.visit('/products');
    cy.url().should('include', '/login');
  });
});

describe('Auth Guard', () => {
  it('redirects /products to login when not authenticated', () => {
    cy.visit('/products');
    cy.url().should('include', '/login');
  });

  it('redirects /cart to login when not authenticated', () => {
    cy.visit('/cart');
    cy.url().should('include', '/login');
  });

  it('redirects /checkout to login when not authenticated', () => {
    cy.visit('/checkout');
    cy.url().should('include', '/login');
  });

  it('redirects /product/:id to login when not authenticated', () => {
    cy.visit('/product/1');
    cy.url().should('include', '/login');
  });

  it('already-authenticated user visiting /login is sent to home', () => {
    cy.loginAndVisit('/login');
    cy.url().should('not.include', '/login');
  });
});
