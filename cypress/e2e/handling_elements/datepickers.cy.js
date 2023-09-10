
//! Automating date-picker

describe('automating date picker', () => {
    it('select date 20 Feb 2025', () => {

        cy.visit('http://www.webdriveruniversity.com/Datepicker/index.html');
        cy.get("input[type='text']").click();

        //wait for date picker table to fully present on the page.
        cy.get('.datepicker').should('be.visible');

        //fetch date already present i.e. current date (in this test website)
        cy.get("input[type='text']").invoke('val').then((value) => {

            const fetchedDate = new Date(value);

            //select the date you want in below varaiable in format : "02-20-2021"
            const dateToBeSelected = new Date("02-20-2021");
            const month_yearToBeSelected = dateToBeSelected.toLocaleString('default', { month: 'long' })
                + " " + dateToBeSelected.getFullYear();
            const dayToBeSelected = dateToBeSelected.getDate().toString();

            //write a function to select desired month and year.
            function selectDesiredMonthAndYear() {

                //select proper month and year first which will include that months calendar in then() block.
                cy.get("table[class=' table-condensed'] th[class='datepicker-switch']").then(($el) => {

                    //logic if present fetched date is before desired date-> press next button.
                    if (dateToBeSelected > fetchedDate) {
                        cy.log($el.text())
                        if ($el.text() !== month_yearToBeSelected) {
                            cy.get("table[class=' table-condensed'] th[class='next']").click();
                            selectDesiredMonthAndYear(); //recursive call to function
                        }
                    }

                    //logic if present fetched date is after desired date-> press prev button.
                    if (dateToBeSelected < fetchedDate) {
                        if ($el.text() !== month_yearToBeSelected) {
                            cy.get("table[class=' table-condensed'] th[class='prev']").click();
                            selectDesiredMonthAndYear(); //recursive call to function
                        }
                    }
                })

            }

            //write a function to select desired date in the calendar that was selected in 
            //function - selectDesiredMonthAndYear()
            function selectDayOfMonth() {

                //logic to find the actual date in the calendar of the correct desired
                //month and year that we fetched in first then() block.
                cy.get(".datepicker-days tbody>tr>td[class='day']").each(($el, index, list) => {

                    cy.log($el.text())
                    if ($el.text() === dayToBeSelected) {
                        cy.wrap($el).click();
                        // return false to break the each() loop as soon as the DATE is found & clicked above.
                        return false;
                    }
                })
            }
            //call the functions
            selectDesiredMonthAndYear();
            selectDayOfMonth();

        });
    });
})