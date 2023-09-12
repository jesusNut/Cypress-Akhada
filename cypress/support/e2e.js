// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
//other imports (done by JesusNut)
import 'cypress-real-events/support';
import '@4tw/cypress-drag-drop'
import 'cypress-file-upload';
import 'cypress-mochawesome-reporter/register';
require('cy-verify-downloads').addCustomCommand();
require('cypress-downloadfile/lib/downloadFileCommand')


// Alternatively you can use CommonJS syntax:
// require('./commands')

//!  ✨✨ ✨✨ ✨✨  global hooks ✨✨ ✨✨ ✨✨ 
//used in cypress/e2e/mocha/globalHooks_X.cy.js

// before(() => {
//     cy.log('I am global BEFORE')
// });

// beforeEach(() => {
//     cy.log('I am global BEFORE-EACH')
// });

// after(() => {
//     cy.log('I am global AFTER')
// });

// afterEach(() => {
//     cy.log('I am global AFTER-EACH')
// });

//!  ✨✨ ✨✨ ✨✨ Hide fetch/XHR requests ✨✨ ✨✨ ✨✨ 
// const app = window.top;
// if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
//   const style = app.document.createElement('style');
//   style.innerHTML =
//     '.command-name-request, .command-name-xhr { display: none }';
//   style.setAttribute('data-hide-command-log-request', '');

//   app.document.head.appendChild(style);
// }

//!  ✨✨ ✨✨ ✨✨ Disable Uncaught Exception from app to fail test cases ✨✨ ✨✨ ✨✨ 

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test.
  return false;
});