
Cypress.Commands.add('login_func', (username: string, password: string) => {
    if(username != ""){
        cy.get('#userName').type(username);
    }
    if(password != ""){
        cy.get('#password').type(password);
    }
    cy.get('#login').click();
  });
