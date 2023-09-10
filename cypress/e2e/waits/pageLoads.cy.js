

//! HOW DO I WAIT FOR MY APPLICATION TO LOAD? 

//* When you load your application using cy.visit(), Cypress will wait for the load event to
//* fire. The cy.visit() command loads a remote page and does not resolve until all of the 
//* external resources complete their loading phase. Because we expect your applications to observe
//* differing load times, this command's default timeout is set to 60000ms.
//* If you visit an invalid url or a second unique domain, Cypress will log a verbose yet friendly error message.

//! Cypress automatically takes care that the Web page is completely loaded via cy.visit(),cy.go(),cy.reload() etc.
//! before executing any command.

//! ****** default pageLoadTimeout is 60 seconds i.e. 60000 ms.

describe('Understanding how cypress auto waits for all page events to load for 60 sec', () => {
    it('visit a slow loading website with default pageLoadTimeout ', () => {

        cy.visit('http://uitestingplayground.com/loaddelay'); //* pass
        cy.get('body>section>div>h3').should('have.text', 'Load Delays');

    });

    it('visit a slow loading website with 0 sec ', () => {

        cy.visit('http://uitestingplayground.com/loaddelay', { timeout: 0 }); //! fails
        cy.get('body>section>div>h3').should('have.text', 'Load Delays');


        // 🚨 CypressError
        // Timed out after waiting 0ms for your remote page to load.
        // Your page did not fire its load event within 0ms.
        // You can try increasing the pageLoadTimeout value in cypress.config.js to wait longer.
        // Browsers will not fire the load event until all stylesheets and scripts are done downloading.
        // When this load event occurs, Cypress will continue running commands.

    });
});

//! HOW TO CHECK IF SOME COMPONENT IS RENDERED PROPERLY ON WEBPAGE?

//? https://docs.cypress.io/faq/questions/using-cypress-faq#How-do-I-do-something-different-if-an-element-doesnt-exist
//? https://docs.cypress.io/guides/core-concepts/conditional-testing#Element-existence
//? https://docs.cypress.io/guides/core-concepts/conditional-testing#Dynamic-text

