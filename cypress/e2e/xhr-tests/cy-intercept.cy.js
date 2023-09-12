

/**================================================================================================
 *!              🍍🍍🍍 XHR TESTING- INTERCEPTING NETWORK REQUESTS 🍍🍍🍍
 *================================================================================================**/

//! 🍍🍍🍍 CY.INTERCEPT VS CY.REQUEST

//* 🛀🏽 cy.request, is the command used to perform requests deliberately to the server,
//* such as a GET or POST.
//* 🛀🏽 cy.intercept does not deliberately requests the server. It keep on SPYING/LISTENING to the
//* network requests (XHR- done by AJAX) happening on network layer - because of some event (e.g- a user clicks on submit button
//* on UI,then, a certain xhr call gets triggered to server in background) or on page load etc.

//* In XHR testing, We tell cypress to intercept a particular XHR request, and on finding it on network layer,
//* we can
//* 1. Write assertions on the response we get by that particular XHR request.
//* 2. Anything.......

//! 🍍🍍🍍 STUBS AND MOCKS:

//* In XHR testing, We tell cypress to intercept a particular XHR request and instead of asserting its
//* response sent by server, we can route the XHR requests to our own mocks/stubs.

//! There can be many use cases of xhr testsing by intercepring network requests.

//? https://example.cypress.io/commands/network-requests
//? https://docs.cypress.io/guides/guides/network-requests
//? https://docs.cypress.io/api/commands/intercept

//? https://www.youtube.com/watch?v=mwYD9H8wjTc
//? https://www.youtube.com/watch?v=e_eSi3SJJUU
//? Udemy - Gianni + Vignesh


describe('Understanding network intercepting', () => {
    it(' ☕️Simple network intercept- spying only', () => {

        //☕️☕️☕️ Write what do you want to intercept.
        //I want to intercept when there is any 'GET' call to <path> specified below and name it as 'CommentListEventDrivenXHR'
        cy.intercept({ method: 'GET', url: '/data/v1/post/60d21af267d0d8992e610b8d/comment?limit=10' })
            .as('CommentListEventDrivenXHR');


        cy.visit('https://dummyapi.io/explorer');
        cy.get(".py-12>div:nth-of-type(3)>div>div:nth-of-type(5)").click({ force: true });

        //now wait till the button above gets clicked and then - assert.
        //? https://docs.cypress.io/api/commands/wait#Wait-for-a-specific-request-to-respond
        cy.wait('@CommentListEventDrivenXHR').then((interceptedData) => {

            expect(interceptedData.response.statusCode).eq(200);
            expect(interceptedData.response.statusMessage).eq('OK');
            expect(interceptedData.response.headers['strict-transport-security']).eq('max-age=31556926');

        })

    });

    it('☕️Simple network intercept- spying & stubbing with mock data from fixture', () => {

        //☕️☕️☕️ WRITE WHAT DO YOU WANT TO INTERCEPT. ☕️☕️☕️
        //I want to intercept when there is any 'GET' call to <path> specified below and name it as 
        //'CommentListEventDrivenXHR'. After intercepting I want to get the stubbed/mocked response
        // 🍕BODY (as fixture property in static response object denotes body)🍕 
        // which is kept in a JSON file inside fixtures folder @ 'cypress\fixtures\xhr-tests-fixture\stubbedresponse.json'
        // AND a custom header - 'oing' with value 'toing' and 'choing' with value 'koing'
        //format of cy.intercept used is : cy.intercept(routeMatcher, staticResponse)
        //? https://docs.cypress.io/api/commands/intercept#StaticResponse-objects
        cy.intercept({ method: 'GET', url: '/data/v1/post/60d21af267d0d8992e610b8d/comment?limit=10' }
            , { fixture: 'xhr-tests-fixture/stubbedresponse.json', headers: { 'oing': 'toing', 'choing': 'koing' } })
            .as('CommentListEventDrivenXHR');


        cy.visit('https://dummyapi.io/explorer');
        cy.get(".py-12>div:nth-of-type(3)>div>div:nth-of-type(5)").click({ force: true });

        //now wait till the button above gets clicked and then - assert.
        //? https://docs.cypress.io/api/commands/wait#Wait-for-a-specific-request-to-respond
        cy.wait('@CommentListEventDrivenXHR').then((interceptedData) => {

            expect(interceptedData.response.body.data[0].id).eq('1234567899999');
            expect(interceptedData.response.headers.oing).eq('toing');
            expect(interceptedData.response.headers.choing).eq('koing');

        })

    });

    it('☕️ USECASE : Find broken Links', () => {

        //!spy a link after clicking it and assert

        cy.intercept({ url: 'https://demoqa.com/created', method: "GET" }).as('CreatedButtonXHR');
        cy.intercept({ url: 'https://demoqa.com/no-content', method: "GET" }).as('NoContentButtonXHR');
        cy.intercept({ url: 'https://demoqa.com/invalid-url', method: "GET" }).as('InvalidUrlButtonXHR')

        cy.visit('https://demoqa.com/links');

        cy.get('#created').click();
        cy.get('#no-content').click();
        cy.get('#invalid-url').click();

        cy.wait('@CreatedButtonXHR').then((interceptedData)=>{

            expect(interceptedData.response.statusCode).eq(201);
        })

        cy.wait('@InvalidUrlButtonXHR').then((interceptedData)=>{

            expect(interceptedData.response.statusCode).eq(404);
        })

        cy.wait('@NoContentButtonXHR').then((interceptedData)=>{

            expect(interceptedData.response.statusCode).eq(204);
        })

    });
});


/**=============================
 *?   AN AWESOME PLUGIN FOR API
 *==============================**/

//? https://www.youtube.com/watch?v=G8Lr9xPsPHQ
