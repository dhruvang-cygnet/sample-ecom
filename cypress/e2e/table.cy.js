describe('Table Page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.clickTab('Tables');
  });

  it('renders the table with correct columns', () => {
    cy.getByTestId('table').should('be.visible');
    cy.get('.table th').should('have.length', 5);
    cy.get('.table th').eq(1).should('contain.text', 'Name');
    cy.get('.table th').eq(2).should('contain.text', 'Email');
  });

  it('shows 10 rows per page', () => {
    cy.get('.table tbody tr').should('have.length', 10);
  });

  it('renders badges in status column', () => {
    cy.getByTestId('badge').should('have.length.at.least', 1);
  });

  it('navigates to next page', () => {
    cy.getByTestId('pagination').should('be.visible');
    cy.get('.pagination-btn--active').should('contain.text', '1');
    cy.contains('.pagination-btn', 'Next').click();
    cy.get('.pagination-btn--active').should('contain.text', '2');
    cy.get('.table tbody tr').should('have.length', 10);
  });

  it('navigates to a specific page', () => {
    cy.get('.pagination-btn').contains('3').click();
    cy.get('.pagination-btn--active').should('contain.text', '3');
  });

  it('prev button is disabled on page 1', () => {
    cy.contains('.pagination-btn', 'Prev').should('be.disabled');
  });

  it('next button is disabled on last page', () => {
    cy.get('.pagination-btn').contains('5').click();
    cy.contains('.pagination-btn', 'Next').should('be.disabled');
  });

  it('displays 5 total pages for 50 rows', () => {
    cy.get('.pagination-btn').filter(':not(:first-child):not(:last-child)').should('have.length', 5);
  });
});
