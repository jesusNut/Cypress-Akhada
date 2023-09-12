
/**================================================================================================
 *!                 Understandng cy.task()

      cy.task(event)
      cy.task(event, arg)
      cy.task(event, arg, options)
 *================================================================================================**/

/**================================================================================================
 ** In general the pre-processor bundles the cypress JS code and executes it inside the browser 
//* in the same context as that of the AUT. The cypress tests (JS) are then executed by the 
//* browser in the JS engine embbeded in the browser. BUT these browser JS engines do not have 
//* APIs to handle file reading, databases etc. For that, the JS engine needed is NODE JS.
//* SO, cypress has this concept of task.These tasks are defined in cypress.config.js and then
//* these tasks are accessed in tests as - cy.task('taskName'). Once the cypress sees that some 
//* task/event is passed inside the cy.task(), that task or event is then executed on NODE JS and 
//* not on default browser JS engine.
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