
//! Understanding get() and its options
//! Working when get() yields multiple elements- eq(), each()
//! What happens if a get()/find()/contains() yields multiple elements and we action on it  e.g. -click, type etc.:: WILL GET ERROR
//! Working with find() command
//! Difference between get() and find()
//! Working with contains() command - use for enclosed texts only!!!
//! Working with within() command.

describe('Understanding get() command', () => {

    //! Get one or more DOM elements by selector.

    it('understanding get() options :: log', () => {

        cy.visit('http://www.webdriveruniversity.com/Contact-Us/contactus.html');
        //dont print the get command on Command log
        cy.get("input[type='submit']", { log: false }).click();

    });

    //! DEFAULT COMMAND TIMEOUT IN CYPRESS IS 4 SECONDS i.e. 4000 ms

    context('explicit timeout using timeout option :: timeout', () => {

        it('scenario-1 on explicit timeout', () => {

            cy.visit('https://qavbox.github.io/demo/delay/');
            cy.get('#one>input').click();
            //below code will fail with default timeout of 4 sec as text comes after 5 sec in AUT.
            cy.get('#two', { timeout: 10000 }).should('have.text', 'I am here!')

        });

        it('scenario-2 on explicit timeout', () => {

            cy.visit('https://qavbox.github.io/demo/delay/');
            cy.get('#loaderStart').click();
            //Make sure after cliking start button, loader appears
            cy.get('#loader').should('be.visible');
            //Make sure after 5 seconds loader is gone.
            cy.get('#loaderdelay', { timeout: 6000 }).should('be.visible');
            //Make sure loader disappears, after 5 seconds
            cy.get('#loader').should('be.hidden');

        });

    });


    it('search element within a scoped DOM :: withinSubject', () => {

        cy.visit('https://qavbox.github.io/demo/signup/');
        cy.get('#email', { withinSubject: document.getElementById('container') }).type('auu.auu@gmail.com');

    });

    context('understanding eq() & each() ', () => {

        it('get() yielding multiple elements : understanding eq() & each()', () => {

            cy.visit('https://qavbox.github.io/demo/listitems/');

            cy.get('#mygroup ~p').should('have.length', 4);
            cy.get('#mygroup ~p').eq(0).should('have.text', ' Paragraph 1 ');
            cy.get('#mygroup ~p').eq(1).should('have.text', ' Paragraph 2 ');
            cy.get('#mygroup ~p').eq(2).should('have.text', ' Paragraph 3 ');
            cy.get('#mygroup ~p').eq(3).should('have.text', ' Paragraph 4 ');

            //how to iterate over a list of elements returned from get()

            cy.get('#mygroup ~p').each(($el, index, $list) => {

                //print me the text of each paragraph with its position (assume it as index+1)

                cy.log(`The text is : ${$el.text()} present at position ${index + 1}`);

            })
        });

        it('get() yielding multiple elements, then action without eq() or each()', () => {

            cy.visit('http://omayo.blogspot.com/');
            //the webpage contains 9 matching elements with locator-'input[type='text']'
            //user types without using eq() or each() for selecting a particular element from list of elements.
            cy.get("input[type='text']").type('Stars shine bright');
            cy.wait(3000);

            //! CYPRESS ERROR: "cy.type() can only be called on a single element. Your subject contained 9 elements."

        });

        it('Breaking out `.each` loop in `Cypress`- return false from each() block', () => {

            //the list has 5 elements:
            // Coffee
            // Tea
            // Milk
            // Espresso
            // Sugar
            //My aim is to print item names BUT also to break the each() block as soon as I get "Milk".

            cy.visit('http://www.webdriveruniversity.com/Data-Table/index.html');
            cy.get('.container>div:nth-of-type(9)>div>ul:nth-of-type(1)>li').each(($el, index, list) => {

                cy.log($el.text())
                if ($el.text().includes('Milk')) {
                    //! return false from each() block to break further execution of loop.
                    return false;
                }
            })
        });

    });


    context('understanding find() method', () => {

        //! find() is used to - Get the descendent DOM elements of a specific selector.

        //! difference between get() and find() :
        //! The cy.get() command always starts its search from the cy.root element. In most cases, 
        //! it is the document element, unless used inside the .within() command. 
        //! The .find command starts its search from the current subject on which it is chained.
        //!? https://docs.cypress.io/api/commands/get#Get-vs-Find

        it('working with command : find()', () => {

            cy.visit('https://automationteststore.com/');

            //click on 'a[title='Skinsheen Bronzer Stick']' within the DOM returned by get('#block_frame_featured_1769 .list-inline')

            cy.get('#block_frame_featured_1769 .list-inline')
                .find("a[title='Skinsheen Bronzer Stick']").click();

        });

        //* eq() and each() method can also be chained on find() if it yields multiple elements

        it('find() comand with eq() & each()', () => {

            cy.visit('https://automationteststore.com/');

            //find all anchor tags inside .headerstrip_blocks and print its enclosed texts .

            cy.get('.headerstrip_blocks').find('a').each(($eq, index, arr) => {
                cy.log($eq.text());
            })

        });


    });

    context('understanding contains() method', () => {

        //! Get the DOM element containing the ENCLOSED TEXT ONLY !!!
        //! syntax : CAN BE USED DIRECTLY WITH CY OR CAN BE CHAINED AS WELL.

        it('working with command : contains() with cy', () => {

            //yield me an element with text as 'Home' in entire document and then click.
            cy.visit('http://omayo.blogspot.com/');
            cy.contains('Home').click();
            cy.wait(3000);

        });

        it('working with command : contains() with get()/find()', () => {

            //yield me an element with text as ' Selenium143 ' in #HTML3 and then click on it.
            cy.visit('http://omayo.blogspot.com/');
            cy.get('#HTML3').contains(' Selenium143 ').click();
            cy.wait(3000);

        });

        it('passing selector in contains() method', () => {

            //? https://docs.cypress.io/api/commands/contains#Specify-a-selector-to-return-a-specific-element
            cy.visit("http://omayo.blogspot.com/#");
            cy.contains("div[id='sidebar-right-1']", 'Orange').find("div[id='HTML29']").should('exist');

        });

    });

    context('understanding within() method', () => {

        //! Scopes all subsequent cy commands to within this element. 
        //! inside within block, get() refers to the parent DOM only.

        it('working with command : within()', () => {

            cy.visit("http://omayo.blogspot.com/#");
            cy.get("form[name='form1']").within(($eq) => {

                //we will have access to DOM element 'form[name='form1']' if needed.
                //inside within block, get() refers to the parent DOM only and
                // will not search from root node.

                cy.get("input[type='text']").type('Abhishek');
                cy.get("input[type='password']").type('okaboka123');
                cy.contains(' LogIn ').click();
            })

        });


        it('temporarily escape the .within context', () => {

            //! We can temporarily escape the .within context by starting a new command chain with
            //! cy.root  followed by .closest commands.

            cy.visit("http://omayo.blogspot.com/#");
            cy.get("form[name='form1']").within(($eq) => {

                //access from within block
                cy.get("input[type='text']").type('Abhishek');

                // temporarily escape the .within context
                //! closest() can find ancestor only.
                cy.root().closest("#main").contains('playing').type('{selectAll}').type('{backspace}');

                // again coming back to access from within block
                cy.get("input[type='password']").type('okaboka123');
                cy.contains(' LogIn ').click();

            })
        });
    });

});