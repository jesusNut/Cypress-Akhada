
//! visiting a url - visit()
//! fetching current title - title()
//! fetching current url - url()

describe('sample test suite', () => {
    it('visiting a url', () => {

        cy.visit('http://www.webdriveruniversity.com/Contact-Us/contactus.html')

    });

    it('fetching title and current url', () => {

        cy.visit('http://www.webdriveruniversity.com/Contact-Us/contactus.html');
        cy.get("input[type='submit']").click();
        cy.title().should('eq', 'Contact form handler');
        cy.title().its('length').should('be.greaterThan', 16);
        //other way without its() method
        //cy.title().should('have.length.greaterThan',18);
        cy.url().should('include', 'Contact');
        cy.url().should('contain','contact'); //contact is alias of include

    });


});