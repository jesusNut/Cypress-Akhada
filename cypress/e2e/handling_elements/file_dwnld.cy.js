
//! ******  Handling file downloads.

//? https://www.youtube.com/watch?v=K7eGlosAwSs&list=PL_y_9mKKBjhQ6FoAFILLaQYjhRmXyP-pT&index=2

// 🍌 STEP 1:
//👣  Cypress downloads file by default in cypress/downloads folder (be it any browser).
//👣  If a file can be downloaded using URL, we can use 👻 cypress-downloadfile plugin.

//! ******  Verify  whther the file donwloaded.

//? https://www.youtube.com/watch?v=LGydE14YTT8&list=PL_y_9mKKBjhQ6FoAFILLaQYjhRmXyP-pT&index=1

// 🍌 STEP 2:
// 👣 Once, Cypress downloads a file (by default in cypress/downloads folder),
// 👣 We can verify the same using 👻 cy-verify-downloads plugin.
// 👣 By default, cy-verify-downloads checks in cypress/downloads folder.


describe('Handling file downloads', () => {
    it('to demo: Cypress downloads file by-default in cypress/downloads folder', () => {
        cy.visit('http://autopract.com/selenium/download.html');
        cy.get('.mydownload').click();
    });

    it('to demo: using cypress-downloadfile plugin for files which are downloadable using url', () => {
        cy.downloadFile("https://github.com/arunmotoori/DownloadDemo/archive/master.zip","cypress/downloads","sample.csv");
    });
});

describe('Verify downloaded files', () => {
    it('to demo: using cy-verify-downloads plugin to verify downloaded file ', () => {
        cy.visit('http://autopract.com/selenium/download.html');
        cy.get('.mydownload').click();
        //🍌🍌🍌 using cy-verify-downloads plugin
        //🍌🍌🍌 By default, cy-verify-downloads checks in cypress/downloads folder.
        cy.verifyDownload('sample.csv');
    });

    it('to demo: using cy-verify-downloads plugin to verify downloaded file WHICH TAKES TIME TO DOWNLOAD ', () => {
        cy.visit('http://autopract.com/selenium/download.html');
        cy.get('.docfile').click();
        //🍌🍌🍌 using cy-verify-downloads plugin
        //🍌🍌🍌 use 'timeout' and 'interval' options
        cy.verifyDownload('32mb.docx',{ timeout: 25000, interval: 600 });
    });

    it('to demo: using cy-verify-downloads plugin + cypress-downloadfile plugin ', () => {
        cy.downloadFile("https://github.com/arunmotoori/DownloadDemo/archive/master.zip","cypress/downloads","sample.csv");
        //🍌🍌🍌 using cy-verify-downloads plugin
        cy.verifyDownload('sample.csv');
    });
});