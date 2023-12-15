const pages = [
  '[data-cy=recursion]',
  '[data-cy=fibonacci]',
  '[data-cy=sorting]',
  '[data-cy=stack]',
  '[data-cy=queue]',
  '[data-cy=list]'
]

describe('is accessible', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('pages is available', () => {
    pages.forEach(page => {
      cy.get(page).click()
      cy.go('back')
    })
  })
})