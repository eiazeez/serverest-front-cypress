import { Access } from "../support/actions/access"
import { Notification } from "../support/actions/components/notification"
import { Home } from "../support/actions/home"
import { Admin } from "../support/actions/admin"

describe('Dado que estou na página de login', function() {

  beforeEach(function() {
    cy.fixture('login/successful').then(function(successful) {
      this.successful = successful
    })
    cy.fixture('login/invalid').then(function(invalid) {
      this.invalid = invalid
    })
  })

  it('Então deve ser possível visualizar o formulário de login', () => {

    Access.go()

  })

  context('Quando preencho o formulário com dados válidos', function() {

    it('Então deve ser possível realizar LOGIN como Usuário', function() {

      const user = this.successful.user

      cy.deleteUserByEmail(user.email)
      cy.postUser(user)

      Access.go()
      Access.fillLoginForm(user)
      Access.submitLoginForm()

      Home.shouldBeVisible()

    })

    it('Então deve ser possível realizar LOGIN como Adminisrtador', function() {

      const user = this.successful.admin

      cy.deleteUserByEmail(user.email)
      cy.postUser(user)

      Access.go()
      Access.fillLoginForm(user)
      Access.submitLoginForm()

      Admin.welcomeShouldBe('Bem Vindo', user.name)

    })

  })

  context('Quando preencho o formulário de forma inválida', function() {

    it('Então não deve ser possível logar sem preencher os dados', function(){

      Access.go()
      Access.submitLoginForm()

      Notification.shouldHaveTxt('Email é obrigatório')
      Notification.shouldHaveTxt('Password é obrigatório')

    })

    it('Então o sistema deve retornar que os campos não podem ficar vazios', function() {

      const user = this.invalid.clear

      Access.go()
      Access.fillLoginForm(user)
      Access.clearLoginForm()
      Access.submitLoginForm()

      Notification.shouldHaveTxt('Email não pode ficar em branco')
      Notification.shouldHaveTxt('Password não pode ficar em branco')

    })

    it('Então não deve ser possível logar usuário não cadastrado', function() {

      const user = this.invalid.unregistered

      Access.go()
      Access.fillLoginForm(user)
      Access.submitLoginForm()
     
      Notification.shouldHaveTxt('Email e/ou senha inválidos')
    })

    it.only('Então não deve ser possível logar com email inválido', function() {

      const user = this.invalid.badEmail

      Access.go()
      Access.fillLoginForm(user)
      Access.submitLoginForm()
      Access.outputShouldBe('Inclua um "@" no endereço de e-mail.')

    })
  })

  context('Quando clico na âncora Cadastre-se', () => {

    it('Então deve ser possível visualizar o formulário de cadastro', () => {

      Access.go()

      cy.get('a[data-testid="cadastrar"]').click()
      cy.get('.form').should('be.visible')

    })

  })
})