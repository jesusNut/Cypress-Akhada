
//? https://www.youtube.com/watch?v=aj3RVBBzpBc 
//? https://www.youtube.com/watch?v=qDWaoqFSPM4&list=PLPO0LFyCaSo1sEDJb6FR2a1iPl-48FDBL&index=10

// We will be using https://www.saucedemo.com/v1/ for practice scenarios.
// custom commands are created in 'cypress/support/commands.js'
//We can do 4 things in cutsom commands:
// 1. Create a new Parent custom command.
// 2. Create a new Child custom command.
// 3. Create a new Dual custom command. [no demo]
// 4. Overwrite an existing command. [no demo]

//for 3 and 4 , refer:
//? https://www.youtube.com/watch?v=aj3RVBBzpBc 
//? https://docs.cypress.io/api/cypress-api/custom-commands#Custom-Dual-Command

describe('Concept to show how to use custom commands in cypress', () => {
    it('ex-1: using a parent custom command', () => {

        cy.visit('https://www.saucedemo.com/v1/');
        //login to saucedemo app using custom function (parent command).
        cy.loginToSauceDemoApp('standard_user', 'secret_sauce');

    });

    it.only('ex-1: child custom command : log text of an element', () => {

        cy.visit('https://www.saucedemo.com/v1/');
        //login to saucedemo app using custom function (parent command).
        cy.loginToSauceDemoApp('standard_user', 'secret_sauce');
        //print text of an element using child command
        cy.get('.product_label').logTextOfElementInUpperCase();
        cy.get('.inventory_item_img').first().logTextOfElementInUpperCase();


    });

    it('ex-2: child custom command : display number of elements fetched by a query', () => {

        cy.visit('https://www.saucedemo.com/v1/');
        //login to saucedemo app using custom function (parent command).
        cy.loginToSauceDemoApp('standard_user', 'secret_sauce');
        //count number of options present in sorting dropdown
        cy.get('#inventory_filter_container>select>option').logNumberOfElementsFetched();

    });
});