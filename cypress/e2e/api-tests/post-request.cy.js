const { faker } = require('@faker-js/faker');
//import json_nonfixturye_payload from './json-payloads/user-nonfixture.json' OR
const json_nonfixturye_payload = require('./json-payloads/user-nonfixture.json');

/**================================================================================================
 *!             🤑🤑🤑 HOW TO USE CY REQUEST COMMANDS & ITS OVERLOADS 🤑🤑🤑
 *================================================================================================**/

// cy.request(url, body)
// cy.request(method, url, body) - demoed here with POST request


//? https://www.youtube.com/watch?v=cFbLq38e7gM&list=PLUPlX-9QUIrMXsObHczX5shFbytXjV4d4&index=2
//? Udemy - Gianni

//---------------------------------------------------------------------------------------------------

describe('Ways to use cy.request() command while using POST', () => {
    it('🎃 cy.request(method,url, body)', () => {

        let body = {
            "title": "Star is great",
            "body": "Star should crack this interview with ease",
            "userId": 1
        };
        cy.request("POST", 'https://jsonplaceholder.typicode.com/posts', body)
            .its('status').should('eq', 201);
    });

});


/**================================================================================================
 *!                   🤑🤑🤑 Working with POST HTTP Method 🤑🤑🤑
 *================================================================================================**/

