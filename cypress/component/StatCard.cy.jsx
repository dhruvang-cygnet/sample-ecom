import StatCard from '../../src/components/dashboard/StatCard';

describe('StatCard', () => {
  it('renders title and value', () => {
    cy.mount(<StatCard title="Total Users" value="1,248" />);
    cy.get('.stat-card-title').should('contain.text', 'Total Users');
    cy.get('.stat-card-value').should('contain.text', '1,248');
  });

  it('renders positive delta', () => {
    cy.mount(<StatCard title="Revenue" value="$1000" delta="+12%" deltaType="positive" />);
    cy.get('.stat-card-delta--positive').should('contain.text', '+12%');
  });

  it('renders negative delta', () => {
    cy.mount(<StatCard title="Churn" value="5%" delta="-2%" deltaType="negative" />);
    cy.get('.stat-card-delta--negative').should('contain.text', '-2%');
  });

  it('renders neutral delta', () => {
    cy.mount(<StatCard title="Sessions" value="9302" delta="0%" deltaType="neutral" />);
    cy.get('.stat-card-delta--neutral').should('contain.text', '0%');
  });

  it('does not render delta when not provided', () => {
    cy.mount(<StatCard title="Score" value="100" />);
    cy.get('.stat-card-delta').should('not.exist');
  });

  it('renders icon when provided', () => {
    cy.mount(<StatCard title="Users" value="42" icon={<span data-testid="icon">👤</span>} />);
    cy.getByTestId('icon').should('be.visible');
  });
});
