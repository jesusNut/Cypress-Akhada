
//* Implicit Assertions are done using:
//! should() 
//! and()

//? https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Assertions
//? https://docs.cypress.io/guides/references/assertions


describe('writing implicit assertions', () => {


    it('using Chai & Chai-jquery- should()', () => {

        cy.visit('http://omayo.blogspot.com/#');
        cy.get('#HTML4').find('h2').should('have.text', 'Text Box with Preloaded Text');
        cy.get('#HTML4').find('h2').invoke('text').should('contain', 'Text Box');//alias of include()
        cy.get('#HTML4').find('h2').invoke('text').should('include', 'Text Box');
        cy.get('#HTML4').find('h2').invoke('text').should('have.length.greaterThan', 27);

    });
    it('using Chai & Chai-jquery- should() & and()', () => {

        cy.visit('http://omayo.blogspot.com/');
        cy.title().should('eq', 'omayo (QAFox.com)')
            .and('have.length.greaterThan', 16)
            .and('include', 'QAFox')
            .and('contain', 'QA'); //alias of include()

    });

    it('asserting number of elements on the webpage', () => {

        cy.visit('https://books.toscrape.com/');
        cy.get('.product_pod').then(($el) => {
            cy.wrap($el).its('length').should('eq', 20); //way 1- using its() method
            cy.wrap($el).should('have.length', 20); //way 2
        })

    });

    it('asserting visibility and non-visible hidden', () => {

        cy.visit('http://omayo.blogspot.com/');

        //assert hidden or not
        cy.get('#hbutton').should('be.hidden');

        //assert visible or not
        cy.get('#hbutton').should('not.be.visible');

    });

    it('asserting disabled and enabled', () => {

        cy.visit('http://omayo.blogspot.com/');

        //assert enabled
        cy.get('#but1').should('be.disabled');

        //assert disabled
        cy.get('#but2').should('be.enabled');
    });

    it('Check if an element exists + conditional testing', () => {

        //! we can use - should('exist')

        //? https://stackoverflow.com/questions/56145926/how-to-check-if-element-exists-using-cypress-io
        //? https://www.youtube.com/watch?v=Ct29NYFltxA&list=PL0EgBggsoPCk98uEtlGyWhKM8GiWdUFy0&index=6&t=187s

        //! In case we need to to do something if something exists then:

        cy.visit('http://127.0.0.1:5500/cypress/customHTMLs/conditionalTesting.html')

        /* correct way to do conditional test */
        cy.get('body').then((body) => {
            console.log(body.find('label:contains(Readonly)'))
            if (body.find('label:contains(Readonly)').length > 0)
                cy.get('#edit').click()
        })
    });

    context('usecases -> assertions using its() method', () => {

        it('Validate count of elements on webpage', () => {

            cy.visit('https://books.toscrape.com/');
            cy.get('.product_pod').then(($el) => {
                cy.wrap($el).its('length').should('eq', 20);
            })

        });

        it('Get the length property of a DOM element- with ul/ol', () => {

            cy.visit('http://omayo.blogspot.com/');
            cy.get('#HTML26 ul li').its('length').should('eq', 6);
        });

        it('Get length of title', () => {

            cy.visit('http://omayo.blogspot.com/');
            cy.title().its('length').should('be.greaterThan', 16);
            //other way without it
            //cy.title().should('have.length.greaterThan',18);
        });

    });

});

//! 🍌🍌🍌 should() also takes call back functions. [demo @ cypress\e2e\sync_async_inCypress\shouldvsthen_callback_4.cy.js]