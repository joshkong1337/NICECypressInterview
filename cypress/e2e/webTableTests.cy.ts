/// <reference types="cypress" />

import { isEmpty } from "cypress/types/lodash";

describe('Runs tests to add and edit fields for the test QA demo site webtables page https://demoqa.com/webtables', () => {
    before(function () {
      cy.fixture('userDetails').as('userDetails'); 
    });

    beforeEach(() => {
    })
    
    // Creates a row in a table with information stored in fixture
    it('Adds a web table', function () {
      cy.visit('https://demoqa.com/webtables');
  
      cy.get("#addNewRecordButton").click();
      cy.get("#registration-form-modal").should('be.visible');

      // Gets the user detials from the fixture, and then adds them to the input fields
      cy.fixture('userDetails').then((userDetails) => {
        cy.get("#firstName").type(userDetails.FirstName);
        cy.get("#lastName").type(userDetails.LastName);
        cy.get("#userEmail").type(userDetails.Email);
        cy.get("#age").type(userDetails.Age);
        cy.get("#salary").type(userDetails.Salary);
        cy.get("#department").type(userDetails.Department);
        cy.get("#submit").click();

        // Checks that the cells with the inputted data is visible
        cy.get('.rt-td').contains(userDetails.FirstName).should('be.visible');
        cy.get('.rt-td').contains(userDetails.LastName).should('be.visible');
        cy.get('.rt-td').contains(userDetails.Email).should('be.visible');
        cy.get('.rt-td').contains(userDetails.Age).should('be.visible');
        cy.get('.rt-td').contains(userDetails.Salary).should('be.visible');
        cy.get('.rt-td').contains(userDetails.Department).should('be.visible');
      });
    })

    it('Adds a web table with missing fields', function () {
      cy.visit('https://demoqa.com/webtables');
  
      cy.get("#addNewRecordButton").click();
      cy.get("#registration-form-modal").should('be.visible');

      // Gets the user detials from the fixture (minus some fields), and then adds them to the input fields
      cy.fixture('userDetails').then((userDetails) => {
        cy.get("#firstName").type(userDetails.FirstName);
        cy.get("#lastName").type(userDetails.LastName);
        cy.get("#userEmail").type(userDetails.Email);
        cy.get("#submit").click();

        // Give split second to wait for window to close
        cy.wait(200)
        cy.get("#registration-form-modal").should('be.visible');
      });
    })  

    it('Adds a web table with invalid email', function () {
      cy.visit('https://demoqa.com/webtables');
  
      cy.get("#addNewRecordButton").click();
      cy.get("#registration-form-modal").should('be.visible');

      // Gets the user detials from the fixture, and then adds them to the input fields
      cy.fixture('userDetails').then((userDetails) => {
        cy.get("#firstName").type(userDetails.FirstName);
        cy.get("#lastName").type(userDetails.LastName);
        cy.get("#userEmail").type("INVALID"); // Usese invalid email
        cy.get("#age").type(userDetails.Age);
        cy.get("#salary").type(userDetails.Salary);
        cy.get("#department").type(userDetails.Department);
        cy.get("#submit").click();
        // Give split second to wait for window to close
        cy.wait(200)
        cy.get("#registration-form-modal").should('be.visible');
      });
    })  


    it('Updates a web table', function () {
      cy.visit('https://demoqa.com/webtables');

      cy.get("#edit-record-1")
        .should('be.visible')

      // Store existing first row values
      let existing_fields: string[] = []
      cy.get(".rt-tr.-odd").first()
        .children()
        .each(($child) => {
          const childText : string = $child.text();
          existing_fields.push(childText)
          // Get the text of each child
          console.log(childText); // Output the text to Cypress logs
        });
        console.log("===============")
        console.log(existing_fields)
      
        cy.get("#edit-record-1")
          .click()
        cy.get("#registration-form-modal")
          .should('be.visible');


      // Gets the user detials from the fixture, and then adds them to the input fields
      cy.fixture('userDetails').then((userDetails) => {
        cy.get("#firstName")
          .type('{selectall}')
          .type('{backspace}')
          .type(userDetails.FirstName);
        cy.get("#lastName")
          .type('{selectall}')
          .type('{backspace}')
          .type(userDetails.LastName);
        cy.get("#userEmail")
          .type('{selectall}')
          .type('{backspace}')
          .type(userDetails.Email);
        cy.get("#age")
          .type('{selectall}')
          .type('{backspace}')
          .type(userDetails.Age);
        cy.get("#salary")
          .type('{selectall}')
          .type('{backspace}')
          .type(userDetails.Salary);
        cy.get("#department")
          .type('{selectall}')
          .type('{backspace}')
          .type(userDetails.Department);
        cy.get("#submit").click();

        // Checks that the cells with the inputted data is visible
        cy.get('.rt-td').contains(userDetails.FirstName).should('be.visible');
        cy.get('.rt-td').contains(userDetails.LastName).should('be.visible');
        cy.get('.rt-td').contains(userDetails.Email).should('be.visible');
        cy.get('.rt-td').contains(userDetails.Age).should('be.visible');
        cy.get('.rt-td').contains(userDetails.Salary).should('be.visible');
        cy.get('.rt-td').contains(userDetails.Department).should('be.visible');

        existing_fields.forEach((field: any) => {
          if(field.trim() != ""){
            cy.get('.rt-td').contains(field).should('not.exist');
          }
        });
      });
    })



  })
  