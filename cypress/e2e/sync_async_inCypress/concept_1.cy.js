

//! 1. CYPRESS COMMANDS ARE ASYNCHRONOUS.
//!--------------------------------------

//* Cypress commands don't do anything at the moment they are invoked,
//* but rather ENQUEUE THEMSELVES TO BE RUN LATER in an order making them appear SYNCHRONOUS while actual execution. 
//? https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Commands-Are-Asynchronous

//* DEMO CODE:

describe('Enqueuing (Async nature) & serial execution of cypress commands ', () => {

    it('hides the thing when it is clicked', () => {
        cy.visit('/my/resource/path') // Nothing happens yet

        cy.get(".hides-when-clicked") // Still nothing happening
            .should("be.visible") // Still absolutely nothing
            .click() // Nope, nothing

        cy.get('.hides-when-clicked') // Still nothing happening
            .should('not.be.visible') // Definitely nothing happening yet
    })

    // Ok, the test function has finished executing...
    // We've queued all of these commands and now
    // Cypress will begin running them in order!

});


//! 2. CYPRESS COMMANDS RUN SERIALLY !!!!

//* After a test function (it block) is finished running, Cypress goes to work executing the commands 
//* that were enqueued using the cy.* command chains. This makes cypress commands to run sequentailly.
//? https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Commands-Run-Serially

it('serial execution of cypress commands', () => {
    cy.visit('/my/resource/path') // 1.

    cy.get('.hides-when-clicked') // 2
        .should('be.visible') // 3
        .click() // 4

    cy.get('.hides-when-clicked') // 5
        .should('not.be.visible') // 6
});

// The test above would cause an execution in this order:

// Visit the URL (or mount the component).
// Find an element by its selector.
// Assert that the element is visible.
// Perform a click action on that element.
// Find an element by its selector.
// Assert that the element is no longer visible.
// These actions will always happen serially (one after the other), never in parallel (at the same time). Why?

// To illustrate this, let's revisit that list of actions and expose some of the hidden ✨ magic ✨ Cypress does for us at each step:

// Visit the URL ✨ and wait for the page load event to fire after all external resources have loaded ✨ (or mount the component ✨ and wait for the component to finish mounting ✨)
// Find an element by its selector ✨ and retry until it is found in the DOM ✨
// Assert that the element is visible ✨ and retry until the assertion passes ✨
// Perform a click action on that element ✨ after we wait for the element to reach an actionable state ✨
// Find an element by its selector ✨ and retry until it is found in the DOM ✨
// Assert that the element is no longer visible ✨ and retry until the assertion passes ✨
// As you can see, Cypress does a lot of extra work to ensure the state of the application matches what our commands expect about it. Each command may resolve quickly (so fast you won't see them in a pending state) but others may take seconds, or even dozens of seconds to resolve.

// While most commands time out after a few seconds, other specialized commands that expect particular things to take much longer like cy.visit() will naturally wait longer before timing out.

// These commands have their own particular timeout values which are documented in the Cypress configuration.

//* Core Concept:
//* Any waiting or retrying that is necessary to ensure a step was successful must complete before the next step begins.
//* If they don't complete successfully before the timeout is reached, the test will fail.
//!----------------------------------------------------------------------------------------------------------------------


//! 3. Mixing async and sync code is not recommended.
//!-----------------------------

//* CYPRESS COMMANDS run asynchronously WHERE AS 
//* NON-CYPRESS SYNCHRONOUS CODE will execute immediately - not waiting for the Cypress commands above it to execute.
//? https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Mixing-Async-and-Sync-code 

