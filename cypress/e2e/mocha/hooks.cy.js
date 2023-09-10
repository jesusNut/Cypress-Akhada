//! Mocha ->
// Mocha is a feature-rich JAVASCRIPT TEST FRAMEWORK running on Node.js and in the browser,
// making asynchronous testing simple and fun. MOCHA TESTS RUN SERIALLY, allowing for flexible and accurate reporting,
// while mapping uncaught exceptions to the correct test cases.

//? https://mochajs.org/#hooks

//! HOOKS defined on global/framework level
//* We can define global hooks in cypress/support/e2e.js.
//? udemy - Joan - chapter 97
//todo##:  LEARN more in cypress/e2e/mocha/gobalHooks_X.cy.js

//! HOOKS on root level (applicable for every describe block in that spec file):
//* 1. before hook (write outside any describe block)
//* 2. after hook (write outside any describe block)


//! HOOKS related to suite level (describe block level):
//* 1.Before hook
//* 2.After hook
//* 3.Describe block
//* 4.Context(alias of describe block for better redability)

//! HOOKS related to test case level (it block level):
//* 1.beforeEach hook
//* 2.afterEach hook
//* 3.it block

//! ONLY (used for describe/context or it blocks ONLY. Not for hooks):
//  The actual usecase is that while development, we need to focus on the test at hand.
//  So, even if we have may it blocks in a describe block, we want to run only one.
//  In that case mark the intended it block with it.only(…).
// e.g.:
// Lets assume that we have 5 it blocks(tests) inside a describe block. We want to run only 3.
// Then mark the intended 3 test cases/it blocks as it.only(…).

//! SKIP (used for describe/context or it blocks ONLY. Not for hooks):
// By appending .skip(), you may tell Mocha to ignore test case(s). 
// Anything skipped will be marked as pending, and reported as such. 
// You can also put .skip() on an entire suite.
// This is equivalent to appending .skip() onto all tests in the suite.
// Hooks in the suite are also skipped.

before(() => {
    // root-level hook
    // runs once before all tests
    cy.log('Root level before')
})

beforeEach(() => {
    // root-level hook
    // runs before every test block
    cy.log('Root level before each')
})

afterEach(() => {
    // runs after each test block
    cy.log('Root level after each')
})

after(() => {
    // runs once all tests are done
    cy.log('Root level after')
})

describe(' describe block - 1', () => {

    before(() => {
        cy.log('set up environment for describe block - 1');
    });
    after(() => {
        cy.log('tear down environment for describe block - 1');
    });

    beforeEach(() => {
        cy.log('login');
    });
    afterEach(() => {
        cy.log('logout');
    });
    it('it block - 11', () => {
        cy.log('I am it block - 11 ')
    });
    it('it block - 12', () => {
        cy.log('I am it block - 12 ')
    });
    it('it block - 13', () => {
        cy.log('I am it block - 13 ')
    });
});

describe(' describe block - 2', () => {
    before(() => {
        cy.log('set up environment for describe block - 2');
    });
    after(() => {
        cy.log('tear down environment for describe block - 2');
    });

    beforeEach(() => {
        cy.log('clear cache');
    });
    afterEach(() => {
        cy.log('save cache');
    });

    it('it block - 21', () => {
        cy.log('I am it block - 21 ')
    });
    it('it block - 22', () => {
        cy.log('I am it block - 22 ')
    });
    it('it block - 23', () => {
        cy.log('I am it block - 23 ')
    });
});