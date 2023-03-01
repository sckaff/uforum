/// <reference types="Cypress" />
import React from 'react'
import PostList from './PostList'

//NOTE THESE TEST CASES REQUIRE THE BACKEND RUNNING!
describe('<PostList />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<PostList />)

    //Test invalid post submission
    cy.get('[data-cy=submit]').click()
    cy.get('[data-cy=submit]').should('have.text', 'Submit')
    cy.get('[data-cy=popup]').should('have.text', 'Invalid post!')

    //Test valid post submission
    cy.get('[data-cy=name_field]').type('Barry')
    cy.get('[data-cy=title_field]').type('Wriggly Biggly')
    cy.get('[data-cy=content_field]').type('My new snake is so cool!')
    cy.get('[data-cy=submit]').click()
    cy.get('[data-cy=popup]').should('have.text', 'Successfully created post!')

    //Test post deletion
    cy.get('[data-cy=Barry_accordion]').click({multiple: true})
    cy.get('[data-cy=Barry_delete]').click({multiple: true})
    cy.get('[data-cy=popup]').should('have.text', 'Successfully deleted post!')
  })
})