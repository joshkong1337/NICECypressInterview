declare namespace Cypress {
    interface Chainable {
      login_func(username: string, password: string): Chainable<Element>;
    }
  }