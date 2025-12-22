import { Access } from "../access"

export const Home = {

    shouldBeVisible: function() {

        cy.get('section[class="row espacamento"]').should('be.visible')

    },

    go: function(user) {

        cy.apiLogin(user).then(function(response){
            window.localStorage.setItem('serverest/userEmail', user.email)
            window.localStorage.setItem('serverest/userToken', response.body.authorization)
        })

        cy.visit('/home')

    }

}