describe('mixing sync and async code', () => {
    it('never do this !!! example-1 ', () => {

        cy.visit('https://react-redux.realworld.io/#/login?_k=jfvdsh');//Async code
        cy.get("input[placeholder='Email']").type('Abhishek');//Async code
        cy.get("input[placeholder='Password']").type('Billioniore');//Async code
        cy.get("button[type='submit']").click();  //Async code
        console.log("My test is completed"); //sync code
        //the above coammand will be executed first as non-cypress commands are sync.

    });

    it('never do this !!! example-2', () => {

        cy.visit('https://react-redux.realworld.io/#/login?_k=jfvdsh');

        let dataGotFromSinginButton;

        //get text from SIGNIN button & assign it to the above variable.
        cy.get("button[type='submit']").invoke('text').then((fetchedText) => {

            dataGotFromSinginButton = fetchedText;

        })

        console.log(`value fetched is :: ${dataGotFromSinginButton}`); //undefined
        //the above line prints undefined (in Chrome Dev Tools console) as it gets executed before any cypress commands
        //as we know that non-cypress commands are sync.

    });

    it('never do this !!! example 3- 🚨🚨🚨 GIVES ERROR', () => {
        cy.wrap(1)
            .then((num) => {
                cy.wrap(num).should('equal', 1) //async code
                return 2 //sync code, gives error
            })
            .should('equal', 2)

        // 🚨🚨🚨 CypressError !!!!!!
        //! 🍌🍌🍌 cy.then() failed because you are mixing up async and sync code.
        // In your callback function you invoked 1 or more cy commands but then returned a synchronous value.
        // Cypress commands are asynchronous and it doesn't make sense to queue cy commands and yet return a synchronous value.
        // You likely forgot to properly chain the cy commands using another cy.then().
        // The value you synchronously returned was: 2

    });
});


//! WANT TO JUMP INTO THE COMMAND FLOW AND GET YOUR HANDS ON THE SUBJECT DIRECTLY?
//!----------------------------------------------------------------------------------
//! NO PROBLEM BOSS, ADD A .THEN() TO YOUR COMMAND CHAIN. When the previous command resolves,
//! it will call your callback function with the yielded subject AS THE FIRST ARGUMENT.

it('fixing issues of example-2', () => {

    cy.visit('https://react-redux.realworld.io/#/login?_k=jfvdsh'); //2

    let dataGotFromSinginButton; //1

    //get text from SIGNIN button & assign it to the above variable.
    cy.get("button[type='submit']") //3
        .invoke('text')  //4
        .then((fetchedText) => {  //4

            dataGotFromSinginButton = fetchedText; //5

            cy.log(`value fetched is :: ${dataGotFromSinginButton}`); //6
            //'cy.log()' at 6 is a cy* command, and it will execute only after 5.
            // This will print the correct text value of SIGNIN button in COMMAND LOG.

        })
});


//! 4. DON'T USE RETURN VALUES OF CYPRESS- CY* COMMANDS INSTEAD USE then().

//* Cypress commands do not return their subjects, 
//* they yield them for next chainable command if any.
//* During execution, subjects are yielded from one command to the next, 
//* and a lot of helpful Cypress code runs between each command to ensure everything is in order.
//* That is why, WE PURPOSEFULLY CANNOT DO ANYTHING USEFUL WITH THE RETURN VALUE FROM A COMMAND.

//? https://www.udemy.com/course/cypress-io-master-class/learn/lecture/20601990#overview

describe('DONT USE RETURN VALUES OF CYPRESS COMMANDS', () => {
    it('NOT A RECOMMENDED APPROACH', () => {

        //********** this won't work the way you think it does *************
        //so, don't use like this.
        const button = cy.get('button')
        const form = cy.get('form')

        button.click()

    });

    it('CYPRESS RECOMMENDED APPROACH', () => {

        cy.get('button').click();
        cy.get('form').click()


    });
});

//! 5. CYPRESS COMMANDS ARE NOT PROMISES , so we cannot use .catch() error handler etc.

//! While the API may look similar to Promises, with it's then() syntax,
//! Cypress commands and queries are not JS promises.
//! ALTHOUGH, Cypress is built using Promises that come from Bluebird.