
//! click() and its assertions:


describe('click', () => {
    it.only('clicking a button with  class and background color assertions', () => {

        cy.visit("http://uitestingplayground.com/click");
        cy.get('#badButton').click().should('have.attr', 'class', 'btn btn-success')
            .and('have.css', 'background-color', 'rgb(40, 167, 69)');

        //in real time just check what properties check after clicking the button and assert accordingly.

    });
});

