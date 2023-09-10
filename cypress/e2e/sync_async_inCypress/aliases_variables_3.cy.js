
//! Understanding nested closures.
//! Variables
//! Alias - as()
//! Sharing context between tests at different levels.


describe('Nested closures + variables', () => {
    it('NESTED CLOSURES + using variables', () => {

        cy.visit('https://artoftesting.com/samplesiteforselenium');

        // first then()

        cy.get('#idOfButton').then(($el) => {

            // second then()

            cy.wrap($el).invoke('css', 'background-color').then((fetchedStyle) => {

                //fetch color of '#idOfButton' and assign to a variable.

                const initialColor = fetchedStyle;
                cy.log(`initial color of button is ${initialColor}`);
                expect(typeof initialColor).to.be.equal('string');

                //then click on button -> color will change->then assert color before & after.

                cy.wrap($el).click();

                // third then()

                cy.wrap($el).invoke('css', 'background-color').then((fetchedStyleAfterClick) => {

                    const afterColor = fetchedStyleAfterClick;
                    cy.log(`After click color of button is ${fetchedStyleAfterClick}`);
                    expect(typeof initialColor).to.be.equal('string');

                    expect(initialColor).not.to.be.eql(afterColor);

                })

            })
        })
    });

});

//! Using alias 

//? https://docs.cypress.io/guides/core-concepts/variables-and-aliases#Aliases

describe('Usecases of alias', () => {

    it('1. referencing DOM elements', () => {

        cy.visit('http://omayo.blogspot.com/');

        //setting alias
        cy.get('#HTML11 div:nth-of-type(1) textarea').as('txtBoxWithPrefilledData');

        //using alias
        cy.get('@txtBoxWithPrefilledData').then(($el) => {
            cy.log($el.text());
        })
    });

    beforeEach(() => {
        //setting alias
        cy.wrap('Selenium WebDriver').as('expectedValue');
    });

    //? https://docs.cypress.io/guides/core-concepts/variables-and-aliases#Aliases-are-reset-before-each-test

    it('2. WAY 1:  sharing context between hooks & its(s) :: using \'this\' context', () => {

        cy.visit('http://omayo.blogspot.com/');
        cy.get('#HTML4 div:nth-of-type(1) input')
            .invoke('attr', 'value')

            // find value of 'value' attribute of '#HTML4 div:nth-of-type(1) input'
            //& then, assert from expected value sent from beforeEach() hook.

            //! 🍌🍌🍌 Not writing arrow function as can't access 'this' in arrow functions.
            .then(function (attrValue) {
                //! 🍌🍌🍌 accessing alias; using 'this'
                cy.log(this.expectedValue);
                expect(attrValue).to.be.eq(this.expectedValue);
            })


    });

    //? udemy course - Joan Esquivel Montero - Lecture 100
    it('2. WAY 2:  sharing context between hooks & it(s) :: NOT USING \'this\' context', () => {

        cy.visit('http://omayo.blogspot.com/');
        cy.get('#HTML4 div:nth-of-type(1) input')
            .invoke('attr', 'value')

            // find value of 'value' attribute of '#HTML4 div:nth-of-type(1) input'
            //& then, assert from expected value sent from beforeEach() hook.

            .then((attrValue) => {
                //! 🍌🍌🍌 accessing alias without 'this' is always done using cy.get()
                cy.get('@expectedValue').then((fetchedTextFromAliasFromBeforeEach) => {
                    cy.log(fetchedTextFromAliasFromBeforeEach);
                    expect(attrValue).to.be.eq(fetchedTextFromAliasFromBeforeEach);
                })
            })
    });

    //? udemy course - Joan Esquivel Montero - Lecture 107
    it('3. sharing context inside same it block', () => {

        //Make sure that two links have same text.

        cy.visit('http://omayo.blogspot.com/');

        //getting text from first link
        cy.get('#link1')
            .invoke('text').then((fetchedText) => {
                //wrapping text of link in alias so that it can be used outside of this then() block.
                cy.wrap(fetchedText).as('textFrom1stLink');
            })
        //getting text from second link and asserting with text from above.
        cy.get('#HTML27>div:first-child>a')
            .invoke('text').then((textFrom2ndLink) => {
                //bring here text deduced from 1st link- using alias
                cy.get('@textFrom1stLink').then((textFrom1stLink) => {
                    //asserting text from 1st link with text fetched from this link.
                    expect(textFrom1stLink).equal(textFrom2ndLink);
                })

            })

    });

    it('4. sharing context among different its blocks in same describe', () => {

        //? udemy course - Joan Esquivel Montero - Lecture 107
        
    });
});