import { Cart } from "../support/actions/cart"

describe('Dado que estou na página de Carrinho', function () {

    beforeEach(function () {
        cy.fixture('login/successful').then(function (successful) {
            this.successful = successful
        })
    })

    it('Então deve ser possível visualizar o texto "Em construção aguarde"', function () {

        const user = this.successful.user

        cy.deleteUserByEmail(user.email)
        cy.postUser(user)

        Cart.go(user)
        Cart.isVisible('Em construção aguarde')

    })
})