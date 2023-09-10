
//! Handling iframes - JQUERY contents() and find() method


describe('Handling single iframe', () => {

    it('handling single iframe - example 1', () => {

        cy.visit('https://the-internet.herokuapp.com/tinymce');

        //1. Fetch the iframe and open a then command

        cy.get('#mce_0_ifr').then(($fetchedIframe) => {

            //2.Fetch the body of iframe using Jquery methods contents() and find()
            const $fetchBody = $fetchedIframe.contents().find('body');
            cy.wrap($fetchBody).as('iframeBody');
        })

        //3. Use the iframe body now. and type something.

        cy.get('@iframeBody').find('p').clear();
        cy.get('@iframeBody').find('p').type('Abhishek is great !!!');

        //4. Assert the text entered.

        cy.get('#mce_0_ifr').then(($fetchedIframe) => {

            const $fetchBody = $fetchedIframe.contents().find('body');
            cy.wrap($fetchBody).find('p').should('have.text', 'Abhishek is great !!!');
        })
    });

    it('handling single iframe - example 2', () => {

        cy.visit('http://www.webdriveruniversity.com/IFrame/index.html');

        //1. Fetch the iframe and open a then command

        cy.get('#frame').then(($fetchedIframe) => {

            //2.Fetch the body of iframe using Jquery methods contents() and find()
            const $fetchBody = $fetchedIframe.contents().find('body');
            cy.wrap($fetchBody).as('iframeBody');
            cy.get('@iframeBody').find('li').contains('Contact Us').click();
            //3. Wait for new iframe to reload
            cy.wait(3000);
        })


        cy.get('#frame').then(($fetchedIframe) => {

            //4.Fetch the body of iframe AGAIN using Jquery methods contents() and find()
            const $fetchBody = $fetchedIframe.contents().find('body');

            //5. Fill the form
            cy.wrap($fetchBody).find("input[placeholder='First Name']").type('Abhishek');
            cy.wrap($fetchBody).find("input[placeholder='First Name']").type('Hakram');
            cy.wrap($fetchBody).find("input[placeholder='Last Name']").type('Danish');
            cy.wrap($fetchBody).find("input[placeholder='Email Address']").type('Mars');
            cy.wrap($fetchBody).find("textarea[placeholder='Comments']").type('Pizza is cold!');
            cy.wrap($fetchBody).find("input[value='SUBMIT']").click();
        })
    });
});

describe('Handling nested iframe', () => {
    it('handling nested iframes', () => {

        cy.visit('https://selectorshub.com/iframe-and-nested-iframe/');

        //1. Get inside parent iframe
        cy.get('#pact2').then(($fetchedIframe) => {

            //2. Fetch the body of iframe using Jquery methods contents() and find()
            const $fetchBody = $fetchedIframe.contents().find('body');
            cy.wrap($fetchBody).as('parentIframeBody');

            //3. Get inside parent iframe
            cy.get('@parentIframeBody').find('#pact3').then(($nestedIframe) => {

                const $fetchNestedBody = $nestedIframe.contents().find('body');

                //4. fetch text of nested frame and type
                cy.wrap($fetchNestedBody).as('nestedIframeBody');
                cy.get('@nestedIframeBody').find('#glaf').type('Oinggg!!');

            })
        })

    });
});