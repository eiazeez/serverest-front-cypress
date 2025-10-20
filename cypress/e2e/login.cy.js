import { Access } from "../support/actions/access"
import { Notification } from "../support/actions/components/notification"

describe('Dado que estou na página de login', () => {

  it('Então deve ser possível visualizar o formulário de login', () => {

    Access.go()

  })

  context('Quando preencho o formulário com dados válidos', () => {

    it('Então deve ser possível visualizar a Home', () => {

      const user = { email: 'teste-douglas-qa@qa.com', password: 'isd123'}

      Access.go()
      Access.fillLoginForm(user)
      Access.submitLoginForm()

      cy.get('section[class="row espacamento"]').should('be.visible')

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

    it('Então não deve ser possível logar com dados inválidos', () => {

      const user = { email: 'emailDeTeste@email.com', password: 'SENHABEMALEATORIA' }

      Access.go()
      Access.fillLoginForm(user)
      Access.submitLoginForm()
     
      Notification.shouldHaveTxt('Email e/ou senha inválidos')
    })
  })

  context('Quando clico no âncora Cadastre-se', () => {

    it('Então deve ser possível visualizar o formulário de cadastro', () => {

      Access.go()

      cy.get('a[data-testid="cadastrar"]').click()

      cy.get('.form').should('be.visible')

    })

  })
})