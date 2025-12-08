import { Access } from "../support/actions/access"
import { Home } from "../support/actions/home"
import { Notification } from "../support/actions/components/notification"
import { Admin } from "../support/actions/admin"

describe('Dado que estou na página de cadastro', function () {

  beforeEach(function() {
    cy.fixture('signup/successful').then(function(successful) {
      this.successful = successful
    })
    cy.fixture('signup/invalid').then(function(invalid) {
      this.invalid = invalid
    })
  })

  it('Então deve ser possível visualizar o formulário de cadastro', function () {

    Access.signupGo()

  })

  context('Quando preencho o formulário com dados válidos', function() {

    it('Então deve ser possível realizar CADASTRO como Usuário', function() {

      const user = this.successful.user

      cy.deleteUserByEmail(user.email)

      Access.signupGo()
      Access.fillSignupForm(user)
      Access.submitSignupForm()

      Notification.successfulSignupShouldHaveTxt('Cadastro realizado com sucesso')

      Home.shouldBeVisible()

    })

    it('Então deve ser possível realizar CADASTRO como Administrador', function() {

      const user = this.successful.admin

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

      const user = this.invalid.clear

      Access.signupGo()
      Access.fillSignupForm(user)
      Access.clearSignupForm()
      Access.submitSignupForm()

      Notification.shouldHaveTxt('Nome não pode ficar em branco')
      Notification.shouldHaveTxt('Email não pode ficar em branco')
      Notification.shouldHaveTxt('Password não pode ficar em branco')

    })

    it.only('Então o sistema não deve permitir cadastrar email sem @', function () {

      const user = this.invalid.badEmail

      Access.signupGo()
      Access.fillSignupForm(user)
      Access.submitSignupForm()
      Access.outputShouldBe('Inclua um "@" no endereço de e-mail.')

    })

  })

  context('Quando eu clico no botão "Entrar"', function() {

    it('Então deve ser possível ir para a página de Login', function() {

      Access.signupGo()
      cy.get('a[data-testid="entrar"]').click()

      Access.loginShouldBeVisible()

    })

  })

})