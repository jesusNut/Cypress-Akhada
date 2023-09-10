
/**================================================================================================
 *!                                🍌🍌🍌 SCREENSHOTS AND VIDEOS 🍌🍌🍌
 *================================================================================================**/

//? https://docs.cypress.io/guides/references/configuration#Screenshots
//? https://docs.cypress.io/api/commands/screenshot#Usage
//? https://docs.cypress.io/guides/guides/screenshots-and-videos#Screenshots

/**================================================================================================
 *!                                        DEFAULT BEHAVIOR- SCREENSHOT
 *================================================================================================**/

 //* Cypress will automatically capture screenshots WHEN A FAILURE HAPPENS during 'cypress run'.
 //! Screenshots on failure ONLY - CANNOT BE taken during 'cypress open'.

 //todo###  To take a manual screenshot while using 'cypress open'/'cypress run' :: you can use the cy.screenshot() command in code of tests.

 //* Screenshots are stored in the screenshotsFolder which is set to 'cypress/screenshots' by default.

 //* Cypress clears any existing screenshots before 'cypress run' & NOT 'cypress open'. 
 //* If you do not want to clear your screenshots folder before a run, you can set trashAssetsBeforeRuns to false.

/**================================================================================================
 *!                                        DEFAULT BEHAVIOR- VIDEOS
 *================================================================================================**/


 //? 💥💥💥💥 ------ VERY VERY IMPORTANT CHANGES IN VERSION 13 ------ 💥💥💥💥 
 //?  https://docs.cypress.io/guides/references/changelog#13-0-0

//todo#######  Cypress will start recording videos only if it is running from the command line i.e via cypress run.

//*  Cypress records a video for each spec file when running tests during cypress run. (Till version 12).
//!  Videos CANNOT BE recorded during cypress open.

//* Videos are stored in the videosFolder which is set to cypress/videos by default.

//* Cypress clears any existing videos before a cypress run. 
//* If you do not want to clear your videos folder before a run, you can set trashAssetsBeforeRuns to false.


/**================================================================================================
 *!                                        DEMO
 *================================================================================================**/


describe('Manual Screenshots via cypress open (UI)', () => {
    it('Taking a screenshot- webpage & elements- as per user\'s need', () => {

        cy.visit('https://www.webdriveruniversity.com/Contact-Us/contactus.html');
        cy.get("input[placeholder='First Name']").type('Mohak').screenshot(); //screenshot of specific element
        cy.get("input[placeholder='Last Name']").type('Mangal').screenshot(); //screenshot of specific element
        cy.get("input[placeholder='Email Address']").type('Mohak.Mangal@zhootube.com').screenshot(); //screenshot of specific element
        cy.get("textarea[placeholder='Comments']").type('Abhishek is always the best!!!').screenshot(); //screenshot of specific element
        cy.get("input[value='SUBMIT']").click();
        //cy.screenshot(); //### full page screenshot
        //### When capture = 'runner', the entire browser viewport, including the Cypress Command Log, is captured.
        //cy.screenshot({capture: 'runner'}); 
        cy.screenshot('finalScreenshot'); //### screenshot with specified name.
        //cy.screenshot('my/nested/finalScreenshot');//### Take a screenshot and save in a specific directory

    });


    it('Dummy test - 2- created to fail', () => {

        cy.visit('https://www.webdriveruniversity.com/Contact-Us/contactus.html');
        cy.get("input[placeholder='First Name']").type('Mohak')
        cy.get("input[placeholder='Last Name']").type('Mangal')
        cy.get("input[placeholder='Email Address']").type('Mohak.Mangal@zhootube.com')
        cy.get("textarea[placeholder='Comments']").type('Abhishek is always the best!!!')
        cy.get("input[value='SUBMI']").click();
        cy.screenshot('namedscreehot');

    });

});




