import { useState } from 'react';
import Pagination from '../../src/components/navigation/Pagination';

function PaginationWrapper({ totalPages = 5 }) {
  const [page, setPage] = useState(1);
  return (
    <>
      <div data-testid="current-page">{page}</div>
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </>
  );
}

describe('Pagination', () => {
  it('renders correct number of page buttons', () => {
    cy.mount(<PaginationWrapper totalPages={5} />);
    cy.get('.pagination-btn').should('have.length', 7); // prev + 5 + next
  });

  it('prev button is disabled on page 1', () => {
    cy.mount(<PaginationWrapper />);
    cy.contains('.pagination-btn', 'Prev').should('be.disabled');
  });

  it('next button is disabled on last page', () => {
    cy.mount(<PaginationWrapper totalPages={3} />);
    cy.contains('.pagination-btn', '3').click();
    cy.contains('.pagination-btn', 'Next').should('be.disabled');
  });

  it('navigates forward with next button', () => {
    cy.mount(<PaginationWrapper />);
    cy.contains('.pagination-btn', 'Next').click();
    cy.getByTestId('current-page').should('contain.text', '2');
  });

  it('navigates backward with prev button', () => {
    cy.mount(<PaginationWrapper />);
    cy.contains('.pagination-btn', '3').click();
    cy.contains('.pagination-btn', 'Prev').click();
    cy.getByTestId('current-page').should('contain.text', '2');
  });

  it('navigates to clicked page number', () => {
    cy.mount(<PaginationWrapper />);
    cy.contains('.pagination-btn', '4').click();
    cy.getByTestId('current-page').should('contain.text', '4');
    cy.get('.pagination-btn--active').should('contain.text', '4');
  });
});
