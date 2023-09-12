
/**================================================================================================
 *!             🤑🤑🤑 HOW TO USE CY REQUEST COMMANDS & ITS OVERLOADS 🤑🤑🤑
 *================================================================================================**/

// cy.request(url) - demoed here with GET request
// cy.request(url, body) - will be demoed in 
// cy.request(method, url) - demoed here with GET request
// cy.request(method, url, body) - will be demoed in 
// cy.request(options) - demoed here with GET request

//? https://www.youtube.com/watch?v=X8O1iPnk3ZU&list=PLUPlX-9QUIrMXsObHczX5shFbytXjV4d4&index=1 [entire-playlist]
//? Udemy - Gianni


//---------------------------------------------------------------------------------------------------

describe('Ways to use cy.request() command while using GET', () => {
    it('🎃 cy.request(url)', () => {

        //In this case, method will be dafaulted to GET.
        cy.request('https://jsonplaceholder.typicode.com/posts')
            .its('status').should('eq', 200);
    });

    it('🎃 cy.request(method,url)', () => {

        cy.request('GET', 'https://jsonplaceholder.typicode.com/posts')
            .its('statusText').should('eq', 'OK');
    });

    it('🎃 cy.request(options)', () => {

        cy.request({ method: "GET", url: "https://jsonplaceholder.typicode.com/posts" })
            .its('duration').should('be.lessThan', 200);
    });
});


/**================================================================================================
 *!                   🤑🤑🤑 Working with GET HTTP Method 🤑🤑🤑
 *================================================================================================**/


describe('GET', () => {

    it('🤑 Creating a simple Get request, and accessing properties of response object', () => {

        cy.request('GET', 'https://jsonplaceholder.typicode.com/posts')
            .then((response) => {
                //💩 access each property of response object
                cy.log('-----------------STATUS--------------')
                cy.log(response.status);//status
                cy.log('---------------STATUS TEXT------------')
                cy.log(response.statusText); //status text
                cy.log('-------------RESPONSE HEADERS----------------')
                let allHeaders = response.headers; //headers
                for (const key in allHeaders) {
                    cy.log(`${key} : ${allHeaders[key]}`)
                }
                cy.log('-----------DURATION-----------')
                cy.log(response.duration); //duration
                cy.log('-------REQUEST HEADERS-------------')
                let allReqHeaders = response.requestHeaders;//request-headers
                for (const key in allReqHeaders) {
                    cy.log(`${key} : ${allReqHeaders[key]}`)
                }
                cy.log('-------STATUS CODE OK OR NOT--------')
                cy.log(response.isOkStatusCode);
            })
    });

    it('🤑 Creating a simple Get request, and asserting properties of response object', () => {

        cy.request('GET', 'https://jsonplaceholder.typicode.com/posts')
            .then((response) => {
                //💩 access each property of response object
                expect(response.status).to.be.equal(200);
                expect(response.statusText).to.be.equal('OK')
                expect(response.headers).has.property('transfer-encoding', 'chunked');
                expect(response.duration).to.be.lessThan(200);
                expect(response.isOkStatusCode).to.be.true;
                //💩 asserting response body
                expect(response.body[0]).has.property('body');
                expect(response.body[0]).has.property('id', 1);
                expect(response.body[0]).has.property('title');
                expect(response.body[0]).has.property('userId');
                let responseBody = response.body;
                responseBody.forEach(element => {
                    expect(element).to.have.all.keys("body", "id", "title", "userId");
                });
            })
    });

});