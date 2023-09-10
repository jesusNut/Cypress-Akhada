
//! handling file uploads
//! handling file downloads

//* USE A PLUGIN CALLED : cypress-file-upload

describe('Handling uploads', () => {
    it('single file upload : input type=\'file\'', () => {

        // In real time, keep all files to be uploaded in fixtures.
        //Here, I need to upload file named example.json from fixtures folder.

        cy.visit('https://the-internet.herokuapp.com/upload');
        cy.get('#file-upload').attachFile('example.json');

    });

    it('rename file while upload ex-1 : input type=\'file\'', () => {

        // In real time, keep all files to be uploaded in fixtures.
        //Here, I need to rename file while uploading file named example.json from fixtures folder.

        cy.visit('https://the-internet.herokuapp.com/upload');
        cy.get('#file-upload').attachFile({ filePath: 'example.json', fileName: 'myfile.json' });

    });

    it('single file upload -using drag and drop', () => {

        // In real time, keep all files to be uploaded in fixtures.
        //Here, I need to upload file named example.json from fixtures folder.

        cy.visit('https://the-internet.herokuapp.com/upload');
        cy.get('#drag-drop-upload').attachFile('example.json', { subjectType: 'drag-n-drop' });
        cy.get("#drag-drop-upload>div>div>div>span")
            .should('have.text', 'example.json');
    });

    it('multiple file upload', () => {

        cy.visit('https://davidwalsh.name/demo/multiple-file-upload.php');
        cy.get('#filesToUpload').attachFile(['example.json','example2.json']);
        
    });

    it('file upload inside shadow dom', () => {
        cy.visit('https://www.htmlelements.com/demos/fileupload/shadow-dom/index.htm');
        cy.get('.smart-browse-input',{includeShadowDom:true}).attachFile('example.json');
    });
});