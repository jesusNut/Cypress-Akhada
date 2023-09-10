//! USAGE OF CLOSURES i.e. then() METHOD
//!--------------------------------------------------

//? https://docs.cypress.io/guides/core-concepts/variables-and-aliases#Closures
//? https://docs.cypress.io/api/commands/then 
//? https://www.youtube.com/watch?v=MUqKU5jUk5k&list=PL0EgBggsoPCk98uEtlGyWhKM8GiWdUFy0&index=4  
//? https://www.youtube.com/watch?v=gIgqEvbYkgg&t=900s

//* In concept_1.cy.js , we have learnt that:
//! DON'T USE RETURN VALUES OF CYPRESS- CY* COMMANDS.

//* SO INSTEAD, 

//! we can use CLOSURES i.e. then() command
//! to work with the values yielded by Cypress commands.

//* NON-RECOMMENDED WAY TO CHAIN then() :
//! It is unsafe to explicity return DOM elements directly from the callback/then() and
//! then use further commands on them or chain with then(). Use query commands to find elements.
//! But IN GENERAL, chaining then() is safe.

//* syntax:

// cy.get('button').then(($btn) => {
//      $btn is the object that the previous
//      command yielded us
//   })

describe('Understanding what then yields + then() chaining', () => {

    it('Different concepts in then()', () => {

        //! then() calls the passed anonymous functions */
        //cy.then(() => { cy.log('hello world') });


        //! then() passes yielded value from previous command as subject in callback function*/
        // cy.visit('http://omayo.blogspot.com/');
        // cy.get('#rotb').then(($subject) => {
        //     cy.log($subject); //logging subject
        //     cy.log($subject.val()); //using jquery function on subject
        //     cy.wrap($subject).clear({ force: true }); //doing action on subject
        // })

        //! Scenario 1 : chaining of then() command
        //! IF NO CYPRESS COMMANDS ARE USED INSIDE then() & NO explicit return->
        //! then() delegates yielded value from previous command as subject in 
        //! a.next then()'s callback function* OR 
        //! b. any other command like should() OR any action command etc.

        // cy.visit('http://omayo.blogspot.com/');
        //   //element yielded by "cy.get('#rotb')" is passed in both then()s and should() and clear().
        // cy.get('#rotb')
        //     .then(($subject) => {
        //         console.log('logging in 1st then() : ', $subject);
        //         console.log($subject.val())
        //     })
        //     .then(($subject) => {
        //         console.log('logging in 2nd then() : ', $subject);
        //         console.log($subject.val())
        //     })
        //     .should('have.value','ReadThisText')
        //     .clear({force:true});

        //! Scenario 2 : chaining of then() command
        //! IF NO CYPRESS COMMANDS ARE USED INSIDE then() & then() HAS explicit return , then Whatever is 
        //! returned from the callback function becomes the new subject and will flow into the next command.
        //cy.visit('http://omayo.blogspot.com/');
        //element yielded by "cy.get('#rotb')" is passed in both then() and should().
        // cy.get('#rotb')
        //     .then(($subject) => {
        //         console.log($subject);
        //         console.log($subject.val());
        //         return 'hello world';
        //     })
        //     .then(($subject)=>{
        //         cy.log($subject); //subject in this then() block will be a string 'hello world'
        //     })

        //! Mixing up a cypress command (async code) and returning a sync command, gives cypress error.

        //cy.visit('http://omayo.blogspot.com/');
        // cy.get('#rotb')
        // .then(($subject) => {
        //     cy.log($subject); //async code
        //     cy.log($subject.val()); //async code
        //     return 'hello world'; //returning sync - GIVES ERROR {refer concept_1.cy.js - mixing async & sync code, example 3}
        // })
        // .then(($subject)=>{
        //     cy.log($subject); //subject in this then() block will be a string 'hello world'
        // })

        //? solution: https://medium.com/tech-learn-share/you-are-mixing-async-and-sync-code-fix-in-cypress-b6c0b67f2e2e
        //? solution in video : https://www.youtube.com/watch?v=f_H7EH0n9tE

        //! Scenario 3 : chaining of then() command
        //! IF CYPRESS COMMANDS ARE USED INSIDE then(), &&
        //! If the callback returns undefined or null (or there is no return value)-> 
        //! the RESULT OF THE LAST CYPRESS COMMAND IN THE CALLBACK FUNCTION will be yielded as the
        //! new subject instead, and flow into the next command.

        // cy.visit('http://omayo.blogspot.com/');
        // cy.get('#HTML3').then(($firstSubject) => {

        //     cy.log(`fetched firstSubject as ${$firstSubject}`);
        //     cy.get($firstSubject).find("a[id='link1']").should('have.attr','value','link1');
        //     //last cy command (just above this) will delegate resultant element "a[id='link1']" 
        //     //as subject to next then().
        // }).then(($secondSubject) => {
        //     cy.log(`the text in anchor tag is ${$secondSubject.text()}`)
        //     //last cy command (just above this) will delegate null as subject to next then() as
        //     //result of cy.log() yields null.
        // }).then(($thirdSubject) => {
        //     cy.log(`third subject is ${$thirdSubject}`);
        // })


    });
});

