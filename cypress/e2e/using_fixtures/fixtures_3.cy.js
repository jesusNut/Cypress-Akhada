
//? https://www.youtube.com/watch?v=rEJFrj2mZdc&t=738s


//! 🔥🔥🔥 Handling multiple scenarios (using iteration) writing single code block


describe('demo -6 : Iterate over an array of JSON objects', () => {

    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/v1/');
    });

    //using forEach() to iterate over JSON objects
    cy.fi.forEach(jsonobj => {

        it(`scenario -name :: ${jsonobj.scenario}`, function () {
            cy.get('#user-name').as('username').should('be.visible');
            cy.get('#password').as('password').should('be.visible');
            cy.get('@username').type(jsonobj.username);
            cy.get('@password').type(jsonobj.password);
            cy.get('#login-button').should('be.visible').click();
            //assert after successful/unsuccessful login

            if (String(jsonobj.scenario) === 'valid login') {
                cy.get('.product_label').should('have.text', 'Products');
            }

            if (String(jsonobj.scenario) === 'locked out user login') {
                cy.get("[data-test='error']").invoke('text').should('contain', 'locked out.');
            }

            if (String(jsonobj.scenario) === 'only username login') {
                cy.get("[data-test='error']").invoke('text').should('contain', 'Password is required');
            }
        });
    })
});

