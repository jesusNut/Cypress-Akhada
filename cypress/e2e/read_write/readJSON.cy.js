

/**================================================================================================
 *!                              READ IN JSON FILE (cy.readFile())
 *================================================================================================**/

//! THERE NEEDS TO BE A FILE IN ORDER TO BE READ FROM.

//! Providing extension of the files is mandatory.

//? https://docs.cypress.io/api/commands/readfile#Existence

describe('Read Text file', () => {
    it('Read a text file', () => {
        //read a text file and log it on the test runner console.
        cy.readFile('cypress\\e2e\\read_write\\resources\\plsReadMe.txt').
            then((data) => {
                cy.log(data);
            })
    });
});

describe('Read JSON file', () => {
    it('Read a JSON file', () => {
        //read a text file and log it on the test runner console.
        cy.readFile('cypress\\e2e\\read_write\\resources\\plsReadMe.json').
            then((data) => {
                cy.log(data.menu.id);
            })
    });
});
