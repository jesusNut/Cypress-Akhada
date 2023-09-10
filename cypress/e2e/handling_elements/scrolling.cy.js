
//! scrolling an element into view - scrollIntoView()
//! scrolling page - scrollTo

describe('Scrolling scenarios', () => {
    it('scroll an element into view', () => {

        cy.visit('https://www.countries-ofthe-world.com/flags-of-the-world.html');
        //scroll flag of India (I will further Scroll 300px above an element(to bring element in center))
        cy.get('body > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(86) > td:nth-child(2)').scrollIntoView({ offset: { top: -300, left: 0 } });
        
    });

    it('scroll webpage to bottom', () => {
        cy.visit('https://www.countries-ofthe-world.com/flags-of-the-world.html');
        //scroll flag of India (I will further Scroll 300px above an element(to bring element in center))
        cy.scrollTo('bottom');
    });
});

