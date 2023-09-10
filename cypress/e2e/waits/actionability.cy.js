
//! Understand actionability and Forcing.
//!---------------------------------------

//? https://docs.cypress.io/guides/core-concepts/interacting-with-elements#Actionability

//* Actionability: waiting FOR THE ELEMENT to reach an actionable state before firing action command on it.
//------------------
//* Prior to issuing any of the action commands-click(), type(), check() etc., 
//* Cypress checks the current state of the DOM and
//* take some actions (internally) to ENSURE THE DOM ELEMENT IS "READY" TO RECEIVE THE ACTION.
//* Cypress will watch the DOM - re-running the queries-that yielded the current subject(i.e. upto the action command)- 
//* until an element passes all of these checks 
//* for the duration of the defaultCommandTimeout (4 secs) or if any custom commandTimeout is provided.

//*Checks and Actions Performed - ********  ACTIONABLE STATE *********:

// Scroll the element into view.
// Ensure the element is not hidden.
// Ensure the element is not disabled.
// Ensure the element is not detached.
// Ensure the element is not readonly.
// Ensure the element is not animating.
// Ensure the element is not covered.
// Scroll the page if still covered by an element with fixed position.
// Fire the event at the desired coordinates.

//! ***** DefaultCommandTimeout is 4 SECONDS.

//! ***** Provide the timeout object as option inside the action command for customCommandTimeout .


//* ***** ONLY QUERIES ARE RETRIED FOR ACTIONABILITY & NOT THE ACTION COMMAND ITSELF  ******

//! Any action command will automatically wait FOR THE ELEMENT to reach an actionable state 
//! until defaultCommandTimeout or customCommandTimeout(if provided).
//! ** Cypress will retry any queries leading UP TO AN ACTION COMMAND, which will basically be the element.

//e.g - cy.get('#someID').check({timeout:11000}); //setting defaultCommandTimeout to custom - 11 seconds.
// In above case,
// Cypress will keep querying DOM for element specified by cy.get('#someID') to become actionable for 11 seconds.
// If the element specified by cy.get('#someID') doesn't become actionable in 11 seconds, timeout happens and an error will be thrown.


//! BUT the ACTION COMMANDS THEMSELVES ARE NEVER RETIED. Means cypress will not retry by invoking check() method multiple times.
//! Action commands are pressed only once.

//? https://docs.cypress.io/guides/core-concepts/retry-ability#Only-queries-are-retried
//? https://docs.cypress.io/guides/core-concepts/retry-ability#Built-in-assertions  


describe('Actionabilty- wait FOR THE ELEMENT to reach an actionable state', () => {
    it('EX-1 : clicking a checkbox which is enabled after delay', () => {

        cy.visit('http://omayo.blogspot.com/');
        cy.get("button[onclick='setTimeout(myFunctionAXD,10000)']").click();
        // Scenario : checkbox identified by '#dte' is enabled only after 10 seconds of clicking button in above line.
        // Actionabilty will keep on re-running the query "cy.get('#dte')", till either the checkbox is enabled(actionable state)
        // or the default/custom commandTimeout is over. If the checkbox gets enabled within 10 seconds then, check action is performed.
        // since, the default commandTimeout is 4 seconds, so the below code is fails.
        //cy.get('#dte').check(); 

        // we have to increase the default commandTimeout>10 seconds, to make sure that the checbox is enabled before doing
        // check action.
        cy.get('#dte').check({timeout:11000});
        //assert below:
        cy.get('#dte').should('be.checked');

    });

    it('EX-2 : asserting a text which comes on pressing button after delay', () => {

        cy.visit('http://omayo.blogspot.com/');

        //scenario: once the page loads, the button identified using '#timerButton' is enabled after 6 sec.
        //Actionabilty will keep on re-running the query "cy.get('#timerButton')", till either the button is enabled
        //(is in actionable state) or the default/custom commandTimeout is over.
        cy.get('#timerButton').should('be.disabled');
        cy.get('#timerButton').click({timeout:6000});
        //Assert below
        cy.get('#timerButton').should('be.enabled');
        
    });
});

//* Forcing :
// In some cases, your DOM element will not be actionable. 
// Cypress gives you a powerful {force:true} option you can pass to most action commands.
// Use to check a disabled checkbox, enter into disabled text fields etc.