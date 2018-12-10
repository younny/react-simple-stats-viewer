// TODO: Eslint setup for cypress.
describe('App E2E', () => {
  it('should have correct header text', () => {
    cy.visit('/')

    cy.get('h1')
    .should('have.text', 'Counter')
  })

  it('should increment and decrement the counter', () => {
    cy.visit('/')

    cy.get('p')
    .should('have.text', '0')

    cy.contains('Increment').click()
    cy.get('p')
    .should('have.text', '1')

    cy.contains('Increment').click()
    cy.get('p')
    .should('have.text', '2')

    cy.contains('Decrement').click()
    cy.get('p')
    .should('have.text', '1')
  })
})
