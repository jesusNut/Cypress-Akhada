
//! pause() command pauses the next in test runner.
//! USED FOR DEBUGGING.

//* we can do step by step execution after that using 'NEXT button'
//* or we can resume the whole test from the paused point or after any point 
//* using 'RESUME button'.

describe('demo to use pause command', () => {
    it('demo', () => {

        cy.visit('http://www.webdriveruniversity.com/Contact-Us/contactus.html');
        cy.get("input[placeholder='First Name']").type('abhishek');    
        cy.pause();
        cy.get("input[placeholder='Last Name']").type('bhardwaj');       
        cy.get("input[placeholder='Email Address']").type('abc.def@cmail.com');   
        cy.get("textarea[placeholder='Comments']").type('wanna have fun beaches!!');
        cy.get("input[value='SUBMIT']").click();   
    });
});