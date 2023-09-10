

class Landing_PO {

    //page elements
    elements = {

        signin_lnk: "body > div:nth-child(1) > div:nth-child(1) > nav:nth-child(1) > div:nth-child(1) > ul:nth-child(2) > li:nth-child(2) > a:nth-child(1)",
        home_lnk: "nav[class='navbar navbar-light'] li:nth-child(1) a:nth-child(1)",
        signup_lnk: "body > div:nth-child(1) > div:nth-child(1) > nav:nth-child(1) > div:nth-child(1) > ul:nth-child(2) > li:nth-child(3) > a:nth-child(1)",
        header_txt: "body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > h1:nth-child(1)",
        subHeader_txt: "div[class='banner']>div[class='container']>p",
        sidebar_text: "body div[id='main'] div div div div div div p:nth-child(1)"


    }

    //page methods
    clickSignInLink() {
        cy.get(this.elements.signin_lnk).click({ force: true });
    }

    validateLandingPageTitle(expectedText) {
        cy.title().should('contain', expectedText);
    }

    validateHeaderText(expectedText) {
        cy.get(this.elements.header_txt).should('contain', expectedText);
    }

    validateSubHeaderText(expectedText) {
        cy.get(this.elements.subHeader_txt).should('contain', expectedText);
    }

    validateSideBarText(expectedText) {
        cy.get(this.elements.sidebar_text).should('contain', expectedText);
    }

}

export default Landing_PO;