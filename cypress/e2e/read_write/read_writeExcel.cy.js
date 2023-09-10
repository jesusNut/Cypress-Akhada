

/**================================================================================================
 *!        🏆🏆 READING & WRITING EXCEL FILES IN CYPRESS🏆🏆
 *================================================================================================**/

//? Udemy Joan - approach 1 - demoed here
//? Udemy-Vignesh - approach 2


//! 🤩🤩🤩🤩 use of plugin  : https://www.npmjs.com/package/node-xlsx

//related code @
//1. cypress.config.js
//2. cypress\support\commands.js - using two custom functions: parseXlsx() & convertExcelToJSONForWebDriverUNiContactUs()







describe('Handling Excel using node-xlsx package', () => {

    //! 🟨 🟨 🟨  Writing a  before to convert excel to JSON (& place @ fixtures folder) before any test.

    before(() => {

        let excelFilePath = "cypress\\e2e\\read_write\\resources\\work-with-excel-demo\\excelData.xlsx";
        let convertedJSONFilePath = "cypress\\fixtures\\work-with-excel-demo\\excelConvertedJSON.json";
        cy.convertExcelToJSONForWebDriverUNiContactUs(excelFilePath, convertedJSONFilePath);

    });

    //! 🟨 🟨 🟨  Loading fixture in beforeTest
    beforeEach(() => {
        cy.visit('https://www.webdriveruniversity.com/Contact-Us/contactus.html');
        cy.fixture("work-with-excel-demo/excelConvertedJSON.json").as('testData');
    });

    //! 🟨 🟨 🟨  Tests utilizing excel converted JSON from fixtures.


    it('Tests utilizing excel converted JSON from fixtures', () => {

        cy.get('@testData').each((testDataObj) => {

            cy.get("input[placeholder='First Name']").type(testDataObj.firstname);
            cy.get("input[placeholder='Last Name']").type(testDataObj.lastname);
            cy.get("input[placeholder='Email Address']").type(testDataObj.email);
            cy.get("textarea[placeholder='Comments']").type(testDataObj.comments);
            cy.get("input[value='SUBMIT']").click({ force: true });
            cy.go('back');
            cy.reload();

        })
    });
});
