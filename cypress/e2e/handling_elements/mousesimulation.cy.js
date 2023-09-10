
//! simulating mouse actions - trigger('<event>') method


//? https://docs.cypress.io/api/commands/trigger
//? ADVANCED CONCEPTS : https://www.youtube.com/watch?v=AfDk3YYhTQQ&list=PLMZdod-kiMhKiRztQX_rng7EfcI5OteMR&index=15
//? ADVANCED CONCEPTS : https://www.youtube.com/watch?v=pr_TC6wXOiM&list=PLMZdod-kiMhKiRztQX_rng7EfcI5OteMR&index=16

//* Mouse hover
//* Right click
//* Double click
//* Drag and Drop
//* Click and hold
//* ToolTip
//* Toast messages
//* Different level menus
//* Sliders


describe('mouse actions', () => {

    it('MOUSE-HOVER- trigger(\'mouseover\')', () => {

        //? https://docs.cypress.io/api/commands/hover
        cy.visit('https://qaboxletstestcypresspracticesite.netlify.app/mouseevents');
        cy.get('#msover').as('hoverBtn')
        cy.get('@hoverBtn').trigger('mouseover').then(() => {
            cy.get('#show').should('be.visible');
        });
    });
    it('MOUSE-HOVER- *** BEST WAY *** - using plugin- "cypress-real-events"', () => {

        cy.visit('https://qaboxletstestcypresspracticesite.netlify.app/mouseevents');
        cy.get('#msover').as('hoverBtn')
        cy.get('@hoverBtn').realHover();
        cy.get('#show').should('be.visible');
    });

    it('RIGHT CLICK - rightclick() method', () => {
        cy.visit('https://qaboxletstestcypresspracticesite.netlify.app/mouseevents');
        cy.get('#rightclick').rightclick();
    });

    it('RIGHT CLICK - trigger(\'contextmenu\')', () => {
        cy.visit('https://swisnl.github.io/jQuery-contextMenu/demo.html');
        //verify context menu items not present before right click
        cy.get('.context-menu-list>li:first-child').should('not.be.visible');
        cy.get('.context-menu-list>li:last-child').should('not.be.visible');
        //right click
        cy.get('p>span').trigger('contextmenu');
        //verify
        cy.get('.context-menu-list>li:first-child').should('be.visible');
        cy.get('.context-menu-list>li:last-child').should('be.visible');
    });

    it('DOUBLE CLICK - dblclick()', () => {

        cy.visit('http://www.webdriveruniversity.com/Actions/index.html');
        //check background color before double click
        cy.get('#double-click').invoke('css', 'background-color').should('eq', 'rgb(254, 196, 45)');
        //double click
        cy.get('#double-click').dblclick();
        //verify background color changed
        cy.get('#double-click').invoke('css', 'background-color').should('eq', 'rgb(147, 203, 90)');

    });

    it('DOUBLE CLICK - trigger(\'dblclick\')', () => {

        cy.visit('http://www.webdriveruniversity.com/Actions/index.html');
        //check background color before double click
        cy.get('#double-click').invoke('css', 'background-color').should('eq', 'rgb(254, 196, 45)');
        //double click
        cy.get('#double-click').trigger('dblclick');
        //verify background color changed
        cy.get('#double-click').invoke('css', 'background-color').should('eq', 'rgb(147, 203, 90)');

    });

    it('DRAG AND DROP - using plugin called - "cypress-drag-drop" ', () => {

        cy.visit('http://www.webdriveruniversity.com/Actions/index.html');
        cy.get('#draggable').drag('#droppable>p>b', { force: true });

    });

    it('DRAG AND DROP - traditional way', () => {

        cy.visit('http://www.dhtmlgoodies.com/scripts/drag-drop-custom/demo-drag-drop-3.html');
        //mouse down using left mouse button
        cy.get('#box3').trigger('mousedown', { button: 0 });
        cy.get('#box103').trigger('mousemove').trigger('mouseup');

    });

    it('CLICK AND HOLD', () => {

        cy.visit('http://www.webdriveruniversity.com/Actions/index.html');
        cy.get('#click-box').trigger('mousedown', { button: 0 });
        cy.get('#click-box').should('have.css', 'background-color', 'rgb(0, 255, 0)');
        cy.wait(3000);
        cy.get('#click-box').trigger('mouseup', { button: 0 });
        cy.get('#click-box').should('have.css', 'background-color', 'rgb(255, 99, 71)');


    });

    it('TOAST MESSAGES', () => {

        cy.visit('https://codeseven.github.io/toastr/demo.html');
        cy.get('#title').type('James Bond');
        cy.get('#message').type('is nothing in front of me');
        cy.get("#toast-container").should('not.exist');
        cy.get("#showtoast").click();
        cy.get("#toast-container").should('exist');
        cy.get("#toast-container .toast-title").should('have.text', 'James Bond');
        cy.get("#toast-container .toast-message").should('have.text', 'is nothing in front of mee');
    });

    it('DIFFERENT MENU LEVELS', () => {

        cy.visit('http://omayo.blogspot.com/');
        cy.get('#cssmenu>ul>li:last-child>ul>li').should('not.be.visible')
        cy.get('#cssmenu>ul>li:last-child').realHover();
        cy.get('#cssmenu>ul>li:last-child>ul>li').should('be.visible');
        cy.get('#cssmenu>ul>li:last-child>ul>li').last().find('a').realHover().click({force:true});

    });

    context('slider scenarios', () => {

        it('SLIDERS- example 1- input type="range" ', () => {

            cy.visit('https://qaboxletstestcypresspracticesite.netlify.app/slider');
            //set the value of 'value' attribute to desired value using invoke() method
            //and then trigger an event-'change'
            cy.get('#rangeone').invoke('val','100').trigger('change');
            cy.get('#rangeone +p').should('have.text',100);
        });

        
        it('SLIDERS- example 2- any tag with some attribute changing on sliding', () => {

            cy.visit('https://testautomationpractice.blogspot.com/');
            //In this case, set the value of attribute which changes on sliding
            // using invoke() method
            cy.get('#slider>span').invoke('attr','style','left: 50%');
        });

        it('SLIDERS- example 3- any tag with many attributeS changing on sliding', () => {

        cy.visit('https://mui.com/material-ui/react-slider/');
        //In this ex. multiple attributes change their values when user slides.
        //so, just identify those attributes and use invoke() to set those attributes.
        //setting fisrt attribute that should be set.
        cy.get("div[id='demo-:Rhal6kud6:'] span[class='MuiSlider-root MuiSlider-colorPrimary MuiSlider-sizeMedium css-exkjcx']>span:nth-of-type(2)")
        .invoke('attr','style','width: 70%;');
        //setting fisrt attribute that should be set.
        cy.get("div[id='demo-:Rhal6kud6:'] span[class='MuiSlider-root MuiSlider-colorPrimary MuiSlider-sizeMedium css-exkjcx']>span:nth-of-type(3)")
        .invoke('attr','style','left: 70%;');
        //setting third & fourth attribute
        cy.get("div[id='demo-:Rhal6kud6:'] span[class='MuiSlider-root MuiSlider-colorPrimary MuiSlider-sizeMedium css-exkjcx']>span:nth-of-type(3)")
        .invoke('attr','style','left: 70%;');
        cy.get("div[id='demo-:Rhal6kud6:'] span[class='MuiSlider-root MuiSlider-colorPrimary MuiSlider-sizeMedium css-exkjcx']>span:nth-of-type(3)>input")
        .invoke('attr','aria-valuenow','70');
        cy.get("div[id='demo-:Rhal6kud6:'] span[class='MuiSlider-root MuiSlider-colorPrimary MuiSlider-sizeMedium css-exkjcx']>span:nth-of-type(3)>input")
        .invoke('val','70');
            
        });
        
    });
});


