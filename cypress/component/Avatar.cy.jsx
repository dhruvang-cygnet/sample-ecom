import Avatar from '../../src/components/data-display/Avatar';

describe('Avatar', () => {
  it('renders initials when no src', () => {
    cy.mount(<Avatar initials="AB" />);
    cy.getByTestId('avatar').should('contain.text', 'AB');
  });

  it('renders image when src is provided', () => {
    cy.mount(<Avatar src="https://picsum.photos/40" alt="User" />);
    cy.get('.avatar-img').should('exist');
  });

  it('applies circle shape by default', () => {
    cy.mount(<Avatar initials="CD" />);
    cy.getByTestId('avatar').should('have.class', 'avatar--circle');
  });

  it('applies square shape', () => {
    cy.mount(<Avatar initials="EF" shape="square" />);
    cy.getByTestId('avatar').should('have.class', 'avatar--square');
  });

  it('applies correct size class', () => {
    ['sm', 'md', 'lg', 'xl'].forEach((size) => {
      cy.mount(<Avatar initials="GH" size={size} />);
      cy.getByTestId('avatar').should('have.class', `avatar--${size}`);
    });
  });
});
