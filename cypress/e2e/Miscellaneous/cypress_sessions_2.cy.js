
//setting a base url on spec level:
Cypress.config('baseUrl', 'https://react-redux.realworld.io');


describe.only('SECOND SESSION : login once, create and retain session, reuse session',
    { defaultCommandTimeout: 9000 },
    () => {

        beforeEach(() => {
            cy.login('tinohi9276@xgh6.com', 'Cypress007');

        });

        it('validate url and a Home text', () => {
            cy.visit('/');//compulasary to visit url in each test again, otherwise cypress will navigate to blank page and test fails.
            cy.url().should('not.contain', 'login');
            cy.get("a[href='#settings']").should('be.visible');
        });

        it('validate a page component on homepage after successful login', () => {
            cy.visit('/'); //compulasary to visit url in each test again, otherwise cypress will navigate to blank page and test fails.
            cy.get('img.user-pic').should('be.visible');
        });
    });

