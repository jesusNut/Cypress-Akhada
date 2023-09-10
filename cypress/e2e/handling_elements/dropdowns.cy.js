
//! selecting a static drop downs implemented via select tag:
//! select() method : Select an <option> within a <select>.
// .select(value)
// .select(values)
// .select(value, options)
// .select(values, options) where

//  value (String, Number)
// The value, index, or text content of the <option> to be selected.

// values (Array)
// An array of values, indexes, or text contents of the <option>s to be selected.

//! selecting suggestive dropdowns.

describe('selecting a static drop downs implemented via select tag', () => {
    it('Single select- using value attribute, index and text content', () => {

        cy.visit('http://www.webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html');

        cy.get('#dropdowm-menu-1').select(2).should('have.value', 'python'); //used index
        cy.get('#dropdowm-menu-2').select('JUnit').should('have.value', 'junit'); //used text content
        cy.get('#dropdowm-menu-3').select('javascript').should('have.value', 'javascript'); //used value attribute

    });

    it('Multi select -using value attribute, index and text content', () => {

        cy.visit('http://omayo.blogspot.com/');
        cy.get('#HTML14 select').select([1, 3]).invoke('val').should('deep.equal', ['swiftx', 'audix']);

        cy.reload();
        cy.get('#HTML14 select').select(['swiftx', 'audix']).invoke('val').should('deep.equal', ['swiftx', 'audix']);

        cy.reload();
        cy.get('#HTML14 select').select(['Swift', 'Audi']).invoke('val').should('deep.equal', ['swiftx', 'audix']);



    });

});

describe('selecting bootstrap dropdown', () => {

    it('demo-1', () => {

        cy.visit('https://www.dummyticket.com/dummy-ticket-for-visa-application/');

        //initial value set is ''. So, validate it.
        cy.get('#select2-reasondummy-container')
            .invoke('prop', 'title')
            .should('eq', 'Visa application');

        cy.get("#reasondummy_field span[role='combobox']>span[role='presentation']").click();

        //set dropdown value
        cy.get("input[role='combobox']").type('Office').type('{enter}');

        //assert
        cy.get('#select2-reasondummy-container')
            .invoke('prop', 'title')
            .should('eq', 'Office work place needs it');

    });

});

describe('suggestive dropdown', () => {

    it('sample demo-1', () => {

        cy.visit('https://www.wikipedia.org/');

        cy.get('#searchInput').type('abhishek');
        cy.get('#typeahead-suggestions>div a h3').each(($el, index, list) => {

            if ($el.text().includes('Bachchan film')) {
                cy.wrap($el).click();
            }
        })
    });

    it('google search demo', () => {

        cy.visit('https://www.google.co.in/');

        cy.get('#APjFqb').type('chandu');
        cy.wait(3000);
        cy.get('#Alh6id ul li>div>div:nth-of-type(2)>div>div>span:nth-of-type(1)').each(($el, index, list) => {

            if ($el.text() === 'Chandu Gowda') {
                cy.wrap($el).click();
            }
        })
    });
});
