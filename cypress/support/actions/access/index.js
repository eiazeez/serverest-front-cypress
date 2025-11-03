

export const Access = {

    go: function () {
        cy.visit('https://front.serverest.dev/login')
        cy.get('form[class=form]').should('be.visible')
    },

    fillLoginForm: function (user) {

        cy.get('#email')
            .type(user.email)

        cy.get('#password')
            .type(user.password)

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