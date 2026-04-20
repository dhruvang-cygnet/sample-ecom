import Button from '../../src/components/buttons/Button';

describe('Button', () => {
  it('renders with primary variant by default', () => {
    cy.mount(<Button>Click me</Button>);
    cy.getByTestId('button').should('have.class', 'btn--primary').and('contain.text', 'Click me');
  });

  it('renders each variant', () => {
    ['primary', 'secondary', 'danger', 'outline', 'ghost'].forEach((variant) => {
      cy.mount(<Button variant={variant}>{variant}</Button>);
      cy.getByTestId('button').should('have.class', `btn--${variant}`);
    });
  });

  it('renders each size', () => {
    ['sm', 'md', 'lg'].forEach((size) => {
      cy.mount(<Button size={size}>{size}</Button>);
      cy.getByTestId('button').should('have.class', `btn--${size}`);
    });
  });

  it('is disabled when disabled prop is true', () => {
    cy.mount(<Button disabled>Disabled</Button>);
    cy.getByTestId('button').should('be.disabled');
  });

  it('is disabled when loading prop is true', () => {
    cy.mount(<Button loading>Loading</Button>);
    cy.getByTestId('button').should('be.disabled');
    cy.get('.btn-spinner').should('exist');
  });

  it('calls onClick when clicked', () => {
    const onClick = cy.stub().as('onClick');
    cy.mount(<Button onClick={onClick}>Click</Button>);
    cy.getByTestId('button').click();
    cy.get('@onClick').should('have.been.calledOnce');
  });

  it('does not call onClick when disabled', () => {
    const onClick = cy.stub().as('onClick');
    cy.mount(<Button disabled onClick={onClick}>Click</Button>);
    cy.getByTestId('button').click({ force: true });
    cy.get('@onClick').should('not.have.been.called');
  });
});
