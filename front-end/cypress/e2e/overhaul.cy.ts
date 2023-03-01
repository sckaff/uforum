describe('template spec', () => {
  it('Load website', () => {
    cy.visit('localhost:3000') //Enter PostList page (default component) then interact
    cy.get('[data-cy=submit]').click()
    cy.get('[data-cy=submit]').should('have.text', 'Submit')
    cy.get('[data-cy=popup]').should('have.text', 'Invalid post!')
    cy.wait(800)
    cy.get('[data-cy=home_button]').click() //Enter home page then interact
    cy.get('[data-cy=pop_cat]').should('have.text', 'Popular Categories')
    cy.wait(800)
    cy.get('[data-cy=login_button]').click() //Enter login page then interact
    cy.get('[data-cy=login_comp_button]').click()
    cy.get('[data-cy=alert]').should('have.text', 'Username or Password was incorrect!')
  })
})