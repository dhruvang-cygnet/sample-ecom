// Custom Cypress commands

Cypress.Commands.add('getByTestId', (testId) => {
  return cy.get(`[data-testid="${testId}"]`);
});

Cypress.Commands.add('clickTab', (label) => {
  cy.get('.tabs-list').contains(label).click();
});
