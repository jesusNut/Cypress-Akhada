const { faker } = require('@faker-js/faker');


/**================================================================================================
 *!                   🤑🤑🤑 Working with PUT HTTP Method 🤑🤑🤑
 *================================================================================================**/

describe('PUT', () => {
    it(' 🎃 Update using a PUT request with header', () => {

        cy.request({
            method: "PUT",
            url: "https://jsonplaceholder.typicode.com/posts/1",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: {
                id: 1,
                title: 'updatedTitle',
                body: 'updatedBody',
                userId: 1
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

    it(' 🎃 Creating a simple PUT request, and asserting properties of response object', () => {

        cy.request({
            method: "PUT",
            url: "https://jsonplaceholder.typicode.com/posts/1",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: {
                id: 1,
                title: 'fookra',
                body: 'insaan',
                userId: 1
            }

        }).then(response => {
            //💩 access each property of response object
            expect(response.status).to.be.equal(200);
            expect(response.statusText).to.be.equal('OK ')
            expect(response.headers).has.property('x-powered-by', 'Express');
            expect(response.duration).to.be.lessThan(1000);
            expect(response.isOkStatusCode).to.be.true;
            //💩 asserting response body
            expect(response.body).has.all.keys('body', 'id', 'title', 'userId');

        })

    });
});

describe('PUT - Real time use cases with GoRest API', () => {
    it('🎃 Update a specific user', () => {

        let setName = "Chango Pango";
        let setGender = "female";
        let setStatus = "inactive";

        cy.request({
            method: "PUT",
            url: "https://gorest.co.in/public/v2/users/5141737",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "accept": "*/*",
                "Authorization": "Bearer 3xcc0a09e6115f169d3c5dbd23bdc43568dc6725979e45633f34eedfe3ffb326a"
            },
            body: { "name": setName, "gender": setGender, "status": setStatus }

        }).then(response => {
            //write assertions
            expect(response.status).to.be.equal(200);
            expect(response.statusText).to.be.equal('OK');
            let resBodyAsOBj = JSON.parse(JSON.stringify(response.body));
            expect(resBodyAsOBj.name).is.eq(setName);
            expect(resBodyAsOBj.gender).is.eq(setGender);
            expect(resBodyAsOBj.status).is.eq(setStatus);
            expect(resBodyAsOBj.id).not.to.be.null;
            expect(resBodyAsOBj).to.include.key('id');
            expect(resBodyAsOBj).to.have.all.keys('name', 'gender', 'email', 'status', 'id')

        })
    });


    it('🎃 Chaining of POST--->PUT--->GET request', () => {

        let fakeEmail = faker.internet.email();

        cy.request({
            method: "POST",
            url: "https://gorest.co.in/public/v2/users",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "accept": "*/*",
                "Authorization": "Bearer 3xcc0a09e6115f169d3c5dbd23bdc43568dc6725979e45633f34eedfe3ffb326a"
            },
            body: { "name": "Tenali Ramakrishna", "gender": "male", "email": fakeEmail, "status": "active" }

        }).then(response => {

            expect(response.status).to.be.equal(201);
            expect(response.statusText).to.be.equal('Created');
            let resBodyAsOBj = JSON.parse(JSON.stringify(response.body));
            cy.log(resBodyAsOBj.name);
            expect(resBodyAsOBj.id).not.to.be.null;
            expect(resBodyAsOBj).to.have.all.keys('name', 'gender', 'email', 'status', 'id')
            //fetch id from response body
            let createdID = resBodyAsOBj.id.toString();

            //data to be updated
            let setName = "Imangi Studio";
            let setGender = "male";
            let setStatus = "active";

            cy.request({
                method: "PUT",
                url: "https://gorest.co.in/public/v2/users/" + createdID,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "accept": "*/*",
                    "Authorization": "Bearer 3xcc0a09e6115f169d3c5dbd23bdc43568dc6725979e45633f34eedfe3ffb326a"
                },
                body: { "name": setName, "gender": setGender, "status": setStatus }

            }).then(presponse => {
                //write assertions
                expect(presponse.status).to.be.equal(200);
                expect(presponse.statusText).to.be.equal('OK');
                let presBodyAsOBj = JSON.parse(JSON.stringify(presponse.body));
                cy.log(presBodyAsOBj.name);
                expect(presBodyAsOBj.name).is.eq(setName);
                expect(presBodyAsOBj.gender).is.eq(setGender);
                expect(presBodyAsOBj.status).is.eq(setStatus);
                expect(presBodyAsOBj.id).not.to.be.null;
                expect(resBodyAsOBj).to.have.all.keys('name', 'gender', 'email', 'status', 'id')

                cy.request({
                    method: "GET",
                    url: "https://gorest.co.in/public/v2/users/" + createdID,
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        "accept": "*/*",
                        "Authorization": "Bearer 3xcc0a09e6115f169d3c5dbd23bdc43568dc6725979e45633f34eedfe3ffb326a"
                    }
                }).then(gresponse => {
                    //write assertions
                    expect(gresponse.status).to.be.equal(200);
                    expect(gresponse.statusText).to.be.equal('OK');
                    let gresBodyAsOBj = JSON.parse(JSON.stringify(gresponse.body));
                    cy.log(gresBodyAsOBj.name);
                    expect(gresBodyAsOBj.name).is.eq(setName);
                    expect(gresBodyAsOBj.gender).is.eq(setGender);
                    expect(gresBodyAsOBj.status).is.eq(setStatus);
                })
            })
        })
    });

});