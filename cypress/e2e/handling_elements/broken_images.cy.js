
//! checking for broken image or not.

//* there is a html property called - natural width.
//* In case of valid images, natural width is always > 0 but 
//* in case of broken images, natural width=0.

describe('check whether broken images', () => {
    it('assert an image is a broken image', () => {

        cy.visit('https://the-internet.herokuapp.com/broken_images');
        cy.get("img[src='asdf.jpg']").invoke('prop','naturalWidth')
        .then((value)=>{
            expect(value).to.eql(0);
    

        })
        
    });

    it('assert an image is NOT a broken image', () => {

        cy.visit('https://the-internet.herokuapp.com/broken_images');
        cy.get("img[src='img/avatar-blank.jpg']").invoke('prop','naturalWidth')
        .then((value)=>{
            expect(value).to.be.greaterThan(0);
        })
        
    });
});