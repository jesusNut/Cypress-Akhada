
//! JQUERY METHODS can be used on elements using:
//!-----------------------------------------------
//! invoke() OR
//! directly within then() block.

//! ## invoke() method takes JQUERY METHODS as its param.
//? https://www.tutorialsteacher.com/jquery/jquery-methods


//Scenarios covered:

//* Fetching and asserting TEXT() OF A DOM ELEMENT.
//* Fetching and asserting TEXT IN VALUE ATTRIBUTE of an input box/textarea.
//* Asserting if a DOM element contains a certain attribute.
//* Checking if a DOM element contains a certain attribute/property and its value.

describe('Fetching and asserting text in Value attribute of an inputbox/textarea.', () => {

    context('using invoke() method', () => {

        it('Input box + HAVE value attribute + Pre-entered text- invoke() method', () => {

            // Invoke the 'val' jquery function

            cy.visit('http://omayo.blogspot.com/#');
            cy.get('#rotb').invoke('val').then((myValue) => {
                cy.log(myValue);

            })
        });

        it('Input box + NO value attribute + entered text- invoke() method', () => {

            // Invoke the 'val' jquery function

            cy.visit('http://omayo.blogspot.com/#');
            cy.get("form[name='form1']>input[type='text']").type('Abhishek').invoke('val').then((myValue) => {
                cy.log(myValue);

            })
        });

        it('textarea + NO value attribute + pre-entered text- invoke() method', () => {

            // Invoke the 'val' jquery function

            cy.visit('http://omayo.blogspot.com/#');
            cy.get("div[id='HTML11'] textarea").invoke('val').then((myValue) => {

                cy.log(myValue);

            })

        });

    });

    context('using val() jquery method directly inside then()', () => {
        it('demo shwoing how to write val() jquery method directly inside then() ', () => {

            cy.visit('http://omayo.blogspot.com/#');
            cy.get('#rotb').then(($el) => {

                const myValue = $el.val();
                cy.log(myValue);

            })

        });

        //TODO :write the same for other secnarios
    });

    it('asserting text in Value field of an Input Box', () => {

        cy.visit('http://omayo.blogspot.com/#');
        cy.get('#rotb').should('have.value', 'ReadThisText');

    });

});

describe('Fetching and asserting text of a DOM element', () => {

    context('Way 1 - using text() jquery method directly in then()', () => {

        it('Fetching text value of a DOM element- example 1', () => {

            cy.visit('http://omayo.blogspot.com/#');
            cy.get('#HTML4').find('h2').then(($el) => {

                const fetchedText = $el.text();
                cy.log(fetchedText);

            })

        });

        it('Fetching text value of a DOM element- example 2', () => {

            cy.visit('http://omayo.blogspot.com/#');
            cy.get('#Text1').find('div').eq(0).then(($el) => {

                const fetchedText = $el.text();
                cy.log(fetchedText);

            })

        });

    });

    context('Way 2 - using invoke() method', () => {

        it('Fetching text value of a DOM element- using invoke()', () => {

            // Invoke the 'text' jquery function

            cy.visit('http://omayo.blogspot.com/#');
            cy.get('#HTML4').find('h2').invoke('text').then((fetchedText) => {
                cy.log(fetchedText);
            })

        });

        it('Fetching text value of a DOM element- using invoke()', () => {

            // Invoke the 'text' jquery function

            cy.visit('http://omayo.blogspot.com/#');
            cy.get('#HTML4').find('h2').invoke('text').then((fetchedText) => {
                cy.log(fetchedText);
            })

        });


    });

    it('Writing assertion for text of a DOM element', () => {

        cy.visit('http://omayo.blogspot.com/#');
        cy.get('#HTML4').find('h2').should('have.text', 'Text Box with Preloaded Text');
        cy.get('#HTML4').find('h2').invoke('text').should('contain', 'Text Box');
        cy.get('#HTML4').find('h2').invoke('text').should('have.length.greaterThan', 27);

    });

});

describe('Fetching and asserting DOM attributes/properties', () => {
    it('Fetching a property - invoke() method', () => {

        // Invoke the 'prop' jquery function
        //the 'Try it' button disables the 'My Button' button after 3 seconds.

        cy.visit("http://omayo.blogspot.com/#");
        cy.get('#HTML44').contains('Try it').click();
        cy.get('#HTML44').contains('My Button').invoke('prop', 'disabled').then((attrPropValue) => {

            cy.log(attrPropValue); //false

        })

        cy.wait(4000);

        cy.get('#HTML44').contains('My Button').invoke('prop', 'disabled').then((attrPropValue) => {

            cy.log(attrPropValue); //true

        })

    });

    it('Fetching a property - jquery method prop() directly in then()', () => {

        // Invoke the 'prop' jquery function directly
        //the 'Try it' button disables the 'My Button' button after 3 seconds.

        cy.visit("http://omayo.blogspot.com/#");
        cy.get('#HTML44').contains('Try it').click();
        cy.get('#HTML44').contains('My Button').then(($el) => {

            const attrPropValue = $el.prop('disabled');

            cy.log(attrPropValue); //false

        })

        cy.wait(4000);

        cy.get('#HTML44').contains('My Button').then(($el) => {

            const attrPropValue = $el.prop('disabled');

            cy.log(attrPropValue); //true

        })

    });

    it('Fetching an attribute - invoke() method', () => {

        // Invoke the 'attr' jquery function

        cy.visit("http://omayo.blogspot.com/#");
        cy.get('#LinkList1').contains('compendiumdev').invoke('attr', 'href').then((attrPropValue) => {

            cy.log(attrPropValue);

        })

    });

    it('Fetching an attribute - jquery method attr() directly in then()', () => {

        // Invoke the 'prop' jquery function directly
        //the 'Try it' button disables the 'My Button' button after 3 seconds.

        cy.visit("http://omayo.blogspot.com/#");
        cy.get('#HTML44').contains('Try it').click();
        cy.get('#LinkList1').contains('compendiumdev').then(($el) => {

            const attrPropValue = $el.attr('href')

            cy.log(attrPropValue);

        })

    });

    it('Asserting whether a property/attribute present', () => {

        cy.visit("https://www.ironspider.ca/forms/checkradio.htm");
        cy.get('.Example:nth-of-type(1)').find('input[value=red]')
            .should('have.prop', 'checked');
        cy.get('.Example:nth-of-type(1)').find('input[value=red]')
            .should('have.attr', 'type');

    });

    it('Asserting value of attribute/property', () => {

        cy.visit("https://www.ironspider.ca/forms/checkradio.htm");

        cy.get('.Example:nth-of-type(1)').find('input[value=red]')
            .should('have.prop', 'checked', false);
        cy.get('.Example:nth-of-type(1)').find('input[value=red]').check();
        cy.get('.Example:nth-of-type(1)').find('input[value=red]')
            .should('have.prop', 'checked', true);

        cy.get('.Example:nth-of-type(1)').find('input[value=red]')
            .should('have.attr', 'type', 'checkbox');

    });
});
