
//? https://testautomationu.applitools.com/advanced-cypress-tutorial/chapter5.html

/**================================================================================================
 *!                     Manually setting cookies
 //* cy.setCookie() - https://docs.cypress.io/api/commands/setcookie
 *================================================================================================**/

describe('set cookie demo', () => {
    it('example', () => {
        cy.visit('https://demoqa.com/login');
        cy.get("#userName").type('test');
        cy.get("#password").type('Cypress@007');
        cy.get("#login").click({ force: true });
        cy.url().should('contain', 'profile');
        cy.setCookie('voter', 'dmk');
        //assert the cookie set above
        cy.getCookie('voter').should('exist');
        cy.getCookie('voter').its('value').should('eq', 'dmk');
    });
});

/**================================================================================================
 *!                     Manually deleting cookies
 //* cy.clearCookie(name,options)
 //* cy.clearCookies(options) 
 //* cy.clearAllCookies(options)

 //! Cypress automatically clears all cookies before each test to prevent state from being shared
 //! across tests when test isolation is enabled.
 //! You shouldn't need to use this command unless you're using it to clear specific cookies inside a single test or test isolation is disabled.
 
 //? https://www.browserstack.com/guide/cypress-clear-cookies-command
 *================================================================================================**/

describe('clearCookie with name', () => {
    it('example', () => {
        cy.visit('https://demoqa.com/login');
        cy.get("#userName").type('test');
        cy.get("#password").type('Cypress@007');
        cy.get("#login").click({ force: true });
        cy.url().should('contain', 'profile');
        cy.setCookie('voter', 'dmk');
        //print & assert the cookie & its length
        cy.getCookie('voter').should('exist');
        cy.getCookies().its('length').then(cy.log);
        //delete cookie
        cy.clearCookie('voter');
        //print the cookie length again
        cy.getCookie('voter').should('not.exist');
        cy.getCookies().its('length').then(cy.log);
    });
});

describe('clear ALL Cookies in that domain', () => {
    it('example', () => {
        cy.visit('https://demoqa.com/login');
        cy.get("#userName").type('test');
        cy.get("#password").type('Cypress@007');
        cy.get("#login").click({ force: true });
        cy.url().should('contain', 'profile');
        //print the cookie length
        cy.getCookies().its('length').then(cy.log);
        //delete all cookies
        cy.clearAllCookies();
        //print the cookie length again
        cy.getCookies().its('length').then(cy.log); //this should be 0 now
    });
});

describe('clear ALL Cookies in all domains', () => {
    it('example', () => {
        cy.visit('https://demoqa.com/login');
        cy.get("#userName").type('test');
        cy.get("#password").type('Cypress@007');
        cy.get("#login").click({ force: true });
        cy.url().should('contain', 'profile');
        //print the cookie length
        cy.getAllCookies().its('length').then(cy.log);
        //delete all cookies
        cy.clearAllCookies();
        //print the cookie length again
        cy.getAllCookies().its('length').then(cy.log); 
    });
});


/**================================================================================================
 *todo            PRESERVING COOKIES BETWEEN TESTS
 *================================================================================================**/

 //? https://testautomationu.applitools.com/advanced-cypress-tutorial/chapter5.html


 /**================================================================================================
  //!                      DELETING STORAGE      
  
  //* cy.clearAllLocalStorage()
  //* cy.clearAllSessionStorage()
  
  *================================================================================================**/

  //? REFER : REFER cypress/e2e/advanced-examples/storage.cy.js
  //? https://docs.cypress.io/api/commands/clearalllocalstorage
  //? https://docs.cypress.io/api/commands/clearallsessionstorage