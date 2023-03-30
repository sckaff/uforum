import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Home from './Home'
import '../../index.css'

describe('<Home />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<BrowserRouter><Home loggedIn={false}/></BrowserRouter>)
    cy.get('[data-cy=events-tab]').should('have.text', 'Events');
    cy.get('[data-cy=categories-tab]').should('have.text', 'Categories');
    cy.get('[data-cy=recents-tab]').should('have.text', 'Recents');
  })
})