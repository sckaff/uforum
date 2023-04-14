describe('testing comments/categories', () => {
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
    cy.get('[data-cy=category-Nightlife]').click();
    cy.wait(wait_time);
    cy.get('[data-cy=post-title-gators]').click();
    cy.wait(wait_time);
    cy.get('[data-cy=comment-input]').type('YAYAYAYAYAY');
    cy.wait(wait_time);
    cy.get('[data-cy=comment-submit]').click();
    cy.wait(wait_time);
    cy.get('[data-cy=comment-YAYAYAYAYAY]').should('exist');
    cy.wait(wait_time*2);
    cy.get('[data-cy=comment-delete-YAYAYAYAYAY]').click();
  })
})