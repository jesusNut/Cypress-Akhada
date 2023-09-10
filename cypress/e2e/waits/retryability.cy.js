
//! Understand retryability & default assertions.
//!---------------------------------------

//? https://docs.cypress.io/guides/core-concepts/retry-ability#Commands-Queries-and-Assertions  
//? https://testautomationu.applitools.com/advanced-cypress-tutorial/chapter2.html [Now retryability retries entire chain of command]

//* RETRIABILITY is the reason for automatic wait.

//* It means, SIMPLY PUT AN ASSERTION and Cypress will retry the query repeatedly to make the assertion pass till timeout.

//* Cypress will fail the test in case assertion could not be passed before defaultCommandTimeout.

//* Retry-ability allows the test to complete each query ONLY IF the assertion passes.

//! ***** DefaultCommandTimeout is 4 SECONDS.

//! USECASE 1: If we want to wait for an element to be visible - simply put a corresponding assertion.

//? https://stackoverflow.com/questions/60063879/how-to-wait-for-an-element-to-be-visible


// cy.get('xxxx', { timeout: 10000 }).should('be.visible');
// The above code will retry and wait for the corresponding elements to be visible before failing due to timeout (10sec).

//! USECASE 2: If we want to wait for an element to be enabled - simply put a corresponding assertion.

// cy.get('xxxx', { timeout: 10000 }).should('be.enabled');
// The above code will retry and wait for the corresponding elements to be enabled before failing due to timeout (10sec).


//! USECASE 3: DEFAULT ASSERTIONS : If we want to wait for an element to exist in DOM - 
//! No need to explicity put an assertion AS default assertion of Cypress will automatically take care of it.

//? https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Default-Assertions

//* ALL DOM COMMANDS AUTOMATICALLY WAIT FOR THEIR ELEMENTS TO EXIST IN THE DOM.
//You never need to write .should('exist') after querying the DOM.

// cy.get('xxxx', { timeout: 10000 }).should('exist'); IS IDENTICAL TO:
// cy.get('xxxx', { timeout: 10000 });

//! USECASE 4: REVERSING THE DEFAULT ASSERTION : If we want to wait for an element NOT to exist in DOM - 
//! Need to explicity put an assertion AS default assertion of Cypress will try to serach for existance.

//? https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Example-2-Reversing-the-Default-Assertion

//By adding .should('not.exist') to any DOM command, Cypress will reverse its default assertion and 
//automatically wait until the element does not exist.

//cy.get('button.close').click()

// now Cypress will wait until this <button> is not in the DOM
//cy.get('button.close').should('not.exist')


//* EXAMPLE 1:

// cy.get('.todoapp') // query
//   .find('.todo-list li') // query
//   .should('have.length', 1) // assertion

//cy.get() queries the application's DOM, finds the elements that match the selector, and then passes them to .find('.todo-list li').
// .find() locates a new set of elements, and tries the assertion that follows (in our case should('have.length', 1)) against the list of found elements.

// ✅ If the assertion that follows cy.find() passes, then the query finishes successfully.
// 🚨 If the assertion that follows cy.find() fails, then Cypress will requery the application's DOM again
// - starting from the top of the list of chain.
// Then Cypress will try the assertion against the elements yielded from cy.get().find().
// If the assertion still fails, Cypress continues retrying until the cy.find() timeout is reached.



describe('demonstrate retryability', () => {
    it('Example 1: wait for an element to exist in dom before assertion ', () => {

        //? https://docs.cypress.io/guides/core-concepts/retry-ability#Multiple-assertions

        cy.visit('http://uitestingplayground.com/clientdelay');
        cy.get('#ajaxButton').click();
        //wait for the paragraph to be present and then assert it.
        //If all assertions does not pass within 16 seconds, then the TC will fail.
        cy.get('#content>p', { timeout: 16000 }).should('exist') //this assertion will make sure paragraph exists before next assertion
            .and('contain', 'Data calculated');

    });

    it('Example 2 : waiting for a checbox to be enabled before checking it', () => {

        //This is alternate way to handle example 1 of actionability.cy.js.

        cy.visit('http://omayo.blogspot.com/');
        cy.get("button[onclick='setTimeout(myFunctionAXD,10000)']").click();
        // Scenario : checkbox identified by '#dte' is enabled only after 10 seconds of clicking button in above line.
        // The below assertion will make sure checkbox is enabled before check action.
        cy.get('#dte',{timeout:11000}).should('be.enabled').check(); 
        //assert below:
        cy.get('#dte').should('be.checked');

    });
});