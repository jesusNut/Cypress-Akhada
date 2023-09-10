

/**================================================================================================
 *!                                       SETTING BASE URL
 *================================================================================================**/

//? https://www.youtube.com/watch?v=f5UaXuAc52c
//? https://docs.cypress.io/guides/references/best-practices#Setting-a-Global-baseUrl
//? https://docs.cypress.io/guides/references/best-practices#Setting-a-Global-baseUrl

//! Setting at spec file level

//Cypress.config('baseUrl', 'https://google.co.in');

//! Setting at test suite/case level

describe('setting spec file at test suite level',
    { baseUrl: 'https://www.webdriveruniversity.com/' },
    () => {
        it('demo', () => {
            cy.visit('/');
        });
    });

describe('setting spec file at test case level', () => {
    it('demo',
        { baseUrl: 'https://www.webdriveruniversity.com/' }, () => {
            cy.visit('/');
        });
});

/**================================================================================================
 *!                                        BEST PRACTICES
 *================================================================================================**/

// * Using 'baseUrl'
// Environment variables are great at pointing to external services and servers, or storing password or other credentials.

// ! HOWEVER, YOU SHOULD NOT USE ENVIRONMENT VARIABLES TO POINT TO THE ORIGIN AND DOMAIN UNDER TEST.

//todo###     USE BASEURL INSTEAD OF ENVIRONMENT VARIABLES.

// cy.visit() and cy.request() are automatically prefixed with this value - avoiding the need to specify them.

// baseUrl can be set in the Cypress configuration file - and then you can set an environment variable
// in your OS to override it like shown below.

// CYPRESS_BASE_URL=https://staging.app.com cypress run

/**================================================================================================
 *!                                   USING DYNAMIC BASE URLs
 *================================================================================================**/

 //* We can set a base url in cypress.config.js file and utilize it in cypress\support\commands.js file to create custom commands
 //* && concept of env variable to support dynamic/multiple URls.
 
 //? Udemy : 191-193 - Gianni Bruno

