
//! 🔥🔥🔥 In case of loading a JSON fixture,we can simply use the import statement and let the bundler load it.
//! Both ways of -  of using cy.fixture() and importing works fine for JSON fixtures.

//using import statements

import fdata2 from '../../fixtures/using_fixtures_files/demo2_3_4_5.json';

describe('demo-5 : using import statements for json fixture(equivalent to cy.fixture)', () => {

    beforeEach(() => {
        cy.fixture('using_fixtures_files/demo2_3_4_5.json').as('fdata1');
    });

    it('demo-5', function () {

        cy.log(fdata2.standardUser); //standard_user
        cy.log(this.fdata1.standardUser); //standard_user

        cy.wrap(fdata2.standardUser,{log:false}).should('equal',this.fdata1.standardUser);

    });
});


