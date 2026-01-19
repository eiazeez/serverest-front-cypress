import { Home } from "../home"

export const List = {

    go: function(user) {

        cy.apiLogin(user).then(function(response){
            window.localStorage.setItem('serverest/userEmail', user.email)
            window.localStorage.setItem('serverest/userToken', response.body.authorization)
        })

        cy.visit('/minhaListaDeProdutos')

        const txt = 'Lista de Compras'
        this.isVisible(txt)

    },

    isVisible: function(txt) {
        cy.get('.jumbotron h1')
            .should('is.visible')
            .should('have.text', txt)
    },

    emptyShouldHave: function(txt) {
        cy.get('p[data-testid="shopping-cart-empty-message"]')
                .should('have.text', txt)
    },

    goToHome: function() {
        cy.get('button[data-testid="paginaInicial"]').click()
        Home.shouldBeVisible()
    },

    clear: function() {
        cy.get('button[data-testid="limparLista"]').click()
    },

    shouldHaveProduct: function(name) {
        cy.get('div[data-testid="shopping-cart-product-name"]')
                .should('to.contain', name)
    }

}