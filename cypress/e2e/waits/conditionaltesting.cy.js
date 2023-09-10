
//! conditional testing in cypress

//*  IF AN ELEMENT EXISTS on DOM THEN,... do something on that element.

//? https://www.youtube.com/watch?v=Ct29NYFltxA&list=PL0EgBggsoPCk98uEtlGyWhKM8GiWdUFy0&index=6&t=187s   
//? https://glebbahmutov.com/cypress-examples/recipes/conditional-testing.html#count-elements-if-they-exist-after-delay
//? https://www.neovasolutions.com/2022/11/10/conditional-testing-in-cypress/
//? https://docs.cypress.io/guides/core-concepts/conditional-testing#Element-existence
//? https://docs.cypress.io/guides/core-concepts/conditional-testing#Dynamic-text


describe('conditional testing', () => {
	it('example 1- demo for recommended way', () => {
		const log = console.log


		//* SCENARIO 1

		//cy.visit('https://www.google.com')
		//const input = cy.get('input[name=q]')

		/* don't do this */
		//if (input) {
		//	console.log('do something')
		//}

		//* SCENARIO 2

		//console.log(input)

		/* don't do this */
		//cy.get('input[name=q]')
		//	.should('have.value', 'something')
		//	.then(() => {
		//		console.log('do something')
		//	})

		//* SCENARIO 3

		/* don't do this */
		//cy.get('label:contains(Readonly)').then((readonly) => {
		//	console.log(readonly)
		//})

		//! CORRECT WAY

		cy.visit('http://127.0.0.1:5500/cypress/customHTMLs/conditionalTesting.html')

		/* correct way to do conditional test */
		cy.get('body').then((body) => {
			console.log(body.find('label:contains(Readonly)'))
			if (body.find('label:contains(Readonly)').length > 0)
				cy.get('#edit').click()
		})

		//cy.get('#name').type('Srinesh')
		//cy.get('#age').type('27')
	})

	it('example 2- If checkbox disabled, click on button to enable it, otherwise dbl click and get angry ', () => {

		cy.visit('http://omayo.blogspot.com/');

		cy.get('body').then((body) => {
			//here find() & prop() is jquery method
			console.log(body.find('#dte'));
			if (body.find('#dte').prop('disabled')) {
				//click on button to enable checkbox
				cy.get("button[onclick='setTimeout(myFunctionAXD,10000)']").click();
				//check checkbox after 11 sec as checkbox enables in 10 sec.
				cy.get("#dte").check({ timeout: 11000 });
			}
			else
				cy.get("button[ondblclick='dblclickAlert()']").dblclick();
		})
	});
})



