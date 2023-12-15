import { SHORT_DELAY_IN_MS } from "../../src/constants/delays"
import { circleClass, circleIsDefault } from "../../src/constants/utils"

const fibonacciState = [
  '0', '1', '1', '2', '3', '5', '8', '13', '21', '34', '55'
]

describe('fibonacci', () => {
  beforeEach(() => {
    cy.visit('/fibonacci')
    cy.get('[data-cy=input]').as('input')
    cy.get('[data-cy=button]').as('button')
  })

  it('is button disabled', () => {
    cy.get('@input').should('be.empty')
    cy.get('@button').should('be.disabled')
  })

  it('fibonacci sequence', () => {
    cy.clock()
    cy.get('@input').type('10')
    cy.get('@button').click()
    cy.tick(SHORT_DELAY_IN_MS)
    cy.get(circleClass).as('circles')
    for (let i = 0; i < fibonacciState.length; i++) {
      cy.tick(SHORT_DELAY_IN_MS);
      for (let j = 0; j <= i; j++) {
        cy.get('@circles').eq(j)
          .should('contain', fibonacciState[j])
          .invoke('attr', 'class')
          .should('contain', circleIsDefault)
      }
    }
  })
})