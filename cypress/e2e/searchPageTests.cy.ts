/// <reference types="cypress" />

import { isEmpty } from "cypress/types/lodash";

describe('Runs tests for the demoqa book store search functionality https://demoqa.com/books', () => {
    before(function () {
      cy.fixture('userDetails').as('userDetails'); 
    });

    beforeEach(() => {
    })
    
    it('Searches for a specific book with full title', function (){
      cy.intercept('GET', '/BookStore/v1/Books').as('getBooks');
      cy.visit('https://demoqa.com/books');
      cy.wait('@getBooks').then((interception) => {
        if(interception.response){
          console.log(interception.response.body);
          let booksData = interception.response.body.books;
          const bookLengths = booksData.length
          const chosenTitle = booksData[Math.round(bookLengths / 2)].title
  
          cy.wrap(booksData).as('booksData');
          booksData.forEach((book: any) => {
            cy.contains(book.title).should('be.visible');
          });
          cy.get('#searchBox')
            .type(chosenTitle);       
            console.log(booksData[Math.round(bookLengths / 2)].title)
          booksData.forEach((book: any) => {
              if(chosenTitle != book.title){
                console.log(book.title)
                cy.contains(book.title).should('not.exist');
              }
          });
        }
      });
    })

    it('Searches for a specific book with a partial title', function (){

      cy.intercept('GET', '/BookStore/v1/Books').as('getBooks');
      cy.visit('https://demoqa.com/books');
      cy.wait('@getBooks').then((interception) => {
        if(interception.response){

        console.log(interception.response.body);

        let booksData = interception.response.body.books;

        const bookLengths = booksData.length
        const chosenTitle = booksData[Math.round(bookLengths / 2)].title
        const modifiedTitleInput = chosenTitle.slice(1, -1)

        cy.wrap(booksData).as('booksData');
        booksData.forEach((book:any) => {
          cy.contains(chosenTitle).should('be.visible');
        });
        cy.get('#searchBox')
          .type(modifiedTitleInput);
        booksData.forEach((book:any) => {
            if(chosenTitle != book.title){
              console.log(book.title)
              cy.contains(book.title).should('not.exist'); 
            }
        });
      }
      });

    })



  })
  