

//! Handling Child Tabs.

describe('Handling Child tabs', () => {
    it('Approach 1: Open the new URL in same window by removing attribue \'target="_blank"\'', () => {

        cy.visit('https://the-internet.herokuapp.com/windows');
        cy.get("a[href='/windows/new']").invoke('removeAttr', 'target').then(($el) => {
            cy.wrap($el).click();
        })

        //validate message on new page.
        cy.get("div[class='example'] h3").should('have.text','New Window');
    });
});


//One more way:
//? https://www.youtube.com/watch?v=C2DjGl5a_-Y&list=PLMZdod-kiMhKiRztQX_rng7EfcI5OteMR&index=11 