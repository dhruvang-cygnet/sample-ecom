describe('Dashboard Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays 4 stat cards', () => {
    cy.getByTestId('stat-card').should('have.length', 4);
  });

  it('stat cards show title and value', () => {
    cy.getByTestId('stat-card').first().within(() => {
      cy.get('.stat-card-title').should('not.be.empty');
      cy.get('.stat-card-value').should('not.be.empty');
    });
  });

  it('displays the weekly activity chart', () => {
    cy.getByTestId('chart').should('be.visible');
    cy.get('.chart-title').should('contain.text', 'Weekly Activity');
    cy.get('.chart-bar').should('have.length', 7);
  });

  it('displays the activity feed', () => {
    cy.getByTestId('activity-feed').should('be.visible');
    cy.get('.activity-item').should('have.length.at.least', 1);
  });

  it('activity feed items have user, action and time', () => {
    cy.get('.activity-item').first().within(() => {
      cy.get('.activity-user').should('not.be.empty');
      cy.get('.activity-time').should('not.be.empty');
    });
  });
});
