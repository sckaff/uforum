describe('template spec', () => {
  it('passes', () => {
    const wait_time = 300;
    cy.visit('http://localhost:3000/')
    cy.wait(wait_time);
    cy.get('[data-cy=login-button]').click();
    cy.wait(wait_time);
    cy.get('[data-cy=username-input]').type('brian');
    cy.wait(wait_time);
    cy.get('[data-cy=password-input]').type('brian');
    cy.wait(wait_time);
    cy.get('[data-cy=submit-button]').click();
    cy.wait(wait_time);
    cy.get('[data-cy=home-button]').click();
    cy.wait(wait_time);
    cy.get('[data-cy=create-post-button]').click();
    cy.wait(wait_time);
    const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    cy.get('[data-cy=post-title-input]').type(randomString);
    cy.wait(wait_time);
    cy.get('[data-cy=post-body-input]').type(randomString + randomString + randomString);
    cy.wait(wait_time);
    cy.get('[data-cy=post-category-select]').select('Campus');
    cy.wait(wait_time);
    cy.get('[data-cy=post-submit-button]').click();
    cy.wait(wait_time);
    cy.get('[data-cy=home-button]').click();
    cy.wait(wait_time);
    cy.get(`[data-cy=post-${randomString}]`).should('exist');
    cy.wait(wait_time + 400);
    cy.get('[data-cy=profile-button]').click();
    cy.wait(wait_time);
    cy.get(`[data-cy=post-delete-${randomString}]`).click();
    cy.wait(wait_time);
    cy.get('[data-cy=home-button]').click();
  })
})