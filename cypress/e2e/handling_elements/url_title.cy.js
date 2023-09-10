//! handling current url and title with assertions.


describe('handling url and title with assertions', () => {
    it('handling title', () => {

        cy.visit('http://omayo.blogspot.com/');
        cy.title().should('eq', 'omayo (QAFox.com)')
            .and('have.length.greaterThan', 16)
            .and('include', 'QAFox')
            .and('contain','QA'); //alias of include()

    });

    it('handling url', () => {

        cy.visit('http://omayo.blogspot.com/');
        cy.url().should('eq','http://omayo.blogspot.com/')
            .and('have.length.greaterThan', 5)
            .and('include', 'omayo')
            .and('contain','http'); //alias of include()

    });


});