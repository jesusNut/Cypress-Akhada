

/**================================================================================================
 *!                      DISABLE XHR LOGS IN REQUEST ON COMMAND LOGS of TEST RUNNER
 *================================================================================================**/

 //?  
 //? 
 //? https://stackoverflow.com/questions/71357705/hide-xhr-calls-on-cypress-test-runner

//setting a base url on spec level:
Cypress.config('baseUrl', 'https://react-redux.realworld.io');

 describe('A test case without xhr disabled on command logs in Test Runner', () => {
    it.only('a simple login', () => {
        cy.visit('/#/login');
        cy.get("input[placeholder='Email']").type('tinohi9276@xgh6.com');
        cy.get("input[placeholder='Password']").type('Cypress007');
        cy.get("button[type='submit']").click({ force: true });
        cy.url().should('not.contain', 'login');
        cy.get("a[href='#settings']").should('be.visible');
    });
 });



//! ================================================================================================
//?                                   ✨✨ WAY 1 - ON TEST CASE LEVEL ✨✨
//! ================================================================================================**/

 describe('✨✨ WAY 1: A test case WITH XHR DISABLED on command logs in Test Runner', () => {
    it('a simple login', () => {
        cy.visit('/#/login');
        //! ✨✨ disable logging ✨✨
        cy.intercept({resourceType:/xhr|fetch/},{log:false})
        cy.get("input[placeholder='Email']").type('tinohi9276@xgh6.com');
        cy.get("input[placeholder='Password']").type('Cypress007');
        cy.get("button[type='submit']").click({ force: true });
        cy.url().should('not.contain', 'login');
        cy.get("a[href='#settings']").should('be.visible');
    });
 });

//! ================================================================================================
//?                                   ✨✨ WAY 2 - ON FRAMEWORK LEVEL ✨✨
//!  ================================================================================================**/

 //* Add the below code in cypress/support/e2e.js

 //? https://stackoverflow.com/questions/71357705/hide-xhr-calls-on-cypress-test-runner

//  const app = window.top;
// if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
//   const style = app.document.createElement('style');
//   style.innerHTML =
//     '.command-name-request, .command-name-xhr { display: none }';
//   style.setAttribute('data-hide-command-log-request', '');

//   app.document.head.appendChild(style);
// }

  