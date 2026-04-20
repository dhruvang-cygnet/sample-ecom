describe('Form Page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.clickTab('Forms');
  });

  it('renders all form fields', () => {
    cy.getByTestId('input-field').should('have.length.at.least', 2);
    cy.getByTestId('select-field').should('be.visible');
    cy.getByTestId('textarea-field').should('be.visible');
  });

  it('fills in the name field', () => {
    cy.get('#name').type('Jane Smith');
    cy.get('#name').should('have.value', 'Jane Smith');
  });

  it('fills in the email field', () => {
    cy.get('#email').type('jane@example.com');
    cy.get('#email').should('have.value', 'jane@example.com');
  });

  it('selects a role from dropdown', () => {
    cy.get('#role').select('Editor');
    cy.get('#role').should('have.value', 'editor');
  });

  it('selects a radio option', () => {
    cy.get('input[name="gender"][value="male"]').check();
    cy.get('input[name="gender"][value="male"]').should('be.checked');
  });

  it('fills the bio textarea', () => {
    cy.get('#bio').type('This is my biography text.');
    cy.get('#bio').should('have.value', 'This is my biography text.');
  });

  it('shows success alert on form submission', () => {
    cy.get('#name').type('Test User');
    cy.get('button[type="submit"]').click();
    cy.getByTestId('alert').should('be.visible');
    cy.get('.alert--success').should('contain.text', 'submitted successfully');
  });

  it('can dismiss the success alert', () => {
    cy.get('#name').type('Test User');
    cy.get('button[type="submit"]').click();
    cy.get('.alert-close').click();
    cy.getByTestId('alert').should('not.exist');
  });
});
