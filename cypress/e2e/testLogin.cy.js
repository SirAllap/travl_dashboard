describe('Should log in to the website', () => {
  it('Should login into the website manually writing the credentials and logout', () => {
    cy.visit('http://localhost:3000/')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500)
    cy.get("[data-cy='input-user']").type('Admin')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500)
    cy.get("[data-cy='input-password']").type('oxygen')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500)
    cy.get("[data-cy='trigger-login-button']").click()
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500)
    cy.location('pathname').should('include', '/')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000)
    cy.get("[data-cy='icon-trigger-logout']").click()
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500)
    cy.location('pathname').should('include', '/login')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500)
  })
  it('Should login into the website by pressing the xtraquick login button and does not redirect to "/login" when user is loged ', () => {
    cy.visit('http://localhost:3000/')
    cy.get("[data-cy='xtraquick-login-button']").click()
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500)
    cy.get("[data-cy='xtraquick-login-button']").click()
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500)
    cy.get("[data-cy='trigger-login-button']").click()
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500)
    cy.location('pathname').should('include', '/')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500)
    cy.visit('http://localhost:3000/login')
    cy.location('pathname').should('not.include', '/login')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000)
  })
})

describe('Should NOT log in to the website', () => {
  it('Should NOT login into the website manually writing WRONG the credentials', () => {
    cy.visit('http://localhost:3000/')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500)
    cy.get("[data-cy='input-user']").type('paco')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500)
    cy.get("[data-cy='input-password']").type('oxigenado')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500)
    cy.get("[data-cy='trigger-login-button']").click()
  })
})

describe('Should not redirect to the website if the user has not login', () => {
  it('Does not redirect to the root "/" if not login', () => {
    cy.visit('http://localhost:3000/')
    cy.location('pathname').should('include', '/login')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500)
  })
  it('Does not redirect to the rooms route "/rooms" if not login', () => {
    cy.visit('http://localhost:3000/rooms')
    cy.location('pathname').should('include', '/login')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500)
  })
})
