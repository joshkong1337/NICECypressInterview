/// <reference types="cypress" />

import { isEmpty } from "cypress/types/lodash";

describe('Runs a series of login tests for the demoqa test site', () => {
    before(function () {
      cy.fixture('userDetails').as('userDetails'); 
    });

    beforeEach(() => {
    })
    
    // Basic login test with correct user fields (I created this test account on this demo site, however I'm not sure if the user will expire eventually. If test fails due to incorrect login, please try create an account with the input details)
    it('logs in with valid credentials', function () {
      cy.visit('https://demoqa.com/login')

      // Added function to commands for reusability
      cy.login_func("TestUser", "TestUser123*");
      cy.get("#userName-label")
        .should('be.visible');
    })

    it('logs in with invalid username', function () {
      cy.visit('https://demoqa.com/login')

      // Added function to commands for reusability
      cy.login_func("INVALID", "TestUser123*");
      cy.get("#name")
        .contains("Invalid username or password!")
        .should('be.visible');
    })

    it('logs in with invalid password', function () {
      cy.visit('https://demoqa.com/login')

      // Added function to commands for reusability
      cy.login_func("TestUser", "INVALID*");
      cy.get("#name")
        .contains("Invalid username or password!")
        .should('be.visible');
    })

    it('logs in with invalid password', function () {
      cy.visit('https://demoqa.com/login')

      // Added function to commands for reusability
      cy.login_func("TestUser", "INVALID*");
      cy.get("#name")
        .contains("Invalid username or password!")
        .should('be.visible');
    })
    
    it('logs in with no password', function () {
        cy.visit('https://demoqa.com/login')
  
        // Added function to commands for reusability
        cy.login_func("TestUser", "");
        cy.get(".mr-sm-2.is-invalid.form-control")
          .should('be.visible');
      })

    it('logs in with no username', function () {
        cy.visit('https://demoqa.com/login')
  
        // Added function to commands for reusability
        cy.login_func("", "TestUser123*");
        cy.get(".mr-sm-2.is-invalid.form-control")
          .should('be.visible');
    })

    it('logs in with no login details', function () {
        cy.visit('https://demoqa.com/login')
  
        // Added function to commands for reusability
        cy.login_func("", "");
        cy.get(".mr-sm-2.is-invalid.form-control")
          .should('be.visible');
        cy.get(".mr-sm-2.is-invalid.form-control")
          .should('have.length', 2)
    })

    // Basic log out test
    it('logs out', function () {
      cy.visit('https://demoqa.com/login')
      // Usually would store as env variable/github secret
      cy.login_func("TestUser", "TestUser123*");
      cy.get("#userName-label")
        .should('be.visible');
      cy.get("#submit")
        .click()
      cy.get(".login-wrapper")
        .should('be.visible');
    })

  })
  