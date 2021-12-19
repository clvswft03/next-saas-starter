describe('Home Page', () => {
  it('should provide expected url and elements on page load', () => {
    cy.visit('/');
    cy.location('pathname').should('equal', '/');

    cy.getBySel('heroHeading')
      .should('contain.text', 'Make your life easier with our SaaS')
      .then(($el) => cy.isInViewport($el));

    cy.getBySel('partnersTitle')
      .should('contain.text', 'official partners with')
      .then(($el) => cy.isInViewport($el));

    cy.getBySel('postsSectionTitle')
      .should('contain.text', 'What are you signing in for?')
      .then(($el) => cy.isNotInViewport($el));
  });
});
