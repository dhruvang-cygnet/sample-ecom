import Spinner from '../../src/components/common/Spinner';

describe('Spinner', () => {
  it('renders a visible spinner element', () => {
    cy.mount(<Spinner />);
    cy.get('.spinner').should('be.visible');
  });

  it('shows "Loading..." as the default text', () => {
    cy.mount(<Spinner />);
    cy.get('.spinner-text').should('have.text', 'Loading...');
  });

  it('shows custom text when provided', () => {
    cy.mount(<Spinner text="Fetching products..." />);
    cy.get('.spinner-text').should('have.text', 'Fetching products...');
  });

  it('does not render spinner-text when text is an empty string', () => {
    cy.mount(<Spinner text="" />);
    cy.get('.spinner-text').should('not.exist');
  });

  it('has role="status" for screen-reader accessibility', () => {
    cy.mount(<Spinner />);
    cy.get('[role=status]').should('exist');
  });

  it('applies sm size class', () => {
    cy.mount(<Spinner size="sm" />);
    cy.get('.spinner-wrapper--sm').should('exist');
  });

  it('applies md size class (default)', () => {
    cy.mount(<Spinner />);
    cy.get('.spinner-wrapper--md').should('exist');
  });

  it('applies lg size class', () => {
    cy.mount(<Spinner size="lg" />);
    cy.get('.spinner-wrapper--lg').should('exist');
  });
});
