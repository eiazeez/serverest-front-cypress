import { Access } from "../support/actions/access"

describe('Dado que estou na página de cadastro', function() {

  it('Então deve ser possível visualizar o formulário de cadastro', function(){

    Access.signupGo()

  })

   context('Quando preencho o formulário com dados válidos', () => {

    it.only('Então deve ser possível realizar CADASTRO como Usuário', () => {

      const user = {
        name: 'LeBron James',
        email: 'lebron-james-user@qa.com',
        password: 'isd123',
        administrator: 'false'
      }

      cy.deleteUserByEmail(user.email)

      Access.signupGo()
      Access.fillSignupForm(user)
   

      // cy.get('section[class="row espacamento"]').should('be.visible')

    })

    it('Então deve ser possível realizar CADASTRO como Adminisrtador', () => {

      const user = {
        name: 'Douglas QA Admin',
        email: 'teste-douglas-admin@admin.com',
        password: 'isd123',
        administrator: 'true'
      }

      cy.deleteUserByEmail(user.email)
      cy.postUser(user)

      Access.go()
      Access.fillLoginForm(user)
      Access.submitLoginForm()

      cy.get('h1').should('to.contain', 'Bem Vindo')
      cy.get('h1').should('to.contain', user.name)

    })

  })

})