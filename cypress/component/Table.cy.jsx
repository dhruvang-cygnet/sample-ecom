import Table from '../../src/components/data-display/Table';

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'status', label: 'Status' },
];

const rows = [
  { id: 1, name: 'Alice', status: 'active' },
  { id: 2, name: 'Bob', status: 'inactive' },
  { id: 3, name: 'Carol', status: 'pending' },
];

describe('Table', () => {
  it('renders all column headers', () => {
    cy.mount(<Table columns={columns} rows={rows} />);
    cy.get('.table th').should('have.length', 3);
    cy.get('.table th').eq(1).should('contain.text', 'Name');
  });

  it('renders all rows', () => {
    cy.mount(<Table columns={columns} rows={rows} />);
    cy.get('.table tbody tr').should('have.length', 3);
  });

  it('renders cell data correctly', () => {
    cy.mount(<Table columns={columns} rows={rows} />);
    cy.get('.table tbody tr').first().find('td').eq(1).should('contain.text', 'Alice');
  });

  it('applies striped class', () => {
    cy.mount(<Table columns={columns} rows={rows} striped />);
    cy.getByTestId('table').find('.table').should('have.class', 'table--striped');
  });

  it('applies hoverable class', () => {
    cy.mount(<Table columns={columns} rows={rows} hoverable />);
    cy.getByTestId('table').find('.table').should('have.class', 'table--hoverable');
  });

  it('uses custom render function', () => {
    const cols = [
      ...columns,
      { key: 'badge', label: 'Badge', render: (v, row) => <span data-testid="custom-cell">{row.name}</span> },
    ];
    cy.mount(<Table columns={cols} rows={rows} />);
    cy.getByTestId('custom-cell').should('have.length', 3);
  });

  it('renders empty table with no rows', () => {
    cy.mount(<Table columns={columns} rows={[]} />);
    cy.get('.table tbody tr').should('not.exist');
  });
});
