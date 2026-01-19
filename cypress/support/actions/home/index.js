import { Access } from "../access"

export const Home = {

    shouldBeVisible: function () {

        cy.get('section[class="row espacamento"]').should('be.visible')

    },

    go: function (user) {

        cy.apiLogin(user).then(function (response) {
            window.localStorage.setItem('serverest/userEmail', user.email)
            window.localStorage.setItem('serverest/userToken', response.body.authorization)
        })

        cy.visit('/home')

    },

    searchProduct: function (name) {

        cy.get('input[type="search"]').type(name)
        cy.get('button[data-testid="botaoPesquisar"]').click()

    },

    addToList: function () {
        cy.get('button[data-testid="adicionarNaLista"]').click()
    }

}