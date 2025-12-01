import { Access } from "../support/actions/access"
import { Notification } from "../support/actions/components/notification"
import { Home } from "../support/actions/home"
import { Admin } from "../support/actions/admin"

describe('Dado que estou na página de login', () => {

  it('Então deve ser possível visualizar o formulário de login', () => {

    Access.go()

  })

  context('Quando preencho o formulário com dados válidos', () => {

    it('Então deve ser possível realizar LOGIN como Usuário', () => {

      const user = {
        name: 'Douglas QA',
        email: 'teste-douglas-qa@qa.com',
        password: 'isd123',
        administrator: 'false'
      }

      cy.deleteUserByEmail(user.email)
      cy.postUser(user)

      Access.go()
      Access.fillLoginForm(user)
      Access.submitLoginForm()

      Home.shouldBeVisible()

    })

    it('Então deve ser possível realizar LOGIN como Adminisrtador', () => {

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

      Admin.welcomeShouldBe('Bem Vindo', user.name)

    })

  })

  context('Quando preencho o formulário de forma inválida', () => {

    it('Então não deve ser possível logar sem preencher os dados', () => {

      Access.go()
      Access.submitLoginForm()

      Notification.shouldHaveTxt('Email é obrigatório')
      Notification.shouldHaveTxt('Password é obrigatório')

    })

    it('Então o sistema deve retornar que os campos não podem ficar vazios', () => {

      const user = { email:'emailDeTeste@email.com' , password: 'SENHABEMALEATORIA' }

      Access.go()
      Access.fillLoginForm(user)
      Access.clearForm()
      Access.submitLoginForm()

      Notification.shouldHaveTxt('Email não pode ficar em branco')
      Notification.shouldHaveTxt('Password não pode ficar em branco')

    })

    it('Então não deve ser possível logar usuário não cadastrado', () => {

      const user = { email: 'emailDeTeste@email.com', password: 'SENHABEMALEATORIA' }

      Access.go()
      Access.fillLoginForm(user)
      Access.submitLoginForm()
     
      Notification.shouldHaveTxt('Email e/ou senha inválidos')
    })

    it('Então não deve ser possível logar com email inválido', () => {

      const user = { email: 'emailDeTesteemail.com', password: 'SENHABEMALEATORIA' }

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