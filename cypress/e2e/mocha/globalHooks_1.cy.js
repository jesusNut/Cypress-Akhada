

/**================================================================================================
 *!                               GLOBAL HOOKS
 *================================================================================================**/

 //? udemy - Joan - chapter 97

 //! Those hooks which can be used for all spec files.
 //! Global hooks should be written in cypress/support/e2e.js
 //! For the below demo uncomment code in cypress/support/e2e.js

 describe('globalHooks_1.cy.js', () => {
    it('first test case', () => {
      cy.log('executing first test case...');
    });
    it('second test case', () => {
      cy.log('executing second test case...');
    });
 });