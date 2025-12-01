import { Access } from "../support/actions/access"
import { Home } from "../support/actions/home"
import { Notification } from "../support/actions/components/notification"
import { Admin } from "../support/actions/admin"

describe('Dado que estou na página de cadastro', function () {

  it('Então deve ser possível visualizar o formulário de cadastro', function () {

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

    it('Então deve ser possível realizar CADASTRO como Adminisrtador', () => {

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

  context('Quando preencho o formulário com dados inválidos', function () {

    const requiredFields = [
      { name: '', email: 'lebron-james-user@qa.com', password: 'isd123', output: 'Nome é obrigatório' },
      { name: 'Isaac', email: '', password: 'isd123', output: 'Email é obrigatório' },
      { name: 'Isaac', email: 'lebron-james-user@qa.com', password: '', output: 'Password é obrigatório' },
    ]

    requiredFields.forEach(function (required) {

      it(`Então o sistema deve retornar: "${required.output}"`, function () {

        Access.signupGo()
        Access.fillSignupForm(required)
        Access.submitSignupForm()

        Notification.shouldHaveTxt(required.output)

      })

    })

    it.only('Então o sistema deve retornar uma mensagem após enviar form com campos esvaziados', function () {

      const user = {
        name: 'James Bond',
        email: 'james-bond-user@qa.com',
        password: 'isd123',
        administrator: 'false'
      }

      Access.signupGo()
      Access.fillSignupForm(user)
      Access.clearSignupForm()
      Access.submitSignupForm()

      Notification.shouldHaveTxt('Nome não pode ficar em branco')
      Notification.shouldHaveTxt('Email não pode ficar em branco')
      Notification.shouldHaveTxt('Password não pode ficar em branco')

    })

  })

})