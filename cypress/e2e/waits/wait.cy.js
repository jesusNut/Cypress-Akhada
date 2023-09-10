

//! Cypress wait() command is used to explicity wait for certain time.

//! Cyress wit() command is an anti-pattern

describe('wait command', () => {
    it('USECASE 1: used to explicity wait for sometime', () => {

        cy.visit('http://uitestingplayground.com/clientdelay');
        cy.get('#ajaxButton').click();
        cy.wait(15000);
        cy.get('#content>p').contains('Data calculated');

    });

    it('USECASE 2: used to explicity wait for some element', () => {

        //?https://docs.cypress.io/api/commands/wait#Alias

    });
});