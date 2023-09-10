

class Login_PO {

    elements = {
        signin_lnk: "body > div:nth-child(1) > div:nth-child(1) > nav:nth-child(1) > div:nth-child(1) > ul:nth-child(2) > li:nth-child(2) > a:nth-child(1)",
        home_lnk: "nav[class='navbar navbar-light'] li:nth-child(1) a:nth-child(1)",
        signup_lnk: "body > div:nth-child(1) > div:nth-child(1) > nav:nth-child(1) > div:nth-child(1) > ul:nth-child(2) > li:nth-child(3) > a:nth-child(1)",
        email_input: "input[placeholder='Email']",
        password_input: "input[placeholder='Password']",
        signin_btn: "button[type='submit']",
        errorMessage_holder: ".error-messages > li"
    };

    //getters - This will enable a user to directly use cypress functions like type/click etc in tests.
    //It helps user to use fixture concept in tests.

    get getEmailInputBox() {
        return cy.get(this.elements.email_input);
    }

    get getPasswordInputBox() {
        return cy.get(this.elements.password_input);
    }

    get getSigninButton() {
        return cy.get(this.elements.signin_btn);
    }

    //page methods

    //this will allow a user to login directly in one go (contarary to what getters do).
    signInToApplication(email, password) {
        cy.get(this.elements.email_input).type(email);
        cy.get(this.elements.password_input).type(password);
        cy.get(this.elements.signin_btn).click({ force: true });
        cy.url().should('not.contain','login');
    }

    validateURLText(expectedText) {
        cy.url().should('contain', expectedText);
    }

    validateErrorText(expectedData) {
        cy.get(this.elements.errorMessage_holder).invoke('text').then((data)=>{
            expect(data).to.eq(expectedData);
        })
    }

}

export default Login_PO;