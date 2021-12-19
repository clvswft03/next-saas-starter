/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    getBySel(selector: string, args?: any): Chainable<JQuery<Element>>;

    getBySelLike(selector: string, args?: any): Chainable<JQuery<Element>>;

    isInViewport(element: JQuery<Element>): void;

    isNotInViewport(element: JQuery<Element>): void;
  }
}
