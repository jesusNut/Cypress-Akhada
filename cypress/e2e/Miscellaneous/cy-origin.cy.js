
/**================================================================================================
 *!                 ✨✨ cy.origin() ✨✨
 *================================================================================================**/

/**================================================================================================
 *?       ✨✨ Same origin policy in cypress ✨✨
 *=================================================================================================**/

//* In general, cypress does not allow to visit multiple domains in the same test.

//the below code will give error.

// CypressError:
// Timed out retrying after 4000ms: The command was expected to run against origin
// https://demoqa.com but the application is at origin https://mocklab-demo.herokuapp.com.

describe('Cypress bydefault doesnt allow cross origin tests', () => {
    it('example', () => {

        // 1st domain
        cy.visit('https://demoqa.com/login');
        cy.get("#userName").type('test');
        cy.get("#password").type('Cypress@007');
        cy.get("#login").click({ force: true });
        cy.url().should('contain', 'profile');
        // 2nd domain
        cy.visit('https://mocklab-demo.herokuapp.com/');
        cy.get("a[title='OAuth2 user info']").click();
        cy.url().should('contain', 'login');

    });
});

/**================================================================================================
 *?    ✨✨ Using cy.origin() to test cross origin testing ✨✨
 *=================================================================================================**/

//* we can use cy.origin() to visit different domains in same test.

//setting a base url on spec level:
Cypress.config('baseUrl', 'https://demoqa.com/login');

describe('demo of cross origin testing', () => {
    it('example', () => {

        // 1st domain
        cy.visit('/');
        cy.get("#userName").type('test');
        cy.get("#password").type('Cypress@007');
        cy.get("#login").click({ force: true });
        cy.url().should('contain', 'profile');

        //switch to second domain
        cy.origin('https://mocklab-demo.herokuapp.com/', () => {
            // Inside callback baseUrl is https://mocklab-demo.herokuapp.com/
            cy.visit('/');
            cy.get("a[title='OAuth2 user info']").click();
            cy.url().should('contain', 'login');
        }) //outside 2nd Domain block

        //visit again to first domain
        cy.visit('/');
        //here, baseUrl is https://demoqa.com/login
        cy.get("#userName-value").should('have.text', 'test');
    });
});
