import StarRating from '../../src/components/common/StarRating';

describe('StarRating', () => {
  it('renders exactly 5 star elements', () => {
    cy.mount(<StarRating rating={4} />);
    cy.get('.star').should('have.length', 5);
  });

  it('rating 3 → 3 full stars and 2 empty stars', () => {
    cy.mount(<StarRating rating={3} />);
    cy.get('.star--full').should('have.length', 3);
    cy.get('.star--empty').should('have.length', 2);
  });

  it('rating 5 → all 5 full stars', () => {
    cy.mount(<StarRating rating={5} />);
    cy.get('.star--full').should('have.length', 5);
    cy.get('.star--empty').should('have.length', 0);
  });

  it('rating 0 → all 5 empty stars', () => {
    cy.mount(<StarRating rating={0} />);
    cy.get('.star--full').should('have.length', 0);
    cy.get('.star--empty').should('have.length', 5);
  });

  it('fractional rating shows a half star', () => {
    cy.mount(<StarRating rating={3.5} />);
    cy.get('.star--half').should('have.length', 1);
  });

  it('displays formatted review count when provided', () => {
    cy.mount(<StarRating rating={4} reviewCount={1234} />);
    cy.get('.review-count').should('contain.text', '1,234');
  });

  it('does not render review-count span when reviewCount is omitted', () => {
    cy.mount(<StarRating rating={4} />);
    cy.get('.review-count').should('not.exist');
  });

  it('applies size class for sm (default)', () => {
    cy.mount(<StarRating rating={4} />);
    cy.get('.star-rating--sm').should('exist');
  });

  it('applies size class for md', () => {
    cy.mount(<StarRating rating={4} size="md" />);
    cy.get('.star-rating--md').should('exist');
  });

  it('applies size class for lg', () => {
    cy.mount(<StarRating rating={4} size="lg" />);
    cy.get('.star-rating--lg').should('exist');
  });
});
