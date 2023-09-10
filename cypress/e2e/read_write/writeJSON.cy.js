

/**================================================================================================
 *!                                     WRITE IN JSON FILE (cy.writeFile())
 *================================================================================================**/

//! THERE NEEDS TO BE A FILE IN ORDER TO BE WRITTEN OR READ FROM.
//! CYPRESS WILL NOT AUTOMATICALLY CREATE FILES FOR YOU.

//! Providing extension of the files is mandatory.

//? https://docs.cypress.io/api/commands/writefile

describe('Write data to TEXT FILES', () => {

    it('write data demo - write on a TEXT file - OVERWRITES PRIOR', () => {
        cy.writeFile('cypress\\e2e\\read_write\\resources\\sample.txt', "Abhishek is great")
        //🍌It will OVERWRITE if anything is already present in sample.txt file.
    });

    it('write data demo - write on a TEXT file - APPENDS TO PRIOR', () => {
        //print text of all the links present denoted by '#LinkList1>div>ul>li>a'
        cy.visit('http://omayo.blogspot.com/');
        cy.get('#LinkList1>div>ul>li>a').each(($el) => {
            cy.wrap($el).invoke('text').then((fetchedText) => {
                cy.writeFile('cypress\\e2e\\read_write\\resources\\allLinks.txt', fetchedText + '\n', { flag: 'a+' })
                //🍌 It will APPEND if anything is already present in allLinks.txt file.
                //So in every iteration text of link will be written and then '\n' will mover cursor to next line &
                //in subsequent iteration, the next text of link will be appended & so on...
            })
        })
    });
});

describe('Write data to JSON FILES', () => {
    it('write data demo - write on a JSON file- OVERWRITES PRIOR', () => {

        let maniDetails = {
            firstName: 'Manisha',
            lastname: 'Koirala',
            company: 'Ramro Garments',
            Address: 'Nepal'
        }
        //writing like below to deal with async-sync code
        cy.wrap(maniDetails).as('objectAsAlias');
        cy.get('@objectAsAlias').then((fetchedObject) => {
            cy.writeFile('cypress\\e2e\\read_write\\resources\\write_details.json', fetchedObject);
            //🍌 It will OVERWRITE if anything is already present in write_details.json file.
        })
    });

    /**======================
     *!   write data demo - write on a JSON file- APPENDS WITH PRIOR 
     *========================**/

     //? https://docs.cypress.io/api/commands/writefile#Append-contents-to-the-end-of-a-file
     //? Demo @ cypress\e2e\read_write\read_writeExcel.cy.js [while we convert excel to JSON]
});