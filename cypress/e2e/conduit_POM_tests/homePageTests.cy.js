import Landing_PO from '../../pageObjects/conduit/landing_PO'; 
import Login_PO from '../../pageObjects/conduit/login_PO';
import Home_PO from '../../pageObjects/conduit/home_PO';

describe('Conduit app - login page tests', function () {

    const landingPage = new Landing_PO();
    const loginPage = new Login_PO();
    const homePage = new Home_PO;

    beforeEach(() => {
        cy.fixture('conduit_fixtures_files/login.json').as('testData');
        cy.navigateToFrameworkUrl();//custom command in cypress/support/commands.js
    });

    it('Validate page components visible on homepage', function () {
        landingPage.clickSignInLink();
        loginPage.signInToApplication(this.testData.validUsername, this.testData.validPassword);
        homePage.checkIfHomeLinkVisible();
        homePage.checkIfNewpostLinkVisible();
        homePage.checkIfSettingsVisible();
        homePage.checkIfUserLinkVisible();
        homePage.checkIfYourFeedVisible();
        homePage.checkIfGlobalFeedVisible();
    });

    it('Validate submitting article without article title', function () {
        landingPage.clickSignInLink();
        loginPage.signInToApplication(this.testData.validUsername, this.testData.validPassword);
        homePage.clickOnNewPostLink();
        homePage.getPublishArticle_Btn.click();
        homePage.validateArticlePublishError("title can't be blank");
    });

    it('Validate submitting article -  HAPPY PATH', function () {
        landingPage.clickSignInLink();
        loginPage.signInToApplication(this.testData.validUsername, this.testData.validPassword);
        homePage.clickOnNewPostLink();
        homePage.getArticleTitle_lnk.type('THE ARTICLE 370');
        homePage.getArticleAbout_lnk.type('the good,the bad ..the ugly....')
        homePage.getArticleBody_lnk.type('Oing...poing !!!');
        homePage.getArticleTags_lnk.type('welcome');
        homePage.getPublishArticle_Btn.click();
        homePage.validateArticleCreated('THE ARTICLE 370');
        homePage.deletePublishedArticle();

    });

});
