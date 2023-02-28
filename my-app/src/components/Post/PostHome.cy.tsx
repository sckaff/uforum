import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { PostHome } from './PostHome'

describe('<PostHome />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <PostHome />
      </BrowserRouter>
    )
    cy.get('[data-cy=pop_cat]').should('have.text', 'Popular Categories')
    cy.get('[data-cy=class_cat]').should('have.text', 'Classwork Related')
    cy.get('[data-cy=campus_cat]').should('have.text', 'Campus Related')
    cy.get('[data-cy=other_cat]').should('have.text', 'Other')
  })
})