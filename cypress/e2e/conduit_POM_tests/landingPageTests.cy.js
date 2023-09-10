import Landing_PO from '../../pageObjects/conduit/landing_PO';


describe('Conduit app - landing page tests', () => {

    const landingPage = new Landing_PO();

    beforeEach(() => {
        cy.navigateToFrameworkUrl();//custom command in cypress/support/commands.js
    });

    it('Validate Landing page title', () => {
        landingPage.validateLandingPageTitle('Conduit');
    });

    it('Validate header text of landing page', () => {
        landingPage.validateHeaderText('conduit');
    });

    it('Validate sub-header text of landing page', () => {
        landingPage.validateSubHeaderText('A place to share your knowledge.');
    });

    it('Validate side bar text', () => {
        landingPage.validateSideBarText('Popular Tags');
    });


});