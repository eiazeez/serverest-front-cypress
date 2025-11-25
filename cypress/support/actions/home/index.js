

export const Home = {

    shouldBeVisible: function() {

        cy.get('section[class="row espacamento"]').should('be.visible')

    }

}