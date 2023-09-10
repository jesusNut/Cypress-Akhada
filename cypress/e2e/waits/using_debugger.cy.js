

//! debugger command ->
//! used to debug cypress code in developer console.

//?https://www.youtube.com/watch?v=hMAXX9k1q-Q

describe('demo', () => {
    it('demo-1', () => {

        cy.visit('http://omayo.blogspot.com/');
        cy.get('#HTML25>div:nth-of-type(1)>ol>li').each(($el) => {
            debugger
            console.log($el.text());
        })
    });
});