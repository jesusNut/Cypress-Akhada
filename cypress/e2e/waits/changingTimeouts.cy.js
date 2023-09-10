//! All configurations are handled in the same way as timeout as timeout is also a config option.

//? https://www.youtube.com/watch?v=_MtvLZFLPCU
//? https://docs.cypress.io/guides/references/configuration#Configuration-File
//? https://www.youtube.com/watch?v=k6O-pK__6tw&list=PLMZdod-kiMhKiRztQX_rng7EfcI5OteMR&index=13

//! 🍌🍌🍌 All timeouts (a configuration option) can be changed at 5 scopes:

//* 1. On TEST CASE Level scope.
//* 2. On TEST SUITE/TEST CASE level -> describe/it -2nd arg
//* 3. In scope for the current spec file -> cypress.config()
//* 4. Timeout config change from terminal.
//* 5. On framework level/globally. -> In cypress.config.js or cypress.config.ts

//! 🍌🍌🍌 Precedence:

// from >>>>>>>>>>>>> Highest to lowest >>>>>>>>>>>>>>>>>

//*TEST CASE Level >>>>>> TEST SUITE/TEST CASE level -> describe/it -2nd arg >>>>>>current spec file -> cypress.config()>>>>>>>> --config terminal >>>>> cypress.config.js or cypress.config.ts



//! CODE TO CHANGE TIMEOUTS ON SPEC FILE LEVEL:

Cypress.config({
    defaultCommandTimeout: 25000, //4 sec to 25 sec
    pageLoadTimeout: 20000, //60 sec to 20 sec
})


describe('point 1 & 3 explained : configuring timeouts', () => {
    it('test case level scoped', () => {

        //configuring pageLoadTimeout on test case level.
        cy.visit('http://uitestingplayground.com/loaddelay', { timeout: 20000 }); //60 sec to 20 sec
        cy.visit('http://uitestingplayground.com/clientdelay', { timeout: 5000 }); //60 sec to 5 sec

        cy.get('#ajaxButton').click();
        //configuring defaultCommandTimeout on test case level.
        cy.get('#content>p', { timeout: 22000 }).should('be.visible'); //4 sec to 22 sec

    });
    it('current spec file scoped', () => {

        //configuring pageLoadTimeout on spec file level.
        cy.visit('http://uitestingplayground.com/loaddelay');
        cy.visit('http://uitestingplayground.com/clientdelay');

        cy.get('#ajaxButton').click();
        //configuring defaultCommandTimeout on spec file level.
        cy.get('#content>p').should('be.visible');

    });
});

describe('point 2 explained : configuring timeouts on TEST SUITE/CASE LEVEL', {
    pageLoadTimeout: 20000,  //60 sec to 20 sec
    defaultCommandTimeout: 21000, //4 sec to 21 sec

}, () => {
    it('test case 1', () => {
        cy.visit('http://uitestingplayground.com/loaddelay'); //20 sec applied
        cy.visit('http://uitestingplayground.com/clientdelay'); //20 sec applied

        cy.get('#ajaxButton').click();
        cy.get('#content>p').should('be.visible'); //21 sec applied

    });

    it('test case 2 - doing TEST CASE LEVEL config ', {
        pageLoadTimeout: 15000,  //60 sec to 15 sec
        defaultCommandTimeout: 30000, //4 sec to 30 sec
    }, () => {

        //! every timeout provided at describe block will be overriden if the same options are
        //! provided in it block.
        cy.visit('http://uitestingplayground.com/loaddelay'); //15 sec applied (and not 20 sec @ describe block)
        cy.visit('http://uitestingplayground.com/clientdelay'); //15 sec applied (and not 20 sec @ describe block)

        cy.get('#ajaxButton').click();
        cy.get('#content>p').should('be.visible'); //30 sec applied (and not 21 sec @ describe block)

    });
});

describe('point 4 explained : configuring timeouts via terminal', () => {

//! Code to run from terminal:
// npx cypress run --spec cypress\e2e\waits\changingTimeouts.cy.js --browser electron --headed
// --config pageLoadTimeout=20000,defaultCommandTimeout=20000

    it('sample test case', () => {
        cy.visit('http://uitestingplayground.com/loaddelay'); //applied from terminal
        cy.visit('http://uitestingplayground.com/clientdelay'); //applied from terminal

        cy.get('#ajaxButton').click();
        cy.get('#content>p').should('be.visible'); //applied from terminal
    });
});

//! see cypress.config.js for point 5.
