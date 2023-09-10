

/**================================================================================================
 *!                                CYPRESS RETRY FAILED TEST CASES
 *================================================================================================**/

 //* By default, tests will not retry when they fail wheter run using 'cypress open' or 'cypress run'.

//* Once test retries are enabled, tests can be configured to have X number of retry attempts.
//* For example, if test retries has been configured with 2 retry attempts, Cypress will retry tests up to 2 additional times
//* (FOR A TOTAL OF 3 ATTEMPTS) before potentially being marked as a failed test.

//* HOW IT WORKS?
//? https://docs.cypress.io/guides/guides/test-retries#How-It-Works

//* Retries can be configured at 2 levels:

//1. Global level on cypress.config.js file.
//2. On test case or test suite level (as 2nd args of describe/it block)

//* Typically you will want to define different retry attempts for cypress run versus cypress open. You can configure this in the Cypress configuration by passing the retries option an object with the following options:

//! "runMode" allows you to define the number of test retries when running cypress run
//! "openMode" allows you to define the number of test retries when running cypress open


/**================================================================================================
 *todo###                                DEMO
 *================================================================================================**/

//* Refer::  Global level/framework level on cypress.config.js file.

//* On test case or test suite level (as 2nd args of describe/it block)

describe('Tests retry on global/framework level', () => {

    //make sure to add 'retries' config in cypress.config.js.
    it('born to fail -1', () => {

        cy.visit('https://www.webdriveruniversity.com/Contact-Us/contactus.html');
        cy.get("input[placeholder='First Name']").type('Mohak')
        cy.get("input[placeholder='Last Name']").type('Mangal')
        cy.get("input[placeholder='Email Address']").type('Mohak.Mangal@zhootube.com')
        cy.get("textarea[placeholder='Comments']").type('Abhishek is always the best!!!')
        cy.get("input[value='SUBMI']").click();
        
    });
    it('born to fail -2', () => {

        cy.visit('https://www.webdriveruniversity.com/Contact-Us/contactus.html');
        cy.get("input[placeholder='First Name']").type('Mohak')
        cy.get("input[placeholder='Last Name']").type('Mangal')
        cy.get("input[placeholder='Email Address']").type('Mohak.Mangal@zhootube.com')
        cy.get("textarea[placeholder='Comments']").type('Abhishek is always the best!!!')
        cy.get("input[value='SUBMI']").click();
        
    });
    it('born to pass', () => {

        cy.visit('https://www.webdriveruniversity.com/Contact-Us/contactus.html');
        cy.get("input[placeholder='First Name']").type('Mohak')
        cy.get("input[placeholder='Last Name']").type('Mangal')
        cy.get("input[placeholder='Email Address']").type('Mohak.Mangal@zhootube.com')
        cy.get("textarea[placeholder='Comments']").type('Abhishek is always the best!!!')
        cy.get("input[value='SUBMIT']").click();
        
    });
});

describe('Tests retry on test suite level',{
    "retries": {
      // Configure retry attempts for `cypress run`
      // Default is 0
      "runMode": 2,
      // Configure retry attempts for `cypress open`
      // Default is 0
      "openMode": 1
    }
  },() => {
    it('born to fail- 1', () => {

        cy.visit('https://www.webdriveruniversity.com/Contact-Us/contactus.html');
        cy.get("input[placeholder='First Name']").type('Mohak')
        cy.get("input[placeholder='Last Name']").type('Mangal')
        cy.get("input[placeholder='Email Address']").type('Mohak.Mangal@zhootube.com')
        cy.get("textarea[placeholder='Comments']").type('Abhishek is always the best!!!')
        cy.get("input[value='SUBMI']").click();
        
    });

    it('born to fail- 2', () => {

        cy.visit('https://www.webdriveruniversity.com/Contact-Us/contactus.html');
        cy.get("input[placeholder='First Name']").type('Mohak')
        cy.get("input[placeholder='Last Name']").type('Mangal')
        cy.get("input[placeholder='Email Address']").type('Mohak.Mangal@zhootube.com')
        cy.get("textarea[placeholder='Comments']").type('Abhishek is always the best!!!')
        cy.get("input[value='SUBMI']").click();
        
    });
});

describe('Tests retry on test case level', () => {
    it('born to fail-1',{
        "retries": {
          // Configure retry attempts for `cypress run`
          // Default is 0
          "runMode": 1,
          // Configure retry attempts for `cypress open`
          // Default is 0
          "openMode": 1
        }
      }, () => {
        cy.visit('https://www.webdriveruniversity.com/Contact-Us/contactus.html');
        cy.get("input[placeholder='First Name']").type('Mohak')
        cy.get("input[placeholder='Last Name']").type('Mangal')
        cy.get("input[placeholder='Email Address']").type('Mohak.Mangal@zhootube.com')
        cy.get("textarea[placeholder='Comments']").type('Abhishek is always the best!!!')
        cy.get("input[value='SUBMI']").click();
        
    });
});