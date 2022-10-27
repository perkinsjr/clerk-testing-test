// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add(`signOut`, () => {
  cy.log(`sign out by clearing all cookies.`)
  cy.clearCookies({ domain: null })
})
Cypress.Commands.add(`signIn`, () => {
  cy.log(`Signing in.`)
  cy.url(`http://localhost:3000/`)

  cy.window()

  if (window.Cypress) {
    cy.log(window)
    expect(window).to.not.have.property(`Clerk`, undefined)
    expect(window.Clerk.isReady()).to.eq(true)
    cy.log('Clerk is ready').then(async window => {
      cy.log('attempting sign in.....')
      await cy.clearCookies({ domain: null })
      const res = await window.Clerk.client.signIn.create({
        identifier: 'example@clerk.dev',
        password: 'clerkpassword1234'
      })
      cy.log('attempting setting active.....')
      await window.Clerk.setActive({
        session: res.createdSessionId
      })

      cy.log(`Finished Signing in.`)
    })
  }
})
