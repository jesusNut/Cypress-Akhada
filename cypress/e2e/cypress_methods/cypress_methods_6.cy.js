
//! cy.wrap() command

//! Yield the object passed into .wrap()

//*  Usecases discussed:

//!  1. Usage with DOM elements.
//!  2. Usage with functions.
//!  3. Usage with constants - string , numbers etc.

describe('Usecases of wrap() 1 & 2', () => {
    it('case-1- Usage with DOM elements', () => {

        cy.visit('http://omayo.blogspot.com/');
        cy.get('#LinkList1>div>ul>li').find('a').each(($el, index, list) => {

            if ($el.text() === 'jqueryui') {
                cy.wrap($el).click();
            }
        })
    });

    //a function

    const greetings = function () {
        return 'Welcome to the future- Neon Synthwave';
    }

    it('case-2- Usage with functions', () => {

        cy.visit('http://omayo.blogspot.com/');
        cy.get('#HTML11>div:nth-of-type(1)>textarea').then(($el) => {

            //print the pre-filled text
            cy.log($el.text());
            //clear the prefilled text
            cy.wrap($el).clear();
            //type the return value of function 'greetings'
            cy.wrap({ invokerMethodName: greetings }).invoke('invokerMethodName')
                .then((fetchedData) => {
                    cy.wrap($el).type(fetchedData);

                })
        })
    });

});

describe('Usecases of wrap() - 3', () => {

    beforeEach(() => {
        cy.wrap('abc').as('stringData');
        cy.wrap(parseInt('1234')).as('numericData');
    });

//! Not writing arrow function as can't access 'this' in arrow functions.

    it.only('case-3- Usage with constants', function() {

        cy.log(this.stringData);
        cy.log(this.numericData);
    });
});


