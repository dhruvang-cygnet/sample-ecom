import Tabs from '../../src/components/navigation/Tabs';

const tabs = [
  { id: 'tab1', label: 'First', content: <div data-testid="panel1">Panel 1</div> },
  { id: 'tab2', label: 'Second', content: <div data-testid="panel2">Panel 2</div> },
  { id: 'tab3', label: 'Third', content: <div data-testid="panel3">Panel 3</div> },
  { id: 'tab4', label: 'Disabled', content: <div>Panel 4</div>, disabled: true },
];

describe('Tabs', () => {
  it('renders all tab buttons', () => {
    cy.mount(<Tabs tabs={tabs} />);
    cy.get('.tab').should('have.length', 4);
  });

  it('activates first tab by default', () => {
    cy.mount(<Tabs tabs={tabs} />);
    cy.get('.tab--active').should('contain.text', 'First');
    cy.getByTestId('panel1').should('be.visible');
  });

  it('respects defaultTab prop', () => {
    cy.mount(<Tabs tabs={tabs} defaultTab="tab2" />);
    cy.get('.tab--active').should('contain.text', 'Second');
    cy.getByTestId('panel2').should('be.visible');
  });

  it('switches panels on tab click', () => {
    cy.mount(<Tabs tabs={tabs} />);
    cy.get('.tab').contains('Second').click();
    cy.get('.tab--active').should('contain.text', 'Second');
    cy.getByTestId('panel2').should('be.visible');
  });

  it('disabled tab is not clickable', () => {
    cy.mount(<Tabs tabs={tabs} />);
    cy.get('.tab').contains('Disabled').should('be.disabled');
  });
});
