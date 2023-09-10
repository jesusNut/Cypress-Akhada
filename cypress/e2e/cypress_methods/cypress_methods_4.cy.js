//! children()
//! filter()
//! not()
//! its()
//! first()
//! focused()
//! last()
//! next()
//! nextAll()
//! parent()
//! prev()
//! prevAll()
//! prevUntil()
//! root()
//! siblings()
//! shadow()


describe('understanding query methods', () => {
    it('children()', () => {

        cy.visit('http://omayo.blogspot.com/');

        //print all the children elements
        cy.get('#HTML25').children().each(($el, index, list) => {
            cy.log($el);
        })

        //! children elements retain their nested elements also.
        cy.get('#HTML25').children().eq(1).find('ol').then(($el) => {
            cy.log($el.text());
        })
    });

    it('filter()', () => {

        //filters within a set of DOM elements and yield element(s).
        cy.visit('http://omayo.blogspot.com/');

        //get list of all divs under #main,then filter div with id as Blog1
        cy.get("#main>div").filter("#Blog1").each(($el, index, list) => {
            cy.log($el)
        })

        //get list of all lis in #HTML25 and then find li which contains text as 'Three'
        //! usage of  jQuery :contains method.

        cy.get("#HTML25>div>ol>li").filter(':contains("Three")').each(($el, index, list) => {
            cy.log($el)
        })

    });

    it('not()', () => {

        //opposite of filter()
        cy.visit('http://omayo.blogspot.com/');

        //get list of all divs under #main,then filter all divs without id as Blog1
        cy.get("#main>div").not("#Blog1").each(($el, index, list) => {
            cy.log($el)
        })
    });

    context('its()', () => {

        it('Validate count of elements on webpage', () => {

            cy.visit('https://books.toscrape.com/');
            cy.get('.product_pod').then(($el) => {
                cy.wrap($el).its('length').should('eq', 20);
            })

        });

        it('Get the length property of a DOM element- with ul/ol', () => {

            cy.visit('http://omayo.blogspot.com/');
            cy.get('#HTML26 ul li').its('length').should('eq', 6);
        });

        it('Get length of title', () => {

            cy.visit('http://omayo.blogspot.com/');
            cy.title().its('length').should('be.greaterThan', 16);
            //other way without it
            //cy.title().should('have.length.greaterThan',18);
        });

    });

    it('first()', () => {

        //Get the first DOM element within a set of DOM elements.
        cy.visit('http://omayo.blogspot.com/');
        cy.get('#LinkList1 div ul').find('li').first().click();
    });

    it('last()', () => {

        //Get the last DOM element within a set of DOM elements.
        cy.visit('http://omayo.blogspot.com/');
        cy.get('#LinkList1 div ul').find('li').last().click();
    });

    it('next()', () => {

        //Get the immediately following sibling of each DOM element within a set of DOM elements.
        cy.visit('http://omayo.blogspot.com/');
        cy.get('#HTML25 div ol li').first().should('have.text', 'One')
            .next().should('have.text', 'Two')
            .next().should('have.text', 'Three');
    });

    it('nextall()', () => {

        cy.visit('http://omayo.blogspot.com/');
        //print text of all lis after the li which has text 'Three'
        cy.get('#HTML25 div ol li').filter(':contains("Three")').nextAll().each(($el, index, list) => {
            cy.log($el.text());
        })

    });

    it('nextUntil()', () => {

        //Get all following siblings of each DOM element in a set of matched DOM elements up to,
        // but not including, the element provided.

        cy.visit('http://omayo.blogspot.com/');
        //print text of lis between li having text - Two to Four i.e between lis having text One to Five.
        cy.get('#HTML25 div ol li').first().should('have.text', 'One')
            .nextUntil(':contains("Five")').each(($el, index, list) => {
                cy.log($el.text());
            })
    });

    it('parent()', () => {

        //Get immediate parent
        cy.visit('http://omayo.blogspot.com/');
        cy.get("form[name='form1']").parent().parent().should('have.id', 'HTML31');

    });

    it('prev()', () => {

        //Get the immediately preceding sibling of each element in a set of the elements.
        cy.visit('http://omayo.blogspot.com/');
        cy.get('#HTML25 div ol li').last().should('have.text', 'Six')
            .prev().should('have.text', 'Five')
            .prev().should('have.text', 'Four');

    });

    it('prevAll()', () => {

        //Get the immediately preceding sibling of each element in a set of the elements.
        cy.visit('http://omayo.blogspot.com/');

        //get text of all lis from last li having text Six.
        cy.get('#HTML25 div ol li').last().should('have.text', 'Six')
            .prevAll().each(($eq, index, list) => {
                cy.log($eq.text())
            })
    });

    it('prevUntil()', () => {

        //Get all preceding siblings of each DOM element in a set of matched DOM elements up to,
        // but not including, the element provided.

        cy.visit('http://omayo.blogspot.com/');
        //print text of lis between li having text - Five to Three.
        cy.get('#HTML25 div ol li').last().should('have.text', 'Six')
            .prevUntil(':contains("Two")').each(($el, index, list) => {
                cy.log($el.text());
            })
    });

    it('root ()- temporarily escape the .within context', () => {

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

    it('siblings()', () => {

        // Get all sibling DOM elements of an element
        cy.visit('http://omayo.blogspot.com/');

        //get text of all siblings of first li.
        cy.get('#HTML25 div ol li').first().siblings().each(($eq, index, list) => {

            cy.log($eq.text());
        });

        //get text of all siblings of last li.
        cy.get('#HTML25 div ol li').last().siblings().each(($eq, index, list) => {

            cy.log($eq.text());
        });

        //get text of all siblings of li with text Three.
        cy.get('#HTML25 div ol li').filter(':contains("Three")').siblings().each(($eq, index, list) => {

            cy.log($eq.text());
        });

    });

    context('shadow()', () => {

        it('accessing element inside shadow DOM', () => {

            cy.visit('https://qaboxletstestcypresspracticesite.netlify.app/shadowdom');
            cy.get('button').click();
            //!! shadow() is chained and the preceding DOM returning method should contain selector for Shadow Host.
            cy.get('#shadowHost').shadow().find('#name').type('Ankushh')
        });
    });

});