

export const Notification = { 

    shouldHaveTxt: function(txt) {
        cy.get('span')
            .contains(txt)
            .should('be.visible')
    }

}