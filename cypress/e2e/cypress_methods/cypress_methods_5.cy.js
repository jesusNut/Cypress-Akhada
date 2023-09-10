
//! cy.log() command

//! 1. CY.LOG() COMMAND LOGS ON THE COMMAND LOG WHEREAS
//! console.log logs on the DEV TOOLS CONSOLE.

//! 2. CY.LOG() COMMAND is cypress command i.e. asynchronous
//! console.log() is a non-cypress synchronous command.

//! resultant of cy.log() yields null.

describe('demo of cy.log() command', () => {
    it('cy.log() vs console.log()', () => {

        //order of execution:

        cy.visit('https://react-redux.realworld.io/#/login?_k=jfvdsh');  //2
        cy.get("input[placeholder='Email']").type('Abhishek'); //3
        cy.get("input[placeholder='Password']").type('Billioniore'); //4
        cy.get("button[type='submit']").click(); //4
        cy.log("My test is completed"); //5 (logs on COMMAND LOG)
        console.log("My test is completed"); //1 (sync code - logs on dev tools console)
        // 1 will be executed first as non-cypress commands are sync.
    })
});