

export const Cart = {

    go: function(user) {

        cy.apiLogin(user).then(function(response){
            window.localStorage.setItem('serverest/userEmail', user.email)
            window.localStorage.setItem('serverest/userToken', response.body.authorization)
        })

        cy.visit('/carrinho')

    },

    isVisible: function(txt) {
        cy.get('.jumbotron h1')
            .should('is.visible')
            .should('have.text', txt)
    }

}