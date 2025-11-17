

export const Access = {

    go: function () {
        cy.visit('/login')
        cy.get('form[class=form]').should('be.visible')
    },

    signupGo: function() {
        cy.visit('/cadastrarusuarios')
        cy.get('form[class=form]').should('be.visible')
    },

    fillLoginForm: function (user) {

        cy.get('#email')
            .type(user.email)

        cy.get('#password')
            .type(user.password)

    },

    fillSignupForm: function (user) {

        if( user.name )                        cy.get('#nome').type(user.name)

        if( user.email )                       cy.get('#email').type(user.email)

        if( user.password )                    cy.get('#password').type(user.password)
            
        if( user.administrator === "true" )    cy.get('#administrador').click()

    },

    clearForm: function () {

        cy.get('#email')
            .clear()

        cy.get('#password')
            .clear()

    },

    submitLoginForm: function() {

        cy.get('button[type="submit"]').click()

    },

    outputShouldBe: function(text) {

        cy.get('#email')
            .invoke('prop', 'validationMessage')
            .should('to.contain', text)

    }

}