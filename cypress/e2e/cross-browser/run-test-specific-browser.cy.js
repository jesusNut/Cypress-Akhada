//? https://docs.cypress.io/guides/guides/cross-browser-testing#Running-Specific-Tests-by-Browser
//? https://docs.cypress.io/api/cypress-api/isbrowser#Arguments
//? https://docs.cypress.io/api/cypress-api/isbrowser

/**================================================================================================
 *!               Configuring Tests to run on a specific browser only
 *================================================================================================**/
import Landing_PO from '../../pageObjects/conduit/landing_PO';
import Login_PO from '../../pageObjects/conduit/login_PO';
import Home_PO from '../../pageObjects/conduit/home_PO';


describe('Conduit app - login page tests', function () {

    const landingPage = new Landing_PO();
    const loginPage = new Login_PO();
    const homePage = new Home_PO;

    beforeEach(() => {
        cy.fixture('conduit_fixtures_files/login.json').as('testData');
        cy.navigateToFrameworkUrl(); //custom command in cypress/support/commands.js
    });

    //!  👻 👻 👻 We want to run this test be it any browser.

    it('Validate url contains text \'login\' on Signin(Login) page.', () => {
        landingPage.clickSignInLink();
        loginPage.validateURLText('login');
    });


    //! 🎯🎯🎯 We want to run this test only in Chrome.
    //! Beware that the beforeEach/before block if any for this test WILL GET EXECUTED.

    it('Validate successful login- HAPPY PATH', function () {
        //🍌🍌🍌 code 🍌🍌🍌
        if (Cypress.isBrowser('chrome')) {
            landingPage.clickSignInLink();
            loginPage.signInToApplication(this.testData.validUsername, this.testData.validPassword);
            homePage.checkIfUserLinkVisible();
        }
    });
});
