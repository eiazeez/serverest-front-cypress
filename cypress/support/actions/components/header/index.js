import { Access } from "../../access"

export const Header = {

    logout: function () {
        cy.get('button[data-testid="logout"]').click()
        Access.loginShouldBeVisible()
    }

}