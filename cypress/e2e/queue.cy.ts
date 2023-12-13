import { buttonSelector, circleClass, circleContent, circleIsChanging, circleIsDefault, inputSelector } from "../../src/constants/utils"
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays"

describe('queue', () => {
  beforeEach(() => {
    cy.visit('/queue')
    cy.get(inputSelector).as('input')
    cy.get(buttonSelector).as('button')
    cy.get(buttonSelector).contains('Добавить').as('addButton')
    cy.get(buttonSelector).contains('Удалить').as('removeButton')
    cy.get(buttonSelector).contains('Очистить').as('clearButton')
  })

  it('checks if button is disabled', () => {
    cy.get('@input').should('be.empty')
    cy.get('@button').should('be.disabled')
  })

  it('adds elements to the queue', () => {
    cy.clock()
    cy.get('@input').type('10')
    cy.get('@addButton').click()
    cy.get(circleContent).as('circles')
    cy.get(circleClass).as('circle')
    cy.get('@circles').eq(0).should('contain', '10')
      .and('contain', 'head')
      .and('contain', 'tail')
    cy.get('@circle').eq(0).invoke('attr', 'class').should('include', circleIsChanging)
    cy.tick(SHORT_DELAY_IN_MS)
    cy.get('@circle').eq(0).invoke('attr', 'class').should('include', circleIsDefault)

    cy.get('@input').type('20')
    cy.get('@addButton').click()
    cy.get('@circles').eq(1).should('contain', '20')
      .and('contain', 'tail')
    cy.get('@circle').eq(1).invoke('attr', 'class').should('include', circleIsChanging)
    cy.tick(SHORT_DELAY_IN_MS)
    cy.get('@circle').eq(1).invoke('attr', 'class').should('include', circleIsDefault)

    cy.get('@circles').eq(0).should('contain', '10').and('contain', 'head')
    cy.get('@circles').eq(1).should('contain', '20').and('contain', 'tail')
  })

  it('removes an element from the queue', () => {
    cy.clock()
    cy.get('@input').type('10')
    cy.get('@addButton').click()
    cy.tick(SHORT_DELAY_IN_MS)
    cy.get('@input').type('20')
    cy.get('@addButton').click()
    cy.tick(SHORT_DELAY_IN_MS)
    cy.get(circleContent).as('circles')
    cy.get(circleClass).as('circle')
    cy.get('@removeButton').click()
    cy.get('@circle').eq(0).invoke('attr', 'class').should('include', circleIsChanging)
    cy.tick(SHORT_DELAY_IN_MS)
    cy.get('@circle').eq(0).should('contain', '').and('not.contain', 'head')
    cy.get('@circles').eq(1).should('contain', '20')
      .and('contain', 'head')
      .and('contain', 'tail')
  })

  it('clears the queue', () => {
    cy.clock()
    cy.get('@input').type('10')
    cy.get('@addButton').click()
    cy.tick(SHORT_DELAY_IN_MS)
    cy.get('@input').type('20')
    cy.get('@addButton').click()
    cy.tick(SHORT_DELAY_IN_MS)
    cy.get('@clearButton').click()
    cy.tick(SHORT_DELAY_IN_MS)
    cy.get(circleContent).each($el => {
      cy.wrap($el).should('contain', '')
        .and('not.contain', 'head')
        .and('not.contain', 'tail')
    })
  })
})