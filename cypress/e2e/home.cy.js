import { Header } from "../support/actions/components/header"
import { Home } from "../support/actions/home"


describe('Dado que estou na página Home', function () {

    beforeEach(function () {
        cy.fixture('login/successful').then(function (successful) {
            this.successful = successful
        })
    })

    it('Então deve ser possível realizar logout', function () {

        const user = this.successful.user

        cy.deleteUserByEmail(user.email)
        cy.postUser(user)

        Home.go(user)
        Header.logout()

    })
})