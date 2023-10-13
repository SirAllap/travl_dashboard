beforeEach(() => {
  cy.visit('http://localhost:3000/')
})
describe('Should log in to the website', () => {
  it('Should login into the website manually writing the credentials and logout', () => {
    cy.get("[data-cy='input-user']").type('Admin')
    cy.get("[data-cy='input-password']").type('oxygen')
    cy.get("[data-cy='trigger-login-button']").click()
    cy.location('pathname').should('include', '/')
    cy.get("[data-cy='icon-trigger-logout']").click()
    cy.location('pathname').should('include', '/login')
  })

  it('Should login into the website manually writing the credentials, should navigate to "/rooms" and then logout', () => {
    cy.get("[data-cy='input-user']").type('Admin')
    cy.get("[data-cy='input-password']").type('oxygen')
    cy.get("[data-cy='trigger-login-button']").click()
    cy.location('pathname').should('include', '/')
    cy.visit('http://localhost:3000/rooms')
    cy.location('pathname').should('include', '/rooms')
    cy.get("[data-cy='icon-trigger-logout']").click()
    cy.location('pathname').should('include', '/login')
  })

  it('Should login into the website by pressing the xtraquick login button and does not redirect to "/login" when user is loged ', () => {
    cy.get("[data-cy='xtraquick-login-button']").click()
    cy.get("[data-cy='xtraquick-login-button']").click()
    cy.get("[data-cy='trigger-login-button']").click()
    cy.location('pathname').should('include', '/')
    cy.visit('http://localhost:3000/login')
    cy.location('pathname').should('not.include', '/login')
  })
})

describe('Should NOT log in to the website', () => {
  it('Should NOT login into the website manually writing WRONG the credentials', () => {
    cy.get("[data-cy='input-user']").type('paco')
    cy.get("[data-cy='input-password']").type('oxigenado')
    cy.get("[data-cy='trigger-login-button']").click()
  })
})

describe('Should not redirect to the website if the user has not login', () => {
  it('Does not redirect to the root "/" if not login', () => {
    cy.location('pathname').should('include', '/login')
  })

  it('Does not redirect to the rooms route "/rooms" if not login', () => {
    cy.location('pathname').should('include', '/login')
  })
})
