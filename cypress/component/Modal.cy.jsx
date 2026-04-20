import { useState } from 'react';
import Modal from '../../src/components/feedback/Modal';

function ModalWrapper() {
  const [open, setOpen] = useState(true);
  return (
    <>
      <button data-testid="open-btn" onClick={() => setOpen(true)}>Open</button>
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Test Modal" size="md">
        <p>Modal content here</p>
      </Modal>
    </>
  );
}

describe('Modal', () => {
  it('renders when isOpen is true', () => {
    cy.mount(<Modal isOpen title="Open Modal" onClose={() => {}}>Content</Modal>);
    cy.getByTestId('modal').should('be.visible');
    cy.get('.modal-title').should('contain.text', 'Open Modal');
  });

  it('does not render when isOpen is false', () => {
    cy.mount(<Modal isOpen={false} title="Hidden" onClose={() => {}}>Content</Modal>);
    cy.getByTestId('modal').should('not.exist');
  });

  it('closes when close button is clicked', () => {
    cy.mount(<ModalWrapper />);
    cy.getByTestId('modal').should('be.visible');
    cy.get('.modal-close').click();
    cy.getByTestId('modal').should('not.exist');
  });

  it('closes when overlay is clicked', () => {
    cy.mount(<ModalWrapper />);
    cy.getByTestId('modal-overlay').click({ force: true });
    cy.getByTestId('modal').should('not.exist');
  });

  it('applies correct size class', () => {
    cy.mount(<Modal isOpen title="Large Modal" size="lg" onClose={() => {}}>Content</Modal>);
    cy.getByTestId('modal').should('have.class', 'modal--lg');
  });

  it('renders children content', () => {
    cy.mount(<Modal isOpen title="With Content" onClose={() => {}}><span data-testid="child">Hello</span></Modal>);
    cy.getByTestId('child').should('contain.text', 'Hello');
  });
});
