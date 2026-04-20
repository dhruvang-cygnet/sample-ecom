import ProgressBar from '../../src/components/feedback/ProgressBar';

describe('ProgressBar', () => {
  it('renders with correct percentage', () => {
    cy.mount(<ProgressBar value={50} max={100} />);
    cy.get('.progress-fill').should('have.attr', 'style').and('include', '50%');
  });

  it('renders label with percentage', () => {
    cy.mount(<ProgressBar value={75} label="Progress" />);
    cy.get('.progress-label').should('contain.text', 'Progress').and('contain.text', '75%');
  });

  it('clamps value to 100%', () => {
    cy.mount(<ProgressBar value={150} />);
    cy.get('.progress-fill').should('have.attr', 'style').and('include', '100%');
  });

  it('clamps value to 0%', () => {
    cy.mount(<ProgressBar value={-10} />);
    cy.get('.progress-fill').should('have.attr', 'style').and('include', '0%');
  });

  it('adds animated class when animated prop is true', () => {
    cy.mount(<ProgressBar value={60} animated />);
    cy.get('.progress-fill--animated').should('exist');
  });

  it('has correct aria attributes', () => {
    cy.mount(<ProgressBar value={30} max={100} />);
    cy.get('.progress-track').should('have.attr', 'aria-valuenow', '30');
    cy.get('.progress-track').should('have.attr', 'aria-valuemin', '0');
    cy.get('.progress-track').should('have.attr', 'aria-valuemax', '100');
  });
});
