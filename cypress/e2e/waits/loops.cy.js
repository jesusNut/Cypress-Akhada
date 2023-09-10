
//! Using looping concepts in cypress

//! eq() and each() and breaking .each() loop is explained in cypress_methods_2.cy.js

//* Here we will see how to handle scenarious where we need WHILE LOOP operation.

//! AVOID WHILE() LOOP IN CYPRESS CODE.
//? https://www.youtube.com/watch?v=5Z8BaPNDfvA&t=11s
//? https://www.youtube.com/watch?v=3_nfyTlY4TA 

//* Usage of method recursion.
//? https://www.youtube.com/watch?v=RESaxPxkRwE
//? https://www.youtube.com/watch?v=r8_hFwYAo5c&list=PLP9o9QNnQuAbegJlN5ZTRxqtUBtKwXOHQ [advanced playlist]
//? https://github.com/bahmutov/avoid-while-loops-in-cypress [advanced codes]

//* One use case is present in .handling_elements/datepickers.cy.js

describe('Handling while loop type scenarios', () => {
    it('Example 1: Recommended way to handle while loop scenarios', () => {
        // Scenario: 
        // while(number is not expNum)
        // { keep clicking AGAIN! button}
        // Once number is expNum , log it.
        cy.visit('https://www.random.org/integers/?num=1&min=1&max=10&col=5&base=10&format=html&rnd=new');
        //calling the recursive function
        findAndLogNum(1);

    });

    it('Example 2: Check all pagination and find a user', () => {

        cy.visit('https://mdbootstrap.com/docs/b4/jquery/tables/pagination/');
        //calling recursive function below.
        findUser('Donna Snider'); 
        //ignore below code: AUT specific code to stop unnecessary xhr request calls.
        cy.window().then((windowObject)=>{
            windowObject.clarity('stop');
        })

    });
});

//! custom recursive function for Example-1
function findAndLogNum(expNum) {
    cy.get("pre[class='data']").then(($el) => {
        let fetchedNumber = parseInt($el.text());
        cy.log(fetchedNumber);
        if (fetchedNumber !== expNum) {
            cy.get("input[value='Again!']").click();
            findAndLogNum(expNum);
        }
        else {
            cy.log(`found the number ${fetchedNumber}`);
        }
    })
}


//! custom recursive function for Example-2

function findUser(userName) {

    let flagUserFound = false;
    cy.get('body').then(($meq) => {
        cy.wrap($meq).find('#dtBasicExample>tbody>tr>td:first-child').each(($eq, index, list) => {
            console.log(`user IS :: ${$eq.text()}`);
            if ($eq.text() === userName) {
                cy.log(`user found ${$eq.text()}`);
                flagUserFound = true;
                cy.log(flagUserFound)
                return false;
            }
        })
    }).then(() => {
        if (!flagUserFound) {
            cy.get('#dtBasicExample_next').should('not.be.disabled').click();
            findUser(userName);
        }
    })
}