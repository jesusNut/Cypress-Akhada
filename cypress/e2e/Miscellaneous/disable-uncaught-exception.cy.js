

//**================================================================================================
//!               ✨✨ EXCEPTION HANDLING IN CYPRESS-DISABLE UNCAUGHT EXCEPTION ✨✨
//*================================================================================================**/

//? Advanced examples: https://www.lambdatest.com/learning-hub/exception-handling-in-cypress#uncaught
//? https://docs.cypress.io/api/cypress-api/catalog-of-events#Examples

//* The below script will fail with error:

// visithttps://demoqa.com/automation-practice-form
// (uncaught exception)Error: Script error.

describe('uncaught exception error', () => {
    it('demo', () => {
        cy.visit('https://demoqa.com/automation-practice-form');
    });
});

//! ================================================================================================
//?                        ✨✨ SOLUTION✨✨
//! ================================================================================================**/

//* Add the below code in cypress/support/e2e.js (to disable uncaught excptin on framewoek level) OR
//* Add in a particular test case (i.e test case block) for test case level effect.

// Cypress.on('uncaught:exception', (err, runnable) => {
//     // returning false here prevents Cypress from
//     // failing the test
//     return false;
// });

//* Implementation on test case level:

describe('uncaught exception error-Handled at test case level', () => {
    it('demo', () => {

        //!✨✨ Solution Code :
        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test.
            return false;
        });
        cy.visit('https://demoqa.com/automation-practice-form');
    });
});


