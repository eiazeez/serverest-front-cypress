import { List } from "../support/actions/list"

describe('Dado que estou na página de Minha Lista de Compras', function () {

    beforeEach(function () {
        cy.fixture('login/successful').then(function (successful) {
            this.successful = successful
        })
    })

    it('Então deve ser possível visualizar o texto "Lista de Compras"', function () {

        const user = this.successful.user

        cy.deleteUserByEmail(user.email)
        cy.postUser(user)

        List.go(user)
        List.isVisible('Lista de Compras')

    })

    it.only('Então deve ser possível retornar a Home através do botão "Página Inicial"', function() {
       const user = this.successful.user

        cy.deleteUserByEmail(user.email)
        cy.postUser(user)

        List.go(user)
        List.goToHome()
    })

    context('Quando a Lista de Compras está vazia', function () {

        it('Então deve ser possível visualizar o texto "Seu carrinho está vazio"', function () {

            const user = this.successful.user

            cy.deleteUserByEmail(user.email)
            cy.postUser(user)

            List.go(user)
            List.emptyShouldHave('Seu carrinho está vazio')

        })

    })
})