//! handling textboxes, textareas, input='text' etc.
//!----------------------------------------------------

//* scenarios covered:

//* 1. Input box + HAVE value attribute + Pre-filled text- invoke() method
//* 2. Input box + NO value attribute + Pre-filled text- invoke() method
//* 3. Input box + NO value attribute + entered text- invoke() method
//* 4. Clear the already filled data and type something and assert entered data. - clear() method
//* 5. Enter text into disabled textbox.
//* 6. Simulating keypress.

describe('WORKING WITH TEXTBOXES', () => {
    it('Input box + HAVE value attribute + Pre-filled text- invoke() method', () => {

        // Invoke the 'val' jquery function

        cy.visit('http://omayo.blogspot.com/#');
        cy.get('#rotb').invoke('val').then((myValue) => {
            cy.log(myValue);
            expect(myValue).to.equal('ReadThisText');
        })
    });

    it('Input box + NO value attribute + Pre-filled text- invoke() method', () => {

        // Invoke the 'val' jquery function

        cy.visit('http://omayo.blogspot.com/#');
        cy.get('#HTML11 > .widget-content > textarea').invoke('val').then((myValue) => {
            cy.log(myValue);
            expect(myValue).to.equal('The cat was playing in the garden.\n');
        })
    });

    it('Input box + NO value attribute + entered text- invoke() method', () => {

        // Invoke the 'val' jquery function

        cy.visit('http://omayo.blogspot.com/#');
        cy.get("form[name='form1']>input[type='text']").type('Abhishek').invoke('val').then((myValue) => {
            cy.log(myValue);
            expect(myValue).to.equal('Abhishek');
        })
    });

    it('Clear the already filled data and type something and assert entered data', () => {

        // Invoke the 'val' jquery function

        cy.visit('http://omayo.blogspot.com/#');
        cy.get("#HTML11 textarea").as('prefilledTextBox');
        cy.get('@prefilledTextBox').clear().type('Abhishek..is he even a human!!');
        cy.get('@prefilledTextBox').invoke('val').then(($text)=>{

            expect($text).is.equal('Abhishek..is he even a human!!');
        })
    });

    context('Simulating keypress', () => {
        it('enter text and press enter', () => {

            cy.visit('https://fs2.formsite.com/meherpavan/form2/index.html?1537702596407');
            cy.get("#RESULT_TextField-1")
            .type('{shift}Abhishek..is he even a human!!')
            .type('{enter}');
            
        });
    });
});


