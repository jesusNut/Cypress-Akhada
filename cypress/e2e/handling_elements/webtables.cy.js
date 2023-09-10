
//! Handling web tables

describe('Handling WebTables', () => {

    beforeEach(() => {
        //Login to app

        cy.visit('https://demo.opencart.com/admin/index.php?route=common/login');
        cy.get('#input-username').type('demo');
        cy.get('#input-password').type('demo');
        cy.get("button[type='submit']").click();
        cy.url().should('contain', '/dashboard');
        cy.get('body').then((body) => {
            console.log(body.find('.modal-content'))
            if (body.find('.modal-content').length > 0)
                cy.get('.btn-close').click()
        })
        cy.get(".parent.collapsed[href='#collapse-5']").click();
        cy.get('#menu-customer>ul>li:nth-of-type(1)>a').click();

    });
    it('check no. of rows and columns on each pagination', () => {

        //count the number of rows and columns and then assert

        cy.get('#form-customer tbody>tr').then(($el) => {
            cy.log(`Table consists of ${$el.length} rows`);
            expect($el.length).to.equal(10);
        })

        cy.get('#form-customer tbody>tr').first().find('td').then(($el) => {
            cy.log(`Table consists of ${$el.length} columns`);
            expect($el.length).to.equal(7);
        })
    });

    it('Read all rows and columns in the first page', () => {

        cy.get('#form-customer tbody>tr').each(($el, index, list) => {
            cy.wrap($el).find('td').each(($cel, cindex, clist) => {
                cy.wrap($cel).then(($eel) => {
                    cy.log($eel.text());
                })
            })
        })
    });

    it('pagination', () => {

        // step 1: count totall number of pages.
        // for demo 3 pages are considered.

        //?https://youtu.be/uDpJsk4ReuY?list=PLUDwpEzHYYLvA7QFkC1C0y0pDPqYS56iU&t=2364


    });

});

describe('Condition testing scenarios', () => {
    it('condition testing scenario on web table', () => {

        //if the last name of person is Jackson, validate that his age is 56.
        cy.visit('http://www.webdriveruniversity.com/Data-Table/index.html#');
        cy.get('#t02>tbody>tr>td:nth-of-type(2)').each(($el) => {

            cy.log(`The value is : ${$el.text()}`);
            if ($el.text() === 'Jackson') {
                cy.log(` #### Match found for : ${$el.text()}`);
                cy.wrap($el).parent('tr').find('>td:nth-of-type(3)').should('have.text', '56');
            }
        })
    });
});

describe('Dynamic tables', () => {
    it('handling dynamic tables', () => {

        // Scenario:
        // For Chrome process get value of CPU load.
        // Compare it with value in the yellow label.

        cy.visit('http://uitestingplayground.com/dynamictable');
        cy.get('#table_desc').siblings('div').contains('Chrome').as('spanWithChrome').should('be.visible');
        cy.get('@spanWithChrome').parent().contains('%').as('spanWithCPULoad').then(($el) => {
            cy.get('.bg-warning').invoke('text').then((value) => {
                expect(value).to.contain($el.text());
            })
        });
    });
});
