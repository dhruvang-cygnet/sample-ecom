import Alert from '../../src/components/feedback/Alert';

describe('Alert', () => {
  it('renders info alert', () => {
    cy.mount(<Alert type="info" message="This is info" />);
    cy.getByTestId('alert').should('have.class', 'alert--info').and('contain.text', 'This is info');
  });

  it('renders success alert', () => {
    cy.mount(<Alert type="success" message="Success!" />);
    cy.getByTestId('alert').should('have.class', 'alert--success');
  });

  it('renders warning alert', () => {
    cy.mount(<Alert type="warning" message="Warning!" />);
    cy.getByTestId('alert').should('have.class', 'alert--warning');
  });

  it('renders error alert', () => {
    cy.mount(<Alert type="error" message="Error!" />);
    cy.getByTestId('alert').should('have.class', 'alert--error');
  });

  it('renders title when provided', () => {
    cy.mount(<Alert type="info" message="Body" title="My Title" />);
    cy.get('.alert-title').should('contain.text', 'My Title');
  });

  it('does not show dismiss button when not dismissible', () => {
    cy.mount(<Alert type="info" message="No dismiss" />);
    cy.get('.alert-close').should('not.exist');
  });

  it('shows dismiss button when dismissible', () => {
    cy.mount(<Alert type="success" message="Dismiss me" dismissible />);
    cy.get('.alert-close').should('be.visible');
  });

  it('dismisses on close button click', () => {
    cy.mount(<Alert type="info" message="I will be dismissed" dismissible />);
    cy.getByTestId('alert').should('be.visible');
    cy.get('.alert-close').click();
    cy.getByTestId('alert').should('not.exist');
  });
});
