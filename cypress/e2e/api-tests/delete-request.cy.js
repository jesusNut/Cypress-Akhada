const { faker } = require('@faker-js/faker');

/**================================================================================================
 *!                   🤑🤑🤑 Working with DELETE HTTP Method 🤑🤑🤑
 *================================================================================================**/


 describe('DELETE - Real time use cases with GoRest API', () => {

    it('🎃 Chaining of POST--->DELETE--->GET request', () => {

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
            cy.request({
                method: "DELETE",
                url: "https://gorest.co.in/public/v2/users/" + createdID,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "accept": "*/*",
                    "Authorization": "Bearer 3xcc0a09e6115f169d3c5dbd23bdc43568dc6725979e45633f34eedfe3ffb326a"
                }
            }).then(dresponse=>{
                expect(dresponse.status).to.be.equal(204);
                expect(dresponse.statusText).to.be.equal('No Content');

                //! Be default any status code other than 2XX or 3XX is considered as failure by 
                //! Cypress. So, in order to vaidate -ve scenarios like 404 etc. use the flag:
                //! 'failOnStatusCode' as false in options.
                cy.request({
                    method: "GET",
                    url: "https://gorest.co.in/public/v2/users/" + createdID,
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        "accept": "*/*",
                        "Authorization": "Bearer 3xcc0a09e6115f169d3c5dbd23bdc43568dc6725979e45633f34eedfe3ffb326a"
                    },failOnStatusCode:	false
                }).then((gresponse)=>{
                    expect(gresponse.status).to.be.equal(404);
                    expect(gresponse.statusText).to.be.equal('Not Found');
                    let gresBodyAsOBj = JSON.parse(JSON.stringify(gresponse.body));
                    cy.log(gresBodyAsOBj.message);
                    expect(gresBodyAsOBj.message).is.eq('Resource not found');
                })
            })
        })
    });

});