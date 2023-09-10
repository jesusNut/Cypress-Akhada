import Landing_PO from '../../pageObjects/conduit/landing_PO';    
import Login_PO from '../../pageObjects/conduit/login_PO';
import Home_PO from '../../pageObjects/conduit/home_PO';


describe('Conduit app - login page tests', function() {

    const landingPage = new Landing_PO();
    const loginPage = new Login_PO();
    const homePage = new Home_PO;

    beforeEach(() => {
        cy.fixture('conduit_fixtures_files/login.json').as('testData');
        cy.navigateToFrameworkUrl(); //custom command in cypress/support/commands.js
    });

    it('Validate url contains text \'login\' on Signin(Login) page.', () => {
        landingPage.clickSignInLink();
        loginPage.validateURLText('login');
    });

    it('Validate error text while login with only email', function (){
        landingPage.clickSignInLink();
        loginPage.getEmailInputBox.type(this.testData.validUsername);
        loginPage.getSigninButton.click();
        loginPage.validateErrorText("password can't be blank");
    });

    it('Validate error text while login with only password', function (){
        landingPage.clickSignInLink();
        loginPage.getPasswordInputBox.type(this.testData.validPassword);
        loginPage.getSigninButton.click();
        loginPage.validateErrorText("email can't be blank");
    });

    it('Validate error text while login with INVALID password', function (){
        landingPage.clickSignInLink();
        loginPage.getEmailInputBox.type(this.testData.validUsername);
        loginPage.getPasswordInputBox.type(this.testData.invalidPassword);
        loginPage.getSigninButton.click();
        loginPage.validateErrorText("email or password is invalid");
    });

    it('Validate successful login- HAPPY PATH', function (){
        landingPage.clickSignInLink();
        loginPage.signInToApplication(this.testData.validUsername,this.testData.validPassword);
        homePage.checkIfUserLinkVisible();
    });
});
