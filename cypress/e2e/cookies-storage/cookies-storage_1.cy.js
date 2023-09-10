
//? https://docs.cypress.io/api/commands/getcookie
//? https://docs.cypress.io/api/cypress-api/cookies
//? https://testautomationu.applitools.com/advanced-cypress-tutorial/chapter5.html
//? https://www.youtube.com/watch?v=dBrWox86vSY
//? https://www.youtube.com/watch?v=qcqlmwA1dog&t=65s
//? REFER cypress/e2e/advanced-examples/cookies.cy.js


/**================================================================================================
 *!   COOKIES RELATED METHODS AND ITS DEMO
 //*  cy.getCookie(name,options) - Get a browser cookie by its name.
 //*  cy.getCookies(options)  - Get browser cookies for the current domain or the specified domain.
 //*  cy.getAllCookies(options)  - Get all browser cookies.
 //*  cy.getAllLocalStorage(options) - Get localStorage data for all origins with which the test has interacted.
 //*  cy.getAllSessionStorage(options) - Get sessionStorage data for all origins with which the test has interacted.

 *================================================================================================**/

describe('Cookie demo- 1', () => {
    it('print a specific cookie', () => {

        cy.visit('https://demoqa.com/login');
        cy.get("#userName").type('test');
        cy.get("#password").type('Cypress@007');
        cy.get("#login").click({ force: true });
        cy.url().should('contain', 'profile');
        //get me value of a cookie named 'userID'
        cy.getCookie('userID').then((fetchedValue) => {
            //fetching value property as 'fetchedValue' itself is an object
            cy.log(fetchedValue.value);
        });

    });

    it('print all cookies', () => {

        cy.visit('https://demoqa.com/login');
        cy.get("#userName").type('test');
        cy.get("#password").type('Cypress@007');
        cy.get("#login").click({ force: true });
        cy.url().should('contain', 'profile');
        //get me name property of all cookies.
        cy.getCookies().then((fetchedValue) => {
            cy.wrap(fetchedValue).each(($cookie) => {
                cy.log($cookie.name);
            })
            cy.wrap(fetchedValue).its('length').should('be.greaterThan', 10);
        });
    });
});

describe('Cookie demo -2', () => {
    it('access all browser cookies from all cross/all domains', () => {
        cy.visit('https://demoqa.com/login');
        cy.get("#userName").type('test');
        cy.get("#password").type('Cypress@007');
        cy.get("#login").click({ force: true });
        cy.url().should('contain', 'profile');
        //get name of all cookies stored upto here.
        cy.getAllCookies().then((allCookies) => {
            cy.wrap(allCookies).each(($cookie) => {
                cy.log($cookie.name);
            })
        })
    });
});


describe('Local Storage demo - 1', () => {
    it('localStorage data for all origins with which the test has interacted. ', () => {
        cy.visit('https://react-redux.realworld.io/#/login');
        cy.get("input[placeholder='Email']").type('tinohi9276@xgh6.com');
        cy.get("input[placeholder='Password']").type('Cypress007');
        cy.get("button[type='submit']").click({ force: true });
        cy.url().should('not.contain', 'login');

        //verify local storage value contains key as 'jwt'
        cy.getAllLocalStorage().then((alldata) => {
            //? https://medium.com/building-ibotta/testing-arrays-and-objects-with-chai-js-4b372310fe6d
            expect(alldata['https://react-redux.realworld.io']).to.have.property('jwt');
            expect(alldata['https://react-redux.realworld.io']['jwt']).to.have.length.greaterThan(5);
            expect(alldata['https://react-redux.realworld.io']['jwt']).to.not.empty;

        })
    });
});

describe('Session storage demo -1', () => {
    it('Get sessionStorage data for all origins with which the test has interacted.', () => {

        cy.visit('https://www.section.io/engineering-education/how-and-when-to-apply-session-storage-with-javascript/');
        //play with session storage
        cy.getAllSessionStorage().then((allData) => {
            let tempObj = allData['https://www.youtube.com'];
            for (const key in tempObj) {
                cy.log(`${key}-----${tempObj[key]}`)
            }
        })

    });
});