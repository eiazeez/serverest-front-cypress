import { List } from "../support/actions/list"

describe('Dado que estou na página de Minha Lista de Compras', function () {

    beforeEach(function () {
        cy.fixture('login/successful').then(function (successful) {
            this.successful = successful
        })

        cy.fixture('products/tech').then(function (tech) {
            this.tech = tech
        })
    })

    it('Então deve ser possível visualizar o texto "Lista de Compras"', function () {

        const user = this.successful.user

        cy.deleteUserByEmail(user.email)
        cy.postUser(user)

        List.go(user)
        List.isVisible('Lista de Compras')

    })

    it('Então deve ser possível retornar a Home através do botão "Página Inicial"', function () {
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

    context.only('Quando possuo produto na Lista de Compras', function () {

        it('Então deve ser possível limpar a lista', function () {

            const admin = this.successful.admin
            cy.deleteUserByEmail(admin.email)
            cy.postUser(admin)

            const product = this.tech.mouse

            cy.deleteProductByName(admin, product.nome)
            cy.postProduct(admin, product)

        })

    })
})