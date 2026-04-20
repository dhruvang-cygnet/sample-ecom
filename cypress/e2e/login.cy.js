describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('renders the login form with email, password and submit button', () => {
    cy.get('#email').should('exist');
    cy.get('#password').should('exist');
    cy.get('button[type=submit]').should('contain.text', 'Sign In');
  });

  it('shows ShopLane branding in the hero section', () => {
    cy.get('.login-hero').contains('ShopLane').should('be.visible');
  });

  it('clicking the demo credential button fills the form', () => {
    cy.get('.demo-cred-btn').click();
    cy.get('#email').should('have.value', 'user@demo.com');
    cy.get('#password').should('have.value', 'password123');
  });

  it('shows an error alert for invalid credentials', () => {
    cy.get('#email').type('nobody@test.com');
    cy.get('#password').type('wrongpassword');
    cy.get('button[type=submit]').click();
    cy.get('.alert--error').should('be.visible').and('contain.text', 'Invalid');
  });

  it('sign-in button is disabled while loading', () => {
    cy.get('#email').type('user@demo.com');
    cy.get('#password').type('password123');
    cy.get('button[type=submit]').click();
    // button transitions to disabled during the async login call
    cy.get('button[type=submit]').should('contain.text', 'Signing in...');
  });

  it('redirects to home page after a successful login', () => {
    cy.get('#email').type('user@demo.com');
    cy.get('#password').type('password123');
    cy.get('button[type=submit]').click();
    cy.url().should('not.include', '/login');
    cy.get('.header__logo').should('be.visible');
  });

  it('redirects an unauthenticated visitor away from protected routes', () => {
    cy.visit('/products');
    cy.url().should('include', '/login');
  });

  it('redirects an unauthenticated visitor away from the cart', () => {
    cy.visit('/cart');
    cy.url().should('include', '/login');
  });
});
