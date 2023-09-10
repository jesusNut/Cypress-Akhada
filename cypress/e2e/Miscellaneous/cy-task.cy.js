
/**================================================================================================
 *!                 Understandng cy.task()

      cy.task(event)
      cy.task(event, arg)
      cy.task(event, arg, options)
 *================================================================================================**/

//? https://www.youtube.com/watch?v=BhWaarUEvck&t=19s
//? https://docs.cypress.io/api/commands/task  

describe('demo of cy.task()', () => {

    //https://docs.cypress.io/api/commands/task#Save-a-variable-across-non-same-origin-URL-visits
   //! 🥶🥶🥶🥶 see the code implemented in cypress.config.js 🥶🥶🥶🥶

    it('block 1: Save a variable across non same-origin URL visits', () => {

        //fetch a href of a link from a site visisted in this it block and
        //then use the same file in an other it block.

        cy.visit('http://omayo.blogspot.com/');
        cy.get("a[href='http://only-testing-blog.blogspot.in/2014/01/textbox.html']")
            .invoke('attr', 'href').then((hrefValue) => {
                cy.task('setHref', hrefValue);
            })
    });

    it('block 2: Save a variable across non same-origin URL visits', () => {

        //use the fetched href of  link from a site visisted in first it block and
        //then use the same file in this it block.

        cy.visit('https://www.webdriveruniversity.com/Contact-Us/contactus.html');
        cy.task('getHref').then((fetchedhrefValue) => {
            cy.get("input[placeholder='Email Address']").type(fetchedhrefValue);
        })
    });

});