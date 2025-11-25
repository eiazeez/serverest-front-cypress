import { Access } from "../support/actions/access"
import { Home } from "../support/actions/home"
import { Notification } from "../support/actions/components/notification"
import { Admin } from "../support/actions/admin"

describe('Dado que estou na página de cadastro', function() {

  it('Então deve ser possível visualizar o formulário de cadastro', function(){

    Access.signupGo()

  })

   context('Quando preencho o formulário com dados válidos', () => {

    it('Então deve ser possível realizar CADASTRO como Usuário', () => {

      const user = {
        name: 'LeBron James',
        email: 'lebron-james-user@qa.com',
        password: 'isd123',
        administrator: 'false'
      }

      cy.deleteUserByEmail(user.email)

      Access.signupGo()
      Access.fillSignupForm(user)
      Access.submitSignupForm()

      Notification.successfulSignupShouldHaveTxt('Cadastro realizado com sucesso')
    
      Home.shouldBeVisible()

    })

    it.only('Então deve ser possível realizar CADASTRO como Adminisrtador', () => {

      const user = {
        name: 'Stephen Curry',
        email: 'steph-curry-admin@qa.com',
        password: 'isd123',
        administrator: 'true'
      }

      cy.deleteUserByEmail(user.email)

      Access.signupGo()
      Access.fillSignupForm(user)
      Access.submitSignupForm()

      Notification.successfulSignupShouldHaveTxt('Cadastro realizado com sucesso')
    
      Admin.welcomeShouldBe('Bem Vindo', user.name)

    })

  })

})