describe('POST with header', () => {
    it(' 🎃 Creating a simple POST request with header', () => {

        cy.request({
            method: "POST",
            url: "https://jsonplaceholder.typicode.com/posts",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "accept": "*/*"
            },
            body: {
                id: 111,
                title: 'fookra',
                body: 'insaan',
                userId: 111
            }

        }).then(response => {

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

    it(' 🎃 Creating a simple POST request, and asserting properties of response object', () => {

        cy.request({
            method: "POST",
            url: "https://jsonplaceholder.typicode.com/posts",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "accept": "*/*"
            },
            body: {
                id: 177,
                title: 'fookra',
                body: 'insaan',
                userId: 177
            }

        }).then(response => {
            //💩 access each property of response object
            expect(response.status).to.be.equal(201);
            expect(response.statusText).to.be.equal('Created')
            expect(response.headers).has.property('x-powered-by', 'Express');
            expect(response.duration).to.be.lessThan(1000);
            expect(response.isOkStatusCode).to.be.true;
            //💩 asserting response body
            expect(response.body).has.all.keys('body', 'id', 'title', 'userId');

        })

    });

});

describe('POST - Real time use cases with GoRest api', () => {

    //! if email id is already present in DB, then we get ' 422: Unprocessable Entity'
    //!  Api used : https://gorest.co.in/
    it('🎃 Create a user (change email in payload while running)', () => {
        cy.request({
            method: "POST",
            url: "https://gorest.co.in/public/v2/users",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "accept": "*/*",
                "Authorization": "Bearer 3xcc0a09e6115f169d3c5dbd23bdc43568dc6725979e45633f34eedfe3ffb326a"
            },
            body: { "name": "Tenali Ramakrishna", "gender": "male", "email": "Kingchuk.acharya@fuddu.com", "status": "active" }

        }).then((response) => {
            expect(response.status).to.be.equal(201);
            expect(response.statusText).to.be.equal('Created');

            //change JSON to JS object
            let resBodyAsOBj = JSON.parse(JSON.stringify(response.body));

            expect(resBodyAsOBj.id).not.to.be.null;
            expect(resBodyAsOBj).to.include.key('id');
            expect(resBodyAsOBj).to.have.all.keys('name', 'gender', 'email', 'status', 'id')
        })
    });

    it('🎃 Create a user with dynamic email ID using Faker Library', () => {
        cy.request({
            method: "POST",
            url: "https://gorest.co.in/public/v2/users",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "accept": "*/*",
                "Authorization": "Bearer 3xcc0a09e6115f169d3c5dbd23bdc43568dc6725979e45633f34eedfe3ffb326a"
            },
            body: { "name": "Tenali Ramakrishna", "gender": "male", "email": faker.internet.email(), "status": "active" }

        }).then((response) => {
            expect(response.status).to.be.equal(201);
            expect(response.statusText).to.be.equal('Created');

            //change JSON to JS object
            let resBodyAsOBj = JSON.parse(JSON.stringify(response.body));
            cy.log(resBodyAsOBj.email);
            expect(resBodyAsOBj.id).not.to.be.null;
            expect(resBodyAsOBj).to.include.key('id');
            expect(resBodyAsOBj).to.have.all.keys('name', 'gender', 'email', 'status', 'id')
        })
    });

    it('🎃 Create a user passing payload from JSON fixture', () => {

        //! Find JSON fixture @ cypress\fixtures\api-tests-fixtures\user.json
        cy.fixture('api-tests-fixtures/user.json').then((fetchedUserData => {
            cy.request({
                method: "POST",
                url: "https://gorest.co.in/public/v2/users",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "accept": "*/*",
                    "Authorization": "Bearer 3xcc0a09e6115f169d3c5dbd23bdc43568dc6725979e45633f34eedfe3ffb326a"
                },
                body: fetchedUserData

            }).then((response) => {
                expect(response.status).to.be.equal(201);
                expect(response.statusText).to.be.equal('Created');

                //change JSON to JS object
                let resBodyAsOBj = JSON.parse(JSON.stringify(response.body));
                cy.log(resBodyAsOBj.email);
                expect(resBodyAsOBj.id).not.to.be.null;
                expect(resBodyAsOBj).to.include.key('id');
                expect(resBodyAsOBj).to.have.all.keys('name', 'gender', 'email', 'status', 'id')
            })
        }))
    });

    it('🎃 Create a user passing payload from JSON file NOT kept in fixtures folder', () => {

        //! Find JSON files used as payload @ cypress\e2e\api-tests\json-payloads\user-nonfixture.json
        //! To use this import the files in this spec file and then use it directly in tests.
        cy.fixture('api-tests-fixtures/user.json').then((fetchedUserData => {
            cy.request({
                method: "POST",
                url: "https://gorest.co.in/public/v2/users",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "accept": "*/*",
                    "Authorization": "Bearer 3xcc0a09e6115f169d3c5dbd23bdc43568dc6725979e45633f34eedfe3ffb326a"
                },
                body: json_nonfixturye_payload

            }).then((response) => {
                expect(response.status).to.be.equal(201);
                expect(response.statusText).to.be.equal('Created');

                //change JSON to JS object
                let resBodyAsOBj = JSON.parse(JSON.stringify(response.body));
                cy.log(resBodyAsOBj.email);
                expect(resBodyAsOBj.id).not.to.be.null;
                expect(resBodyAsOBj).to.include.key('id');
                expect(resBodyAsOBj).to.have.all.keys('name', 'gender', 'email', 'status', 'id')
            })
        }))
    });

    it('🎃 Chaining of POST and GET request', () => {

        //! 1. Create a user first using POSt command & then use GET to fetch the user uisng ID.
        cy.request({
            method: "POST",
            url: "https://gorest.co.in/public/v2/users",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "accept": "*/*",
                "Authorization": "Bearer 3xcc0a09e6115f169d3c5dbd23bdc43568dc6725979e45633f34eedfe3ffb326a"
            },
            body: { "name": "Tenali Ramakrishna", "gender": "male", "email": faker.internet.email(), "status": "active" }

        }).then((response) => {
            //write assertions
            expect(response.status).to.be.equal(201);
            expect(response.statusText).to.be.equal('Created');
            let resBodyAsOBj = JSON.parse(JSON.stringify(response.body));
            cy.log(`email from response of POST : ${resBodyAsOBj.email}`);
            expect(resBodyAsOBj.id).not.to.be.null;
            expect(resBodyAsOBj).to.include.key('id');
            expect(resBodyAsOBj).to.have.all.keys('name', 'gender', 'email', 'status', 'id')

            // fetch the id from the response body and store it in a variable for use in GET request
            let fetchedId = resBodyAsOBj.id.toString();
            let expectedEmailInGet = resBodyAsOBj.email;
            
        })
    });

});