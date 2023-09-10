

//! Browser navigation - go() method & reload() method

describe('browser navigation', () => {
    it('backward and forward', () => {

        cy.visit('https://www.google.co.in/');
        cy.get('#APjFqb').type('Abhishek').type('{enter}')
        //cy.go(-1); //way -1 to go backward
        cy.go('back'); //way -2 to go backward
        // cy.go('1');//way-1 to go forward
        cy.go('forward')//way-2 to go forward

    });

    it('reload page', () => {

        cy.visit('https://www.google.co.in/');
        cy.wait(4000);
       cy.reload();
    });
});

