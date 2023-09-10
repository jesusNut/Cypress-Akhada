

/**================================================================================================
 *!         USING MULTIPLE CONFIG FILES FOR ENVIRONMENT MANAGEMENT IN FRAMEWORK- CONFIGURATION API
 *================================================================================================**/

 //* let us, assume we have multiple environments like QA, stage, UAT , prod etc.
 //* We need to test our framework against all such envs.
 //* All environments are having different baseURLs as well as different data (username,password, etc.).

 //? https://docs.cypress.io/api/plugins/configuration-api#Switch-between-multiple-configuration-files
 //? https://youtu.be/zXzeaFYBXR8?t=800	
 //? Udemy : Gianni - section 57

 //! Solution: 

 //1. Create a folder -> cypress/MultipleConfigFiles and create JSON files.
 //2. Do changes in cypress.config.js. - related code starts with 🌈
 //3. While cypress run/open use flag like :: cypress run --env configFile=prod

describe.only('Using multiple config files', () => {
    it('demo', () => {
        cy.visit('/Contact-Us/contactus.html');
        cy.get("input[placeholder='First Name']").type(Cypress.env('first_name'));
        cy.get("input[placeholder='Last Name']").type(Cypress.env('last_name'));
        cy.get("input[placeholder='Email Address']").type(Cypress.env('email'));
        cy.get("textarea[placeholder='Comments']").type(Cypress.env('comment'));
        cy.get("input[value='SUBMIT']").click({force: true});
        cy.url().should('eq','http://www.webdriveruniversity.com/Contact-Us/contact-form-thank-you.html');
        
    });
});