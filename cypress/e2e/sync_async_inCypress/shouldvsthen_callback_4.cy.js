

//! When to use should() will callback?

//? https://testautomationu.applitools.com/advanced-cypress-tutorial/chapter3.html

//* When ever we have to work on ONLY ASSERTIONS, we should use should() with callback.
//! If any cypress command other than assertion is used inside callback of should(), error will be thrown.

// When using a callback function with .should() or .and(), there is special
// logic to rerun the callback function until no assertions throw within it. You should be careful of side affects in a .should() 
// or .and() callback function that you would not want performed multiple times.
describe('should with callback', () => {

    it('✅ approprate place to use - only assertons rquired inside callback', () => {

        cy.visit('http://uitestingplayground.com/clientdelay');
        cy.get('#ajaxButton').click();

        cy.get('#content>p', { timeout: 20000 }).should(($eq) => {
            // The ".should(cb)" function will be retried
            // automatically until it passes all your explicit assertions or times out.
            //assertion-1
            expect($eq.length).is.eq(1);
            //assertion-2
            const fetchedText = $eq.text();
            expect(fetchedText).to.contain('calculated');
            //assertion-3
            expect($eq).to.have.class('bg-success');
        })
    });

    it.only('🚨 inapproprite place to use - where any cypress command other than assertion is used', () => {

        cy.visit('http://omayo.blogspot.com/');
        cy.get('#HTML26>div:nth-of-type(1)>ul>li').should(($eq) => {

            //assertion-1
            expect($eq.length).to.equal(6);
            //code other than assertion - this creates issue.
            cy.wrap($eq).first().should('contain', 'Apple');

            //! GOT ERROR:
            // 🚨CypressError
            // cy.should() failed because you invoked a command inside the callback. 
            // cy.should() retries the inner function, which would result in commands being added to the queue multiple
            // times. Use cy.then() instead of cy.should(), or move any commands outside the callback function.
            // The command invoked was:
            //  > cy.wrap()
        })
    });
});