describe('Product Listing Page', () => {
  beforeEach(() => {
    cy.loginAndVisit('/products');
    cy.get('.product-card').should('have.length.at.least', 1); // wait for load
  });

  it('shows the "All Products" heading and product count', () => {
    cy.contains('All Products').should('be.visible');
    cy.get('.listing-page__count').should('not.be.empty');
  });

  it('displays at least 12 product cards', () => {
    cy.get('.product-card').should('have.length.at.least', 12);
  });

  it('each card has an image, name and price', () => {
    cy.get('.product-card').first().within(() => {
      cy.get('.product-card__image').should('exist');
      cy.get('.product-card__name').should('not.be.empty');
      cy.get('.product-card__price').invoke('text').should('match', /\$[\d.]+/);
    });
  });

  it('sort by price low to high orders cards correctly', () => {
    cy.get('.listing-page__controls .form-select').select('price-asc');
    cy.url().should('include', 'sort=price-asc');
    cy.get('.product-card__price').should($els => {
      const prices = [...$els].map(el => parseFloat(el.text().replace('$', '')));
      expect(prices[0]).to.be.at.most(prices[prices.length - 1]);
    });
  });

  it('sort by price high to low orders cards correctly', () => {
    cy.get('.listing-page__controls .form-select').select('price-desc');
    cy.url().should('include', 'sort=price-desc');
    cy.get('.product-card__price').should($els => {
      const prices = [...$els].map(el => parseFloat(el.text().replace('$', '')));
      expect(prices[0]).to.be.at.least(prices[prices.length - 1]);
    });
  });

  it('opening the filter panel shows the sidebar', () => {
    cy.contains('button', 'Filters').click();
    cy.get('.sidebar').should('be.visible');
  });

  it('filtering by Books shows only 5 products', () => {
    cy.contains('button', 'Filters').click();
    cy.get('.sidebar').contains('label', 'Books').click();
    cy.get('.product-card').should('have.length', 5);
    cy.get('.product-card__category').each($el => {
      expect($el.text().toLowerCase()).to.include('books');
    });
  });

  it('searching for "headphones" returns matching products', () => {
    cy.get('.header__search-input').type('headphones');
    cy.get('.header__search-btn').click();
    cy.url().should('include', 'search=headphones');
    cy.get('.product-card').should('have.length.at.least', 1);
    cy.get('.product-card__name').first().invoke('text')
      .then(text => expect(text.toLowerCase()).to.include('headphones'));
  });

  it('shows the empty state when search has no results', () => {
    cy.loginAndVisit('/products?search=xyznosuchproduct999');
    cy.contains('No products found').should('be.visible');
    cy.contains('Clear Filters').should('be.visible');
  });

  it('clicking a product card navigates to the detail page', () => {
    cy.get('.product-card').first().click();
    cy.url().should('match', /\/product\/\d+/);
  });

  it('price range filter reduces the visible products', () => {
    cy.contains('button', 'Filters').click();
    cy.get('.sidebar').should('be.visible');
    cy.get('.price-filter input').first().clear().type('100');
    cy.get('.price-filter input').last().clear().type('200');
    cy.get('.price-filter button[type=submit]').click();
    // Wait for URL params so we know the filter fired before checking results
    cy.url().should('include', 'minPrice=100').and('include', 'maxPrice=200');
    // Only $149.99 sits in the $100–$200 band across the 25 mock products
    cy.get('.product-card').should('have.length', 1);
    cy.get('.product-card__price').each($el => {
      const price = parseFloat($el.text().replace('$', ''));
      expect(price).to.be.within(100, 200);
    });
  });

  it('clearing filters restores the full product list', () => {
    cy.loginAndVisit('/products?search=xyznosuchproduct999');
    cy.contains('No products found').should('be.visible');
    cy.contains('Clear Filters').click();
    cy.get('.product-card').should('have.length.at.least', 12);
  });
});

describe('Category Page', () => {
  it('shows Electronics category with 5 products', () => {
    cy.loginAndVisit('/category/electronics');
    cy.get('.category-hero').should('be.visible');
    cy.get('.product-card').should('have.length', 5);
  });

  it('shows Clothing category with 5 products', () => {
    cy.loginAndVisit('/category/clothing');
    cy.get('.product-card').should('have.length', 5);
  });

  it('shows Books category with 5 products', () => {
    cy.loginAndVisit('/category/books');
    cy.get('.product-card').should('have.length', 5);
  });

  it('category hero displays the category name', () => {
    cy.loginAndVisit('/category/sports');
    cy.get('.category-hero').contains('Sports').should('be.visible');
  });

  it('shows 4 other-category chips (all except current)', () => {
    cy.loginAndVisit('/category/electronics');
    cy.get('.other-cat-chip').should('have.length', 4);
  });

  it('clicking an other-category chip navigates to that category', () => {
    cy.loginAndVisit('/category/electronics');
    cy.get('.other-cat-chip').contains('Clothing').click();
    cy.url().should('include', '/category/clothing');
  });

  it('sort dropdown changes the product order', () => {
    cy.loginAndVisit('/category/electronics');
    cy.get('.product-card').should('have.length', 5);
    cy.get('.category-page__toolbar .form-select').select('price-asc');
    // CategoryPage uses component state (no URL), so .should() retry waits for re-render
    cy.get('.product-card__price').should($els => {
      const prices = [...$els].map(el => parseFloat(el.text().replace('$', '')));
      expect(prices[0]).to.be.at.most(prices[prices.length - 1]);
    });
  });
});
