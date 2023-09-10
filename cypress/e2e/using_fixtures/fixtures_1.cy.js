
//? https://www.youtube.com/watch?v=8UIzDOeB33c
//? https://www.youtube.com/watch?v=-hn5uKczmKw


//! 🏆🏆🏆 Fixtures - .fixture() method

//* SYNTAX: cy.fixture(filePath, encoding, options)
//* filepath : Path to folder containing fixture files defaulted to : "cypress/fixtures"

//! 🔥🔥🔥 Providing extension for fixture files in not mandatory.

//? https://docs.cypress.io/api/commands/fixture#Omit-the-fixture-files-extension

//! 🔥🔥🔥 Handling single scenario where we use fixture directly in It block.

describe('demo -1 : Using fixture- basics', () => {

    //*  🦘🦘🦘 a basic demo to show how to use fixtures - used directly inside it block
    it('demo-1', () => {

        cy.visit('https://www.saucedemo.com/v1/');
        //load fixture
        cy.fixture('using_fixtures_files/demo1.json').then((fetchedData) => {
            cy.get('#user-name').as('username').should('be.visible');
            cy.get('#password').as('password').should('be.visible');
            cy.get('@username').type(fetchedData.username);
            cy.get('@password').type(fetchedData.password);
            cy.get('#login-button').should('be.visible').click();
            //after successful login- assertions
            cy.url().then((fetchedurl) => {
                expect(fetchedurl).to.contain('inventory');
                cy.get('.product_label').should('have.text', fetchedData.validation_element_text);
            })
        })
    });
});

//! 🔥🔥🔥 Handling multiple scenarios (without iteration) writing multiple TCs.
//!  Fixture is loaded in beforeEach block.

describe('demo -2 : Using fixture- writing fixtures inside before each (without alias)', () => {

    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/v1/');
        //load fixture:
        //!🔥🔥 DONT USE ARROW FUNCTION AS Arrow function does not support 'this' keyword
        cy.fixture('using_fixtures_files/demo2_3_4_5.json').then(function (fetchedData) {
            this.fetchedData = fetchedData;
        });
    });

        //!🔥🔥 IN ALL it blocks, DONT USE ARROW FUNCTION AS Arrow function does not support 'this' keyword
    it("scenario-1 : logging with standard user", function () {
        cy.get('#user-name').as('username').should('be.visible');
        cy.get('#password').as('password').should('be.visible');
        cy.get('@username').type(this.fetchedData.standardUser);
        cy.get('@password').type(this.fetchedData.standardPwd);
        cy.get('#login-button').should('be.visible').click();
        //assert after successful login
        cy.get('.product_label').should('have.text', 'Products');
    });

    it("scenario-2: logging with lockedout user", function ()  {
        cy.get('#user-name').as('username').should('be.visible');
        cy.get('#password').as('password').should('be.visible');
        cy.get('@username').type(this.fetchedData.lockedUser);
        cy.get('@password').type(this.fetchedData.standardPwd);
        cy.get('#login-button').should('be.visible').click();
        //assert after UN-successful login
        cy.get("[data-test='error']").invoke('text').should('contain', 'locked out.');
    });

    it("scenario-3 : logging with only username", function () {
        cy.get('#user-name').as('username').should('be.visible');
        cy.get('#password').as('password').should('be.visible');
        cy.get('@username').type(this.fetchedData.standardUser);
        //cy.get('@password').type(this.fetchedData.standardPwd);
        cy.get('#login-button').should('be.visible').click();
        //assert after UN-successful login
        cy.get("[data-test='error']").invoke('text').should('contain', 'Password is required');
    });
});

describe('demo -3 : Using fixture- writing fixtures inside before each (with alias)', () => {

    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/v1/');
        //load fixture:
        //! Using alias
        cy.fixture('using_fixtures_files/demo2_3_4_5.json').as('fetchedData');
    });

 //!🔥🔥 IN ALL it blocks, DONT USE ARROW FUNCTION AS Arrow function does not support 'this' keyword
    it("scenario-1 : logging with standard user", function () {
        cy.get('#user-name').as('username').should('be.visible');
        cy.get('#password').as('password').should('be.visible');
        cy.get('@username').type(this.fetchedData.standardUser);
        cy.get('@password').type(this.fetchedData.standardPwd);
        cy.get('#login-button').should('be.visible').click();
        //assert after successful login
        cy.get('.product_label').should('have.text', 'Products');
    });

    it("scenario-2: logging with lockedout user", function ()  {
        cy.get('#user-name').as('username').should('be.visible');
        cy.get('#password').as('password').should('be.visible');
        cy.get('@username').type(this.fetchedData.lockedUser);
        cy.get('@password').type(this.fetchedData.standardPwd);
        cy.get('#login-button').should('be.visible').click();
        //assert after UN-successful login
        cy.get("[data-test='error']").invoke('text').should('contain', 'locked out.');
    });

    it("scenario-3 : logging with only username", function () {
        cy.get('#user-name').as('username').should('be.visible');
        cy.get('#password').as('password').should('be.visible');
        cy.get('@username').type(this.fetchedData.standardUser);
        //cy.get('@password').type(this.fetchedData.standardPwd);
        cy.get('#login-button').should('be.visible').click();
        //assert after UN-successful login
        cy.get("[data-test='error']").invoke('text').should('contain', 'Password is required');
    });
});

describe('demo -4 : Using fixture- writing fixtures inside before each (using closure variables)', () => {

    //declaring closure variable
    let fixtureData;
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/v1/');
        //load fixture:
        //! Using closure variable
        cy.fixture('using_fixtures_files/demo2_3_4_5.json').then((fetchedData)=>{
            fixtureData = fetchedData;
        })
    });

    it("scenario-1 : logging with standard user", ()=> {
        cy.get('#user-name').as('username').should('be.visible');
        cy.get('#password').as('password').should('be.visible');
        cy.get('@username').type(fixtureData.standardUser);
        cy.get('@password').type(fixtureData.standardPwd);
        cy.get('#login-button').should('be.visible').click();
        //assert after successful login
        cy.get('.product_label').should('have.text', 'Products');
    });

    it("scenario-2: logging with lockedout user",  ()=>  {
        cy.get('#user-name').as('username').should('be.visible');
        cy.get('#password').as('password').should('be.visible');
        cy.get('@username').type(fixtureData.lockedUser);
        cy.get('@password').type(fixtureData.standardPwd);
        cy.get('#login-button').should('be.visible').click();
        //assert after UN-successful login
        cy.get("[data-test='error']").invoke('text').should('contain', 'locked out.');
    });

    it("scenario-3 : logging with only username",  ()=> {
        cy.get('#user-name').as('username').should('be.visible');
        cy.get('#password').as('password').should('be.visible');
        cy.get('@username').type(fixtureData.standardUser);
        //cy.get('@password').type(this.fetchedData.standardPwd);
        cy.get('#login-button').should('be.visible').click();
        //assert after UN-successful login
        cy.get("[data-test='error']").invoke('text').should('contain', 'Password is required');
    });
});

