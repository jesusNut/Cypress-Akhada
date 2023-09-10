
/**================================================================================================
 *!                                        CYPRESS ENV VRAIBALES
 *================================================================================================**/

//*  In Cypress, "environment variables" are variables that are accessible via Cypress.env(). 
//*  These are not the same as OS-level environment variables. 

//* Full details:
//? https://docs.cypress.io/guides/guides/environment-variables

//* Same env var. passed using terminal will override its value provided in cypress.config.js/ts file.


describe('Using a env var set at global level', () => {
    it('accessing env var', () => {

        cy.visit('https://www.webdriveruniversity.com/Contact-Us/contactus.html');

        //🍌🍌🍌 access env var using Cypress.env()
        cy.get("input[placeholder='First Name']").type(Cypress.env('first_name')) //mohanti
        cy.get("input[placeholder='Last Name']").type(Cypress.env('last_name')) //jayati
        cy.get("input[placeholder='Email Address']").type(Cypress.env('email')) //mohanti.jayati@googl.com
        cy.get("textarea[placeholder='Comments']").type(Cypress.env('comment')) //Please give me a soul
        cy.get("input[value='SUBMIT']").click();
        
    });
});

describe('Using a env var set at global level + overriden by env var passed form terminal', () => {
    it('accessing env var', () => {

        cy.visit('https://www.webdriveruniversity.com/Contact-Us/contactus.html');

        //🍌🍌🍌 access env var using Cypress.env()
        cy.get("input[placeholder='First Name']").type(Cypress.env('first_name')) 
        //! muluk : env var value sent from terminal,overrides value sent from cypress.config.js i.e. Mohanti
        cy.get("input[placeholder='Last Name']").type(Cypress.env('last_name')) //jayati
        cy.get("input[placeholder='Email Address']").type(Cypress.env('email')) //mohanti.jayati@googl.com
        cy.get("textarea[placeholder='Comments']").type(Cypress.env('comment')) //Please give me a soul
        cy.get("input[value='SUBMIT']").click();
        
    });
});

//*   command used via terminal:
//*-----------------------------

//  npx cypress run --browser electron
// --spec cypress\e2e\cypress-configuration\cypress_env_variables.cy.js
// --headed --env first_name=Muluk