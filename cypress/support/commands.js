// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


//☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️


//! 👽👽👽 writing a few custom commands for https://www.saucedemo.com/v1/

// 🧔🏻🧔🏻🧔🏻 parent command
// login to saucedemo app.

Cypress.Commands.add('loginToSauceDemoApp', (email, password) => {
    cy.get('#user-name').as('username').should('be.visible');
    cy.get('#password').as('password').should('be.visible');
    cy.get('@username').type(email);
    cy.get('@password').type(password);
    cy.get('#login-button').should('be.visible').click();

})

//👶👶👶 child command
//ex-1 : log text of an element

Cypress.Commands.add('logTextOfElementInUpperCase', { prevSubject: 'element' }, (subject) => {
    cy.wrap(subject, { log: false }).invoke({ log: false }, 'text').then((fetchedText) => {

        if (String(fetchedText).length === 0) {
            cy.log('THIS ELEMENT DOES NOT CONTAINS TEXT')
        }
        else
            cy.log(String(fetchedText).toUpperCase());
    })
})


//👶👶👶 child command
//ex-2 : display number of elements fetched by a query

Cypress.Commands.add('logNumberOfElementsFetched', { prevSubject: true }, (arrayOfElements) => {

    cy.wrap(arrayOfElements, { log: false }).then((arrayOfElements) => {
        cy.log(`This query fetched ${arrayOfElements.length} elements`);
    })

})


//! 👽👽👽 writing a custom commands to demonstrate concept of cy.session()- cypress/e2e/Miscellaneous/cypress_sessions.cy.js
// code for'https://react-redux.realworld.io'
Cypress.Commands.add('login', (username, password) => {
    cy.session([username, password], () => {
        cy.visit('/#/login');
        cy.get("input[placeholder='Email']").type(username);
        cy.get("input[placeholder='Password']").type(password);
        cy.get("button[type='submit']").click({ force: true });
        cy.wait(3000)
    },
        { cacheAcrossSpecs: false })
})

//! 👽👽👽 writing a custom commands to visit to 'https://react-redux.realworld.io' for framework - cypress/e2e/conduit_POM_tests/*.cy.js

Cypress.Commands.add('navigateToFrameworkUrl', () => {
    cy.visit('/'); //will take value from global base url coming from-> cypress.config.js.
})


//! 👽👽👽 writing a custom commands to read excel file. demoed @ cypress\e2e\read_write\read_writeExcel.cy.js

Cypress.Commands.add("parseXlsx", (inputFile) => {
    return cy.task("parseXlsx", { filePath: inputFile });
  });

  //! 👽👽👽 writing a custom commands to CONVERT excel file to JSON. demoed @ cypress\e2e\read_write\read_writeExcel.cy.js
 //written specifically for : https://www.webdriveruniversity.com/Contact-Us/contactus.html

 Cypress.Commands.add("convertExcelToJSONForWebDriverUNiContactUs", (excelfilepath, jsonfilepath) => {

    cy.parseXlsx(excelfilepath)
    .then((excelData) => {
        cy.log(excelData); //[{nameof sheet, data}]
        let actualData = excelData[0].data; //this will give me all of the data.
        cy.log(actualData)
        let rowLength = excelData[0].data.length; //this will give me number of rows
        cy.log('Total number of rows are : ' + rowLength);
        let columnLength = excelData[0].data[0].length;
        cy.log('Total number of rows are : ' + columnLength); //this will give me number of columns

        //iterate row wise data and check in console

        // for (let i = 0; i < rowLength; i++) {
        //     cy.log(excelData[0].data[i])
        // }

        //! 🔰🔰🔰🔰 Change the data from excel to JSON 🔰🔰🔰🔰
        // So that we can put it in fixtures and use it.
        //Here, my excel sheet is placed at : cypress\e2e\read_write\resources\work-with-excel-demo\excelData.xlsx
        //AND, my desired JSON by converting excel will be placed at : cypress\fixtures\work-with-excel-demo\excelConvertedJSON.json
        //! ♻️♻️ ♻️  THERE NEEDS TO BE A FILE IN ORDER TO BE WRITTEN, CYPRESS WONT AUTOMATICALLY CREATE JSON FILE AFTER CONVERSION. ♻️ ♻️ ♻️ 

        //STEP 1 :  is to create array '[]' in the intended JSON file.
        cy.writeFile(jsonfilepath, "[]");

        //STEP 2: Iterate each row, and for each row write down entire desired object.
        //for each iteration get value for all 4 properties - firstname, lastname, email and comments.
        //? https://docs.cypress.io/api/commands/writefile#Append-contents-to-the-end-of-a-file
        actualData.forEach(rowWiseData => {

            cy.readFile(jsonfilepath).then((list) => {
                list.push(
                    {
                        "firstname": rowWiseData[0],
                        "lastname": rowWiseData[1],
                        "email": rowWiseData[2],
                        "comments": rowWiseData[3]
                    }
                );
                cy.writeFile(jsonfilepath, list);
            })

        })
    })
  });
