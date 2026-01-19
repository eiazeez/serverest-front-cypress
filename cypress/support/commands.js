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
        url: `${Cypress.env('apiUrl')}/usuarios`,
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
            url: `${Cypress.env('apiUrl')}/usuarios/${userId}`,
            method: 'DELETE'
        })
    })
})

Cypress.Commands.add('postUser', (user) => {
    cy.api({
        url: `${Cypress.env('apiUrl')}/usuarios`,
        method: 'POST',
        body: {
            "nome": user.name,
            "email": user.email,
            "password": user.password,
            "administrador": user.administrator
        }
    })
})

Cypress.Commands.add('apiLogin', function (user) {
    cy.api({
        url: `${Cypress.env('apiUrl')}/login`,
        method: 'POST',
        body: {
            "email": user.email,
            "password": user.password
        }
    })
})

Cypress.Commands.add('postProduct', function (admin, product) {

    cy.apiLogin(admin).then(function (response) {
        cy.api({
            url: `${Cypress.env('apiUrl')}/produtos`,
            method: 'POST',
            headers: { authorization: response.body.authorization },
            body: {
                "nome": product.nome,
                "preco": product.preco,
                "descricao": product.descricao,
                "quantidade": product.quantidade
            }
        })
    })
})

Cypress.Commands.add('getProductByName', function (name) {
    cy.api({
        url: `${Cypress.env('apiUrl')}/produtos`,
        method: 'GET'
    }).then(response => {

        const products = response.body.produtos || response.body
        expect(Array.isArray(products)).to.be.true

        const product = products.find(p => p.nome === name)
        return product
    })
})

Cypress.Commands.add('deleteProductByName', function (admin, name) {

    cy.getProductByName(name).then(product => {
        expect(product).to.not.be.undefined
        const productId = product._id

        cy.apiLogin(admin).then(function (response) {
            cy.api({
                url: `${Cypress.env('apiUrl')}/produtos/${productId}`,
                method: 'DELETE',
                failOnStatusCode: false,
                headers: { authorization: response.body.authorization },
            })
        })
    })
})

Cypress.Commands.add('adjustUserData', function(user) {
    cy.deleteUserByEmail(user.email)
    cy.postUser(user)
})

Cypress.Commands.add('adjustProductData', function(admin, product) {
    cy.deleteProductByName(admin, product.nome)
    cy.postProduct(admin, product)
})

Cypress.Commands.add('addProductToList', function(admin, product) {
    cy.deleteProductByName(admin, product.nome)
    cy.postProduct(admin, product)
    cy.getProductByName(product.nome).then(function(info){
        expect(product).to.not.be.undefined
        const productId = info._id

        window.localStorage.setItem('products', `[{"_id":"${productId}","nome":"${product.nome}","preco":${product.preco},"quantidade":${product.quantidade},"descricao":"${product.descricao}","amount":${product.amount}}]`)
    })
})



