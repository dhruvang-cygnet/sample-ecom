const DEMO_USER = { id: 1, email: 'user@demo.com', name: 'Jane Smith', avatar: 'JS' };

Cypress.Commands.add('loginAndVisit', (path = '/') => {
  cy.visit(path, {
    onBeforeLoad(win) {
      win.sessionStorage.setItem('user', JSON.stringify(DEMO_USER));
      win.sessionStorage.setItem('token', 'mock-token-1');
    },
  });
});

Cypress.Commands.add('getByTestId', (testId) => {
  return cy.get(`[data-testid="${testId}"]`);
});

Cypress.Commands.add('addProductToCart', (productId) => {
  cy.visit(`/product/${productId}`, {
    onBeforeLoad(win) {
      win.sessionStorage.setItem('user', JSON.stringify(DEMO_USER));
      win.sessionStorage.setItem('token', 'mock-token-1');
    },
  });
  cy.get('.product-info__name').should('be.visible');
  cy.contains('button', 'Add to Cart').click();
  cy.contains('Added to Cart').should('be.visible');
});

Cypress.Commands.add('fillShipping', (overrides = {}) => {
  const data = {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    address: '123 Main St',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105',
    ...overrides,
  };
  cy.get('input[name=firstName]').type(data.firstName);
  cy.get('input[name=lastName]').type(data.lastName);
  cy.get('input[name=email]').type(data.email);
  cy.get('input[name=address]').type(data.address);
  cy.get('input[name=city]').type(data.city);
  cy.get('input[name=state]').type(data.state);
  cy.get('input[name=zip]').type(data.zip);
});

Cypress.Commands.add('fillPayment', (overrides = {}) => {
  const data = {
    cardName: 'Jane Smith',
    cardNumber: '4242424242424242',
    expiry: '1228',
    cvv: '123',
    ...overrides,
  };
  cy.get('input[name=cardName]').type(data.cardName);
  cy.get('input[name=cardNumber]').type(data.cardNumber);
  cy.get('input[name=expiry]').type(data.expiry);
  cy.get('input[name=cvv]').type(data.cvv);
});
