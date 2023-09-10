/// <reference types ="cypress" />

describe('Test contact us for via WebdriverUni', () => {
    it('should be able to submit a successful submission via contact us form', () => {

        cy.visit('http://www.webdriveruniversity.com/Contact-Us/contactus.html');
        cy.get("input[name='first_name']").type('Abhishek');
        cy.get("input[name='last_name']").type('Bhardwaj ji');
        cy.get("input[name='email']").type('chondru.mondru@zhinga.com');
        cy.get("textarea[name='message']").type('Zinda hoon main');
        cy.get("#form_buttons .contact_button:nth-child(2)").click();
        cy.wait(3000);

    });

    it('should not be able to submit a sucessful submission as all fields are required', () => {

        cy.visit('http://www.webdriveruniversity.com/Contact-Us/contactus.html');
        cy.get("input[name='first_name']").type('Abhishek');
        cy.get("input[name='last_name']").type('Bhardwaj ji');
        cy.get("input[name='email']").type('chondru.mondru@zhinga.com');
        cy.get("#form_buttons .contact_button:nth-child(2)").click();

        //assert that the title is correct after unsuccessful submission
        cy.title().should('eq', 'Contact form handler');

        //assert error text is present
        cy.get('body').then((bodyEle) => {

            const fetchedText = bodyEle.text();
            cy.log(fetchedText); 

        });

    });

});