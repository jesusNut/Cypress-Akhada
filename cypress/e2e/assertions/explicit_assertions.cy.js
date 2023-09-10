
//* Explicit Assertions are done using:
//! expect()
//! assert()


describe('writing explicit assertions', () => {
    it.only('using Chai- expect()', () => {

        cy.visit('http://omayo.blogspot.com/#');
        cy.get('#HTML4').find('h2').then(($el) => {

            expect($el.text()).to.equal('Text Box with Preloaded Text');
            //other way to write above assertion:
            expect($el).to.have.text('Text Box with Preloaded Text');

            expect($el.text()).to.contain('Text Box');
            //other way to write above assertion:
            expect($el).to.contain.text('Text Box');
            expect($el).to.include.text('Text Box');

            expect($el.text()).to.have.length.greaterThan(27);
            //other way to write above assertion:
            expect($el.text().length).be.greaterThan(27);

        })
    });

    it('using Chai- assert()', () => {

        cy.visit('http://omayo.blogspot.com/#');
        cy.get('#HTML4').find('h2').then(($el) => {

            assert.equal($el.text(),'Text Box with Preloaded Text');
            assert.include($el.text(),'Text');
            assert.isAbove($el.text().length,27);
        })
    });
});