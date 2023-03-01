import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Login from './Login'

describe('<Login />', () => {
  it('renders', () => {
    // Login isnt fully implemented so test is simplistic
    cy.mount(
      <>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </>
      )
    cy.get('[data-cy=login_comp_button]').click()
    cy.get('[data-cy=alert]').should('have.text', 'Username or Password was incorrect!')
  })
})