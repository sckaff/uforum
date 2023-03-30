import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import '../../index.css'
import Search from './Search'

describe('<Search />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<BrowserRouter><Search loggedIn={false}/></BrowserRouter>)
    cy.get('[data-cy=search-box]').type('Title')
    cy.get('[data-cy=category-selector]').select('Campus')
    cy.get('[data-cy=post-Title]').should('have.text', 'Title');

  })
})