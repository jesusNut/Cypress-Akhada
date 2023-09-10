
//? https://www.youtube.com/watch?v=k6O-pK__6tw&list=PLMZdod-kiMhKiRztQX_rng7EfcI5OteMR&index=13
//? https://docs.cypress.io/guides/references/configuration#Configuration-File
//? https://www.youtube.com/watch?v=_MtvLZFLPCU
//? + Udemy Gianni Bruno.

/**================================================================================================
 *!              CHANGING CYPRESS CONFIGURATION/DEFAULT-SETTINGS ON DIFFERENT LEVELS  
 *================================================================================================**/


//! 🍌🍌🍌 All configuration options can be changed at 5 scopes:

//* 1. On TEST CASE Level scope.
//* 2. On TEST SUITE/TEST CASE level -> describe/it -2nd arg
//* 3. In scope for the current spec file -> cypress.config()
//* 4. --config change from terminal.
//* 5. On framework level/globally. -> In cypress.config.js or cypress.config.ts

//! 🍌🍌🍌 Navigate to Cypress launchpad->Specs list's Settings->Project settings.
// Value of all settings changed by a user are higlighted in blue if changed from cypress.config.js/ts


//! 🍌🍌🍌 Not all configuration options are avaiable at all levels.
//! 🍌🍌🍌 A cypress config option can be set at two levels in cypress.config.js/ts files

//1. At global level.
//? https://docs.cypress.io/guides/references/configuration#Options

//2. Specifically in e2e or component json object.
//? https://docs.cypress.io/guides/references/configuration#Testing-Type-Specific-Options

//3. dual (e.g -defaultCommandTimeout can be set outside e2e/component section @global or inside either of e2e or component)


//! 🍌🍌🍌 Precedence [demo @ cypress/e2e/waits/changingTimeouts.cy.js ]:

// from >>>>>>>>>>>>> Highest to lowest >>>>>>>>>>>>>>>>>

//*TEST CASE Level >>>>>> TEST SUITE/TEST CASE level -> describe/it -2nd arg >>>>>>current spec file -> cypress.config()>>>>>>>> --config terminal >>>>> cypress.config.js or cypress.config.ts


/**========================================================================
 * *                        BASIC SETTINGS
 *========================================================================**/

//🍌 1. Excluding file/folders from shown in cypress test runner spec files list.[e2e specific config option]
//🍌 2. Setting up a base url.[e2e specific config option]
//🍌 3. Changing timeouts - demo on all levels shown @ cypress/e2e/waits/changingTimeouts.cy.js
//🍌 4. Changing viewport.
//🍌 5. Screenshots and recordings.
//🍌 6. Cypress-retry.
