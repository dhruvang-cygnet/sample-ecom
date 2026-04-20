describe('Components Showcase Page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.clickTab('Components');
  });

  it('renders the page heading', () => {
    cy.getByTestId('components-page').find('h1').should('contain.text', 'Component Showcase');
  });

  it('renders primary button', () => {
    cy.getByTestId('button').contains('Primary').should('be.visible');
  });

  it('renders disabled button in disabled state', () => {
    cy.getByTestId('button').contains('Disabled').should('be.disabled');
  });

  it('renders loading button', () => {
    cy.getByTestId('button').contains('Loading').should('be.disabled');
    cy.get('.btn--loading').should('exist');
  });

  it('renders all alert types', () => {
    cy.get('.alert--info').should('be.visible');
    cy.get('.alert--success').should('be.visible');
    cy.get('.alert--warning').should('be.visible');
    cy.get('.alert--error').should('be.visible');
  });

  it('dismisses an alert', () => {
    cy.get('.alert--success .alert-close').click();
    cy.get('.alert--success').should('not.exist');
  });

  it('renders badges', () => {
    cy.getByTestId('badge').should('have.length.at.least', 3);
  });

  it('renders avatar with initials', () => {
    cy.getByTestId('avatar').should('have.length.at.least', 3);
    cy.getByTestId('avatar').first().should('contain.text', 'AB');
  });

  it('renders progress bars', () => {
    cy.getByTestId('progress-bar').should('have.length', 3);
  });

  it('progress fill width reflects value', () => {
    cy.getByTestId('progress-bar').first().find('.progress-fill').should('have.attr', 'style').and('include', '25%');
  });

  it('renders spinners', () => {
    cy.getByTestId('spinner').should('have.length', 3);
  });

  it('toggles checkbox', () => {
    cy.getByTestId('checkbox').find('input').check();
    cy.getByTestId('checkbox').find('input').should('be.checked');
    cy.getByTestId('checkbox').find('input').uncheck();
    cy.getByTestId('checkbox').find('input').should('not.be.checked');
  });

  it('toggles switch', () => {
    cy.getByTestId('switch').find('input[role="switch"]').check({ force: true });
    cy.getByTestId('switch').find('input[role="switch"]').should('be.checked');
  });
});
