class Home_PO {

    elements = {
        user_lnk: "body > div:nth-child(1) > div:nth-child(1) > nav:nth-child(1) > div:nth-child(1) > ul:nth-child(2) > li:nth-child(4) > a:nth-child(1)",
        settings_lnk: "a[href='#settings']",
        newPost_lnk: "a[href='#editor']",
        home_lnk: ".container > .nav > :nth-child(1) > .nav-link",
        yourFeed_section_header: ".nav-link.active",
        globalFeed_section_header: "ul[class='nav nav-pills outline-active'] a[class='nav-link']",
        articleTitle_input: "input[placeholder='Article Title']",
        articleAbout_input: "input[placeholder=\"What's this article about?\"]",
        articleBody_input: "textarea[placeholder='Write your article (in markdown)']",
        articleTags_input: "input[placeholder='Enter tags']",
        publishArticle_btn: "button[type='button']",
        articlePublishError_holder: "div[class='editor-page'] li:nth-child(1)",
        publishedArticleHeader_holder: "div[class='container'] h1",
        deletePublishedArticle_btn: '.btn.btn-outline-danger.btn-sm'
    }

    get getSettings_lnk() {
        return cy.get(this.elements.settings_lnk);
    }
    get getNewPost_lnk() {
        return cy.get(this.elements.newPost_lnk);
    }
    get getUser_lnk() {
        return cy.get(this.elements.user_lnk);
    }

    get getArticleTitle_lnk() {
        return cy.get(this.elements.articleTitle_input);
    }
    get getArticleAbout_lnk() {
        return cy.get(this.elements.articleAbout_input);
    }
    get getArticleBody_lnk() {
        return cy.get(this.elements.articleBody_input);
    }
    get getArticleTags_lnk() {
        return cy.get(this.elements.articleTags_input);
    }

    get getPublishArticle_Btn() {
        return cy.get(this.elements.publishArticle_btn);
    }

    clickOnNewPostLink() {
        cy.get(this.elements.newPost_lnk).click({ force: true });
        cy.url().should('contain', 'editor');
    }

    checkIfUserLinkVisible() {
        this.getUser_lnk.should('be.visible');
    }
    checkIfSettingsVisible() {
        this.getSettings_lnk.should('be.visible');
    }
    checkIfNewpostLinkVisible() {
        this.getNewPost_lnk.should('be.visible');
    }
    checkIfHomeLinkVisible() {
        cy.get(this.elements.home_lnk).should('be.visible');
    }
    checkIfYourFeedVisible() {
        cy.get(this.elements.yourFeed_section_header).should('be.visible');
    }
    checkIfGlobalFeedVisible() {
        cy.get(this.elements.globalFeed_section_header).should('be.visible');
    }

    validateArticlePublishError(expectedText) {
        cy.get(this.elements.articlePublishError_holder).should('have.text', expectedText);
    }

    validateArticleCreated(expectedAtricleTitle) {
        cy.url().should('contain', 'article');
        cy.get(this.elements.publishedArticleHeader_holder).should('have.text', expectedAtricleTitle);
    }

    deletePublishedArticle() {
        cy.get(this.elements.deletePublishedArticle_btn).click();
        cy.url().should('not.contain','article');
    }



}

export default Home_PO;