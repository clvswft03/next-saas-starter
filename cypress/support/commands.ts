// @ts-check
///<reference path="../cypress.d.ts" />

Cypress.Commands.add('getBySel', (selector, ...args) => {
  return cy.get(`[data-cy=${selector}]`, ...args);
});

Cypress.Commands.add('getBySelLike', (selector, ...args) => {
  return cy.get(`[data-cy*=${selector}]`, ...args);
});

Cypress.Commands.add('isInViewport', ($el) => {
  // @ts-ignore
  const bottom = Cypress.$(cy.state('window')).height()!;
  const rect = $el[0].getBoundingClientRect();

  expect(rect.top).not.to.be.greaterThan(bottom);
  expect(rect.bottom).not.to.be.greaterThan(bottom);
  expect(rect.top).not.to.be.greaterThan(bottom);
  expect(rect.bottom).not.to.be.greaterThan(bottom);
});

Cypress.Commands.add('isNotInViewport', ($el) => {
  // @ts-ignore
  const bottom = Cypress.$(cy.state('window')).height()!;
  const rect = $el[0].getBoundingClientRect();

  expect(rect.top).to.be.greaterThan(bottom);
  expect(rect.bottom).to.be.greaterThan(bottom);
  expect(rect.top).to.be.greaterThan(bottom);
  expect(rect.bottom).to.be.greaterThan(bottom);
});
