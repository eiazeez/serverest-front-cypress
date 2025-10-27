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

Cypress.Commands.add('getUserByEmail', (email) => { 
    cy.api({
        url: 'https://serverest.dev/usuarios',
        method: 'GET',
    }).then(response => {
        const users = response.body.usuarios || response.body
        expect(Array.isArray(users)).to.be.true

        const user = users.find(u => u.email === email)
        return user
    })
})

Cypress.Commands.add('deleteUserByEmail', (email) => {
    cy.getUserByEmail(email).then(user => {
        expect(user).to.not.be.undefined
        const userId = user._id

        cy.api({
            url: `https://serverest.dev/usuarios/${userId}`,
            method: 'DELETE'
        })
    })
})

Cypress.Commands.add('postUser', (user) => { 
    cy.api({
        url: 'https://serverest.dev/usuarios',
        method: 'POST',
        body: {
              "nome": user.name,
              "email": user.email,
              "password": user.password,
              "administrador": user.administrator
            }
      })
})



