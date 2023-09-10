//! Check checkbox(es) or radio(s).

//! This element must be an <input> with type checkbox or radio.


describe('Handling checkboxes', () => {
    it('Handling a single checkbox and verify', () => {

        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');

        cy.get('#checkBoxOption1').should('not.be.checked');
        cy.get('#checkBoxOption1').check().should('be.checked');
    });

    it('Handling a single checkbox using value attribute and verify', () => {

        cy.visit('http://www.webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html');

        cy.get('#checkboxes>label>input').check('option-2').should('be.checked');

    });

    it('Handling multiple checkboxes and verify', () => {

        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');

        cy.get('#checkbox-example>fieldset>label>input')
            .should('not.be.checked');
        cy.get('#checkbox-example>fieldset>label>input').check()
            .should('be.checked');


    });

    it('Handling multiple checkboxes with value attribute and verify', () => {

        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');

        cy.get('#checkbox-example>fieldset>label>input').check(['option1', 'option2'])
            .should('be.checked'); //only the checkboxes with option1 and option2 will be asserted.

    });

    it('Uncheck a single checkbox without value attribute', () => {

        cy.visit('http://www.webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html');

        cy.get('#checkboxes>label:nth-of-type(3)>input').should('be.checked');
        cy.get('#checkboxes>label:nth-of-type(3)>input').uncheck()
            .should('not.be.checked');

    });

    it('Uncheck a single checkbox with value attribute', () => {

        cy.visit('http://www.webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html');

        cy.get('#checkboxes>label>input').uncheck('option-3')
            .should('not.be.checked');

    });

    it('check a disabled checkbox', () => {

        //approach -1

        cy.visit('http://omayo.blogspot.com/');
        cy.get('#dte').as('disabledCheckBox').should('have.attr', 'disabled');
        cy.get('#HTML47>div>button').click();
        cy.get('@disabledCheckBox').check({ timeout: 11000 }).should('be.checked')
            .and('have.attr', 'disabled');

        //approach-2

        //  cy.visit('http://omayo.blogspot.com/');
        //  cy.get('#dte').as('disabledCheckBox').should('have.attr', 'disabled');
        //  cy.get('@disabledCheckBox').check({force: true}).should('be.checked');

    });


});

describe('Handling radio buttons', () => {
    it('Handling radio button without value attribute and verify', () => {

        cy.visit('http://www.webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html');

        cy.get("#radio-buttons>input[value='yellow']").as('radioButton-yellow')
        cy.get('@radioButton-yellow').should('not.be.checked');
        cy.get('@radioButton-yellow').check().should('be.checked');
    });

    it('Handling radio button with value attribute and verify', () => {

        cy.visit('http://www.webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html');

        cy.get("#radio-buttons>input").as('listOfRadioButtns')
        cy.get('@listOfRadioButtns').check('yellow').should('be.checked');
    });

    it('Unselect a radio button and verify', () => {

        cy.visit('http://www.webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html');

        //unselecting a radio button means selecting an other option in list of radio buttons

        cy.get("#radio-buttons-selected-disabled>input[value='pumpkin']").as('radioButton-pumpkin');
        cy.get("#radio-buttons-selected-disabled>input[value='lettuce']").as('radioButton-lettuce');

        cy.get('@radioButton-pumpkin').should('be.checked');
        cy.get('@radioButton-lettuce').check().should('be.checked');
        cy.get('@radioButton-pumpkin').should('not.be.checked');

        cy.get('@radioButton-pumpkin').check().should('be.checked');
        cy.get('@radioButton-lettuce').should('not.be.checked');

    });

    it.only('Handling a disabled radio button', () => {

        cy.visit('http://www.webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html');

        //unselecting a radio button means selecting an other option in list of radio buttons

        cy.get("#radio-buttons-selected-disabled>input[value='cabbage']").as('radioButton-cabbage-disabled');
        cy.get('@radioButton-cabbage-disabled').check({ force: true }).should('be.checked');

    });

});

describe('Handling checkbox/radio button - complex style', () => {

    it('complex style- USE ONLY IF REQUIRED !!!!', () => {

        //demo using radio button, same logic for checkbox

        cy.visit('http://www.webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html');

        cy.get('#radio-buttons>input').each(($el, index, list) => {

            cy.wrap($el).invoke('attr', 'value').then((valueOfValue) => {

                //select the radio button with value ='orange'
                
                cy.log(valueOfValue);
                if (valueOfValue === 'orange') {
                    cy.wrap($el).check().should('be.checked');
                }
            })
        })

    });

});

