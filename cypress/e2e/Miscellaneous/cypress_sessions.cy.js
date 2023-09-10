
//! ================================================================================================
//*                           ✨✨ OLD WAYS TO CREATE AND RETAIN SESSION✨✨
//! ================================================================================================**/

//Older ways to create and retain session : 
//? https://github.com/qaboxletstest/react-cypress-session-demo
//? https://www.youtube.com/watch?v=-6DdZ9zscjI&t=8s


//* ================================================================================================
//!                                  ✨✨ NEW WAY : cy.session()✨✨
//* ================================================================================================**/

//todo                  ✨✨  cy.session IS USED TO CREATE,RETAIN & RESTORE A SESSION. ✨✨

//? https://docs.cypress.io/api/commands/session
//? https://www.youtube.com/watch?v=hOJ50rINCkA&t=1s
//? https://www.youtube.com/watch?v=yV1JIf5MMno




//setting a base url on spec level:
Cypress.config('baseUrl', 'https://react-redux.realworld.io');

//! In the below demo code, both it blocks will login into the app.

describe('login everytime before each test', () => {

    beforeEach(() => {
        cy.visit('/#/login');
        cy.get("input[placeholder='Email']").type('tinohi9276@xgh6.com');
        cy.get("input[placeholder='Password']").type('Cypress007');
        cy.get("button[type='submit']").click({ force: true });
    });
    it('validate url and a settings text', () => {
        cy.url().should('not.contain', 'login');
        cy.get("a[href='#settings']").should('be.visible');
    });

    it('validate a page component on homepage after successful login', () => {
        cy.get('img.user-pic').should('be.visible');
    });
});


//!   ✨✨✨✨ SOLUTION ✨✨✨✨:  

//1. Create a custom command which will use cy.session() to login into AUT
//   in cypress/support/commands.js
//2. cy.session will by-default- create and save a session with id specified by user in it.
//3. So, in same spec file (be it any desribe block), all tests which require login (with same session id),
//   will share the same session.
//4. We can create multiple different sessions by providing a different ID.
//5. If , we want to use the same session state/id across different spec files, then we need to 
//   provide an additional option as 'true' while creating session - 'cacheAcrossSpecs'
//   in cypress/support/commands.js

//* ✨✨✨✨ code to be used in cypress/support/commands.js ✨✨✨✨

// Cypress.Commands.add('login', (username, password) => {
//     cy.session([username, password], () => {
//       cy.visit('/#/login');
//       cy.get("input[placeholder='Email']").type(username);
//       cy.get("input[placeholder='Password']").type(password);
//       cy.get("button[type='submit']").click({force:true});
//     })
//   })


describe.only('FIRST SESSION : login once, create and retain session, reuse session', () => {

    beforeEach(() => {
        //enter a valid username and password here for the AUT.
        cy.login('tinohi9276@xgh6.com', 'Cypress007');

    });

    it('validate url and a Home text', () => {
        cy.visit('/');//compulasary to visit url in each test again, otherwise cypress will navigate to blank page and test fails.
        cy.url().should('not.contain', 'login');
        cy.get("a[href='#settings']").should('be.visible');
    });

    it('validate a page component on homepage after successful login', () => {
        cy.visit('/'); //compulasary to visit url in each test again, otherwise cypress will navigate to blank page and test fails.
        cy.get('img.user-pic').should('be.visible');
    });
});


describe.only('SECOND SESSION : login once, create and retain session, reuse session', () => {

    beforeEach(() => {
        cy.login('tinohi9276@xgh6.com', 'Cypress007');

    });

    it('validate url and a Home text', () => {
        cy.visit('/');//compulasary to visit url in each test again, otherwise cypress will navigate to blank page and test fails.
        cy.url().should('not.contain', 'login');
        cy.get("a[href='#settings']").should('be.visible');
    });

    it('validate a page component on homepage after successful login', () => {
        cy.visit('/'); //compulasary to visit url in each test again, otherwise cypress will navigate to blank page and test fails.
        cy.get('img.user-pic').should('be.visible');
    });
});


//* ================================================================================================
//!                    ✨✨ How to clear all previously saved sessions ✨✨
//* ================================================================================================**/
// direct way : Cypress.session.clearAllSavedSessions(); may be used in After hook.
//? udemy -Joan- chapter 98.    - using clear cookies concept.
 