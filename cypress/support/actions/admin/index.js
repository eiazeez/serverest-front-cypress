

export const Admin = { 

    welcomeShouldBe: function(txt, name) {
        cy.get('h1').should('to.contain', txt)
        cy.get('h1').should('to.contain', name)
    }

}