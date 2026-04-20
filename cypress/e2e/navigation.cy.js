describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders the header with correct title', () => {
    cy.getByTestId('header').should('contain.text', 'React Showcase');
  });

  it('renders the navbar with brand and links', () => {
    cy.getByTestId('navbar').should('be.visible');
    cy.get('.navbar-brand').should('contain.text', 'React Showcase');
    cy.get('.navbar-links li').should('have.length', 3);
  });

  it('renders the footer', () => {
    cy.getByTestId('footer').should('be.visible');
  });

  it('shows dashboard tab by default', () => {
    cy.getByTestId('home-page').should('be.visible');
    cy.get('.tab--active').should('contain.text', 'Dashboard');
  });

  it('switches to Components tab', () => {
    cy.clickTab('Components');
    cy.getByTestId('components-page').should('be.visible');
    cy.get('.tab--active').should('contain.text', 'Components');
  });

  it('switches to Forms tab', () => {
    cy.clickTab('Forms');
    cy.getByTestId('form-page').should('be.visible');
  });

  it('switches to Tables tab', () => {
    cy.clickTab('Tables');
    cy.getByTestId('table-page').should('be.visible');
  });

  it('can switch between tabs multiple times', () => {
    cy.clickTab('Components');
    cy.getByTestId('components-page').should('be.visible');
    cy.clickTab('Dashboard');
    cy.getByTestId('home-page').should('be.visible');
  });
});
