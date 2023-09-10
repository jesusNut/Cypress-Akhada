
//! Handling alerts - cy.on() command
//! Understanding events.

//* 1. JS Alert box- - OK to a warning - event : 	window:alert
//* 2. JS Confirm box- OK or Cancel button present - event : 	window:confirm
//* 3. JS Prompt box - enter text - usage of cy.window() and stub
//* 4. JS Basic auth.

//! #CYPRESS DOESN’T INCLUDE A WINDOW:PROMPT AN EVENT SIMILAR TO OUR ALERTS AND CONFIRMATIONS.

//? https://medium.com/@kbalaji.kks/cypress-alert-prompt-new-window-new-tab-852c44d51387
//? https://www.youtube.com/watch?v=C2DjGl5a_-Y&list=PLMZdod-kiMhKiRztQX_rng7EfcI5OteMR&index=10

describe('handling JS ALERT BOX', () => {
    it('Alert Box- auto accept Ok and content assertion inside alert box - WAY 1', () => {

        cy.visit('https://the-internet.herokuapp.com/javascript_alerts');

        //! automatically OK is clicked and alert is closed by Cypress.
        cy.get("button[onclick='jsAlert()']").click();

        //! asserting message coming on the alert box.
        cy.on('window:alert', (alertText) => {

            expect(alertText).to.be.equal('I am a JS Alert');
            expect(alertText).to.contain('am a');
            expect(alertText).to.contains(' JS Alert');
            expect(alertText).to.includes(' JS Alert');
            expect(alertText).to.includes('I am a');
            expect(alertText).to.have.length.above(14);
            //contain. contains, include, includes are all aliases
        })
    });


    it('Alert Box- auto accept Ok and content assertion inside alert box - WAY 2', () => {

        cy.visit('https://the-internet.herokuapp.com/javascript_alerts');
        const customStub = cy.stub();
        cy.on('window:alert', customStub);

        //! automatically OK is clicked and alert is closed by Cypress.
        cy.get("button[onclick='jsAlert()']").click().then(() => {
            expect(customStub.getCall(0)).to.be.calledWithExactly('I am a JS Alert');
        })
    });

    it('Handling multiple alert boxes at once & its assertions', () => {

        cy.visit('https://qaboxletstestcypresspracticesite.netlify.app/differentalerttypes');
        
        const customStub = cy.stub();
        cy.on('window:alert', customStub);
        
        //! asserting message coming on the all alert boxes.
        cy.get('#miltiplealert').click().then(() => {
            expect(customStub.getCall(0)).to.be.calledWithExactly('First Alert Box');
            expect(customStub.getCall(1)).to.be.calledWithExactly('Second Alert Box');
            expect(customStub.getCall(2)).to.be.calledWithExactly('Third Alert Box');
        })
    });
});

describe('handling JS CONFIRM BOX', () => {
    it('Confirm box- auto accept OK and content validatiion inside confirm box', () => {

        cy.visit('https://the-internet.herokuapp.com/javascript_alerts');

        //! BY DEFAULT, cypress will close this alert by clicking OK.
        cy.get("button[onclick='jsConfirm()']").click();

        //! asserting message coming on the alert box.
        cy.on('window:confirm', (confirmText) => {

            expect(confirmText).to.be.equal('I am a JS Confirm');
            expect(confirmText).to.contain('am a');
            expect(confirmText).to.contains(' JS Confirm');
            expect(confirmText).to.includes(' JS Confirm');
            expect(confirmText).to.includes('I am a');
            expect(confirmText).to.have.length.above(16);
            //contain. contains, include, includes are all aliases

            //validating the text that appear on webpage after clicking OK on confirm box.
            cy.get('#result').invoke('text').then((fetchedText) => {
                expect(fetchedText).to.contain('Ok');
            })
        })

    });

    it('Confirm box- click on CANCEL and content verification inside confirm box', () => {

        cy.visit('https://the-internet.herokuapp.com/javascript_alerts');

        //! BY DEFAULT, cypress WILL NOT CLICK CANCEL on this alert.
        cy.get("button[onclick='jsConfirm()']").click();

        //! Return false from 'window:confirm' event and the confirmation will be canceled.

        cy.on('window:confirm', (confirmText) => {

            //! assert message inside of Confirm box.
            expect(confirmText).to.be.equal('I am a JS Confirm');
            expect(confirmText).to.contain('am a');
            expect(confirmText).to.contains(' JS Confirm');
            expect(confirmText).to.includes(' JS Confirm');
            expect(confirmText).to.includes('I am a');
            expect(confirmText).to.have.length.above(16);
            //contain. contains, include, includes are all aliases

            //!return false to cancel.
            return false;
        })

        //validating the text that appear on webpage after clicking CANCEL on confirm box.
        cy.get('#result').invoke('text').then((fetchedText) => {
            expect(fetchedText).to.contain('Cancel');
        })
    });

});


describe('handling JS PROMPT BOX', () => {

    //! #CYPRESS DOESN’T INCLUDE A WINDOW:PROMPT AN EVENT SIMILAR TO OUR ALERTS AND CONFIRMATIONS.
    //! SO, NO WAY TO VALIDATE THE CONTENT INSIDE THE PROMPT BOX.
    it('prompt box - pass text into prompt box and CLICK OK.', () => {

        //1. Open URL
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts');

        //2. Entering text using event.
        //write this event before clicking the button which opens the prompt box.
        cy.window().then(($win) => {
            cy.stub($win, 'prompt').returns('Hi Abhishek');
        })

        //3. Click on the button which opens prompt box

        //! BY DEFAULT, cypress will close this alert by clicking OK.
        cy.get("button[onclick='jsPrompt()']").click();

        //4. validating the text that appear on webpage after entering text & clicking OK on PROMPT box.

        cy.get('#result').invoke('text').then((fetchedText) => {
            expect(fetchedText).to.contain('Abhishek');
        })
    });

    it('prompt box - CLICK CANCEL without entering text.', () => {

        //1. Open URL
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts');

        //2. Click on CANCEL.
        //write this event before clicking the button which opens the prompt box.
        //! BY DEFAULT, cypress will NOT click CANCEL on this alert.

        cy.window().then(($win) => {
            cy.stub($win, 'prompt').callsFake(() => null);
        })

        //3. Click on the button which opens prompt box
        cy.get("button[onclick='jsPrompt()']").click();

        //4. validating the text that appear on webpage after entering text & clicking OK on PROMPT box.
        cy.get('#result').invoke('text').then((fetchedText) => {
            expect(fetchedText).to.contain('null');
        })
    });
});

describe('handling JS basic auth', () => {
    it('Approach 1: enter username & password and signin', () => {

        cy.visit('https://the-internet.herokuapp.com/basic_auth', { auth: { username: 'admin', password: 'admin' } });

        //verify content on web page after successful login
        cy.get("#content>div>p").invoke('text').then(($text) => {
            expect($text).to.include('Congratulations!')
        })

    });

    it('Approach 2: enter username & password and signin', () => {

        cy.visit('https://admin:admin@the-internet.herokuapp.com/basic_auth');

        //verify content on web page after successful login
        cy.get("#content>div>p").invoke('text').then(($text) => {
            expect($text).to.include('Congratulations!')
        })

    });
});