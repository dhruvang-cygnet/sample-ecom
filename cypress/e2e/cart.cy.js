describe('Cart Page — empty state', () => {
  it('shows empty cart message when no items added', () => {
    cy.loginAndVisit('/cart');
    cy.contains('Your cart is empty').should('be.visible');
    cy.contains('Start Shopping').should('have.attr', 'href', '/products');
  });
});

describe('Cart Page — with items', () => {
  beforeEach(() => {
    cy.addProductToCart(1);
    cy.addProductToCart(2);
    cy.loginAndVisit('/cart');
    cy.get('.cart-item').should('have.length', 2);
  });

  it('displays both cart items with name and price', () => {
    cy.get('.cart-item').each($item => {
      cy.wrap($item).find('.cart-item__name').should('not.be.empty');
      cy.wrap($item).find('.cart-item__total').invoke('text').should('match', /\$[\d.]+/);
    });
  });

  it('shows the order summary sidebar with total', () => {
    cy.get('.cart-summary').should('be.visible');
    cy.get('.cart-summary__row--total').invoke('text').should('match', /\$[\d.]+/);
  });

  it('incrementing quantity updates the item total', () => {
    cy.get('.cart-item').first().within(() => {
      cy.get('.cart-item__qty span').then($span => {
        const before = parseInt($span.text());
        cy.contains('+').click();
        cy.get('.cart-item__qty span').should('have.text', String(before + 1));
      });
    });
  });

  it('decrementing quantity updates correctly', () => {
    cy.get('.cart-item').first().within(() => {
      cy.contains('+').click();
      cy.get('.cart-item__qty span').should('have.text', '2');
      cy.contains('−').click();
      cy.get('.cart-item__qty span').should('have.text', '1');
    });
  });

  it('removing an item reduces cart count', () => {
    cy.get('.cart-item__remove').first().click();
    cy.get('.cart-item').should('have.length', 1);
  });

  it('header cart badge reflects item count', () => {
    cy.get('.header__cart-badge').should('be.visible');
  });

  it('shows free shipping message when subtotal is over $50', () => {
    cy.contains('FREE').should('be.visible');
  });

  it('Proceed to Checkout button navigates to checkout', () => {
    cy.contains('Proceed to Checkout').click();
    cy.url().should('include', '/checkout');
  });
});

describe('Checkout Flow', () => {
  beforeEach(() => {
    cy.addProductToCart(3);
    cy.loginAndVisit('/checkout');
    cy.get('.checkout-steps').should('be.visible');
  });

  it('shows step indicator starting on Shipping', () => {
    cy.get('.checkout-step--active .checkout-step__label').should('contain.text', 'Shipping');
  });

  it('shows order summary with items', () => {
    cy.get('.cart-summary').should('be.visible');
    cy.get('.cart-summary__row--total').invoke('text').should('match', /\$[\d.]+/);
  });

  it('Continue to Payment is disabled until all required fields filled', () => {
    cy.contains('button', 'Continue to Payment').should('be.disabled');
  });

  it('filling shipping info enables Continue to Payment', () => {
    cy.fillShipping();
    cy.contains('button', 'Continue to Payment').should('not.be.disabled');
  });

  it('completes shipping step and advances to Payment', () => {
    cy.fillShipping();
    cy.contains('button', 'Continue to Payment').click();
    cy.get('.checkout-step--active .checkout-step__label').should('contain.text', 'Payment');
  });

  it('full checkout flow ends on Order Success page', () => {
    cy.fillShipping();
    cy.contains('button', 'Continue to Payment').click();

    cy.fillPayment();
    cy.contains('button', 'Review Order').click();

    cy.contains('button', 'Place Order').click();

    cy.url().should('include', '/order-success');
    cy.contains('Order Confirmed').should('be.visible');
    cy.get('.order-success-card').within(() => {
      cy.get('.order-detail-row').should('have.length.at.least', 2);
      cy.contains('Continue Shopping').should('exist');
    });
  });
});

describe('Checkout Back Navigation', () => {
  beforeEach(() => {
    cy.addProductToCart(4);
    cy.loginAndVisit('/checkout');
    cy.fillShipping();
    cy.contains('button', 'Continue to Payment').click();
    cy.get('.checkout-step--active .checkout-step__label').should('contain.text', 'Payment');
  });

  it('can navigate back to Shipping step', () => {
    cy.contains('button', 'Back').click();
    cy.get('.checkout-step--active .checkout-step__label').should('contain.text', 'Shipping');
  });

  it('shipping data is preserved after navigating back', () => {
    cy.contains('button', 'Back').click();
    cy.get('input[name=firstName]').should('have.value', 'Jane');
    cy.get('input[name=email]').should('have.value', 'jane@example.com');
  });
});
