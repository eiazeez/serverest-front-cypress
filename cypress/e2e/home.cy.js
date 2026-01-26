import { Header } from "../support/actions/components/header"
import { Home } from "../support/actions/home"
import { List } from "../support/actions/list"


describe('Dado que estou na página Home', function () {

    beforeEach(function () {
        cy.fixture('login/successful').then(function (successful) {
            this.successful = successful
        })

        cy.fixture('products/tech').then(function (tech) {
            this.tech = tech
        })
    })

    it('Então deve ser possível realizar logout', function () {

        const user = this.successful.user

        cy.deleteUserByEmail(user.email)
        cy.postUser(user)

        Home.go(user)
        Header.logout()

    })

    context('Quando pesquiso um produto válido', function() {

        it.only('Então deve ser possível adicionar o produto para lista de compras', function() {

            const user = this.successful.user
            const admin = this.successful.admin
            cy.adjustUserData(user)
            cy.adjustUserData(admin)

            const product = this.tech.teclado
            cy.adjustProductData(admin, product)

            Home.go(user)
            Home.searchProduct(product.nome)
            Home.addToList()

            List.isVisible('Lista de Compras')
            List.shouldHaveProduct(product.nome)

        })
    })

    context('Quando pesquiso um produto inválido', function() {

        it('Então deve me retornar', function() {

            const product = { nome: 'Produto Inválido' }

            const user = this.successful.user
            cy.adjustUserData(user)

            Home.go(user)
            Home.searchProduct(product.nome)  
            
            Home.emptyMsgShouldBe('Nenhum produto foi encontrado')
        })

    })
})