
/**================================================================================================
 *!                                ✨✨ TEST ISOLATION ✨✨
 *================================================================================================**/

//? https://docs.cypress.io/guides/core-concepts/test-isolation

//* BY DEFAULT, test isolation option is set as true in cypress E2E tests.

//* When test isolation is ENABLED, Cypress RESETS THE BROWSER CONTEXT BEFORE EACH TEST by:

//! clearing the dom state by visiting about:blank
//! clearing cookies in all domains
//! clearing localStorage in all domains
//! clearing sessionStorage in all domains

// Because the test starts in a fresh browser context, you must re-visit your application
// and perform the series of interactions needed to build the dom and browser state for each test.

//* When test isolation is DISABLED, Cypress RESETS THE BROWSER CONTEXT BEFORE EACH TEST by:

//! does not alter the current browser context.

//* Realtion between Test Isolation and cy.session

//? https://docs.cypress.io/guides/core-concepts/test-isolation#What-is-Test-Isolation

/**================================================================================================
 *!                         ✨✨SETTING -TEST ISOLATION TRUE/FALSE✨✨
 *================================================================================================**/

//* The test isolation is a global configuration and can be set in cypress.config.js 
//* inside e2e config object or component config object BUT NOT ON ROOT LEVEl.
//* OR CAN BE overridden for end-to-end testing at the describe level with the testIsolation option.

//setting a base url on spec level:
Cypress.config('baseUrl', 'https://react-redux.realworld.io');

//! In below demo code, test case - 'TC-2 - Click on link' will fail when test isolation = true,
//! and pass when test isolation = false ON GLOBAL LEVEL.

describe('demo test isolation set on global config', () => {
    it('TC-1 - login', () => {
        cy.visit('/#/login');
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
        cy.get("input[placeholder='Email']").type('tinohi9276@xgh6.com');
        cy.get("input[placeholder='Password']").type('Cypress007');
        cy.get("button[type='submit']").click({ force: true });
        cy.url().should('not.contain', 'login');
        cy.get("a[href='#settings']").should('be.visible');
    });
    it('TC-2 - Click on link', () => {
        cy.get("a[href='#editor']").click();
        cy.url().should('contain', 'editor');
    });

});


//! In below demo code, test case - 'TC-2 - Click on link' will fail when test isolation = true,
//! and pass when test isolation = false ON TEST SUITE LEVEL.
describe('demo test isolation set on test suite(describe) level',
    { testIsolation: false }
    , () => {
        it('TC-1 - login', () => {
            cy.visit('/#/login');
            cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
            cy.get("input[placeholder='Email']").type('tinohi9276@xgh6.com');
            cy.get("input[placeholder='Password']").type('Cypress007');
            cy.get("button[type='submit']").click({ force: true });
            cy.url().should('not.contain', 'login');
            cy.get("a[href='#settings']").should('be.visible');
        });
        it('TC-2 - Click on link', () => {
            cy.get("a[href='#editor']").click();
            cy.url().should('contain', 'editor');
        });
    });