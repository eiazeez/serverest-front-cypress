

export const Notification = { 

    shouldHaveTxt: function(txt) {
        cy.get('span')
            .contains(txt)
            .should('be.visible')
    },

    successfulSignupShouldHaveTxt: function(txt) {
        cy.get('div[class*=alert]')
                .find('a')
                .should('have.text', txt)
    }

}