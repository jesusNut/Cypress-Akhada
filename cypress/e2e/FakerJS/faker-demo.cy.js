
//import required to use Faker JS directly in spec files.
import { faker } from '@faker-js/faker';

/**================================================================================================
 *!               USING FAKER JS
 *================================================================================================**/

//? Udemy- Joan
//? https://www.npmjs.com/package/@faker-js/faker
//? https://github.com/JoanEsquivel/cypress-course/blob/master/cypress.config.ts


Cypress.config('baseUrl', 'https://www.webdriveruniversity.com');


describe('Demo of using FAKER JS', () => {
    it('Using FAKER JS directly in spec file', () => {

        // Step 1: Import.
        // Step 2: Use.
        cy.visit('/Contact-Us/contactus.html');
        cy.get("input[placeholder='First Name']").type(faker.person.firstName());
        cy.get("input[placeholder='Last Name']").type(faker.person.lastName());
        cy.get("input[placeholder='Email Address']").type(faker.internet.email());
        cy.get("textarea[placeholder='Comments']").type(faker.lorem.lines(2));
        cy.get("input[value='SUBMIT']").click({ force: true });

    });

    it('Writing a task in cypress.config.json & using in spec file', () => {

        cy.visit('/Contact-Us/contactus.html');
        cy.task('freshUser').then((fetchedObject => {
            cy.get("input[placeholder='First Name']").type(fetchedObject.firstname);
            cy.get("input[placeholder='Last Name']").type(fetchedObject.lastname);
            cy.get("input[placeholder='Email Address']").type(fetchedObject.email);
            cy.get("textarea[placeholder='Comments']").type(fetchedObject.comments);
            cy.get("input[value='SUBMIT']").click({ force: true });
        }))
    });
});

//🧘🏼🧘🏼🧘🏼🧘🏼🧘🏼🧘🏼🧘🏼🧘🏼🧘🏼🧘🏼🧘🏼🧘🏼🧘🏼🧘🏼🧘🏼🧘🏼🧘🏼🧘🏼🧘🏼🧘🏼🧘🏼🧘🏼🧘🏼🧘🏼🧘🏼🧘🏼🧘🏼🧘🏼🧘🏼🧘🏼🧘🏼🧘🏼🧘🏼🧘🏼🧘🏼🧘🏼🧘🏼🧘🏼🧘🏼🧘🏼

//! There can be many other patterns to access fixtures e.g. using them with fixtures etc.

//? https://dev.to/walmyrlimaesilv/how-to-create-fixtures-with-random-data-using-cypress-and-faker-46cl