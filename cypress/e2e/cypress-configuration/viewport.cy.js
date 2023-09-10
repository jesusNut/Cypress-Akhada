
//! 🍌🍌🍌 Changing viewports:
//! 1. Globally : In order to change viewport globally - check in cypress.config.js file.
//! 2: On test case level - cy.viewport() command
//! To set viewport on other levels refer doc:
//? https://docs.cypress.io/api/commands/viewport#Syntax

describe('demo for altering viewports on test case level', () => {
    it('changing viewports on test case level', () => {

        //check if hamburger menu on webpage is displayed if viewport is having width*height of a mobile.
        cy.viewport(550, 750);
        cy.visit('https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Assertions');
        cy.get("button[aria-label='Toggle navigation bar']").invoke('css', 'display')
            .should((value) => {
                expect(value).eq('flex');
            })
    });

    it.only('changing viewports - at test case level - using device name', () => {

        //check if hamburger menu on webpage is displayed if viewport is having width*height of a mobile.
        //cy.viewport('iphone-6','landscape');
        cy.viewport('iphone-6');
        cy.visit('https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Assertions');
        cy.get("button[aria-label='Toggle navigation bar']").invoke('css', 'display')
            .should((value) => {
                expect(value).eq('flex');
            })
    });

});