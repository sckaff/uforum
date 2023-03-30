import React from 'react'
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom'
import PostView from './PostView'
import '../../index.css'
import authService from '../../services/auth.service'

describe('<PostView />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react

    let token = "";
    authService.login('brian', 'brian').then(() => {
      cy.mount(
        <MemoryRouter initialEntries={["/posts/1"]}>
          <Routes>
            <Route>
              <Route path='/posts/:id' element={<PostView/>}/>
            </Route>
          </Routes>
        </MemoryRouter>
      )
      cy.get('[data-cy=comment-title]').should('have.text', 'Comments:')
      let comment = Math.random().toString(36).substring(7);
      cy.get('[data-cy=comment-input]').type(comment)
      cy.get('[data-cy=comment-submit]').click()
      cy.get(`[data-cy=comment-${comment}]`).should('have.text', comment)

    })

  })
})