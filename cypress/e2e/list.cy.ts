import { DELAY_IN_MS } from "../../src/constants/delays"
import { buttonSelector, circleClass, circleContent, circleIsChanging, circleIsDefault, circleIsModified, inputSelector, smallCircleClass } from "../../src/constants/utils"

describe('List', () => {
  beforeEach(() => {
    cy.visit('/list')
    cy.get(buttonSelector).as('button')
    cy.get(`${inputSelector}[placeholder="Введите значение"]`).as('valueInput')
    cy.get(`${inputSelector}[placeholder="Введите индекс"]`).as('indexInput')
    cy.get(buttonSelector).contains('Добавить в head').parent().as('addHeadButton')
    cy.get(buttonSelector).contains('Добавить в tail').parent().as('addTailButton')
    cy.get(buttonSelector).contains('Удалить из head').parent().as('removeHeadButton')
    cy.get(buttonSelector).contains('Удалить из tail').parent().as('removeTailButton')
    cy.get(buttonSelector).contains('Добавить по индексу').parent().as('addByIndexButton')
    cy.get(buttonSelector).contains('Удалить по индексу').parent().as('removeByIndexButton')
  })

  it('checks if button is disabled', () => {
    cy.get('@valueInput').should('be.empty')
    cy.get('@indexInput').should('be.empty')
    cy.get('@removeTailButton').should('not.be.disabled')
    cy.get('@removeHeadButton').should('not.be.disabled')
    cy.get('@addHeadButton').should('be.disabled')
    cy.get('@addTailButton').should('be.disabled')
    cy.get('@addByIndexButton').should('be.disabled')
    cy.get('@removeByIndexButton').should('be.disabled')
  })

  it('checks default list', () => {
    cy.get(circleContent).should('have.length', 5).each(($el, index) => {
      cy.wrap($el).should('contain', index)
      index === 0 ? cy.wrap($el).should('contain', 'head') :
        index === 4 ? cy.wrap($el).should('contain', 'tail') :
          index < 5 && cy.wrap($el).parent().next('svg')
    })
  })

  it('adds elements to the head', () => {
    cy.clock()
    cy.get('@valueInput').eq(0).type('1000')
    cy.get('@addHeadButton').click()
    cy.get(smallCircleClass)
      .should('contain', '1000')
      .invoke('attr', 'class')
      .should('contain', circleIsChanging)
    cy.tick(DELAY_IN_MS)
    cy.get(circleContent).first().should('contain', '1000')
      .and('contain', 'head')
      .children(circleClass)
      .invoke('attr', 'class')
      .should('contain', circleIsModified)
    cy.tick(DELAY_IN_MS)
    cy.get(circleClass).first().invoke('attr', 'class')
      .should('contain', circleIsDefault)
  })

  it('adds elements to the tail', () => {
    cy.clock()
    cy.get('@valueInput').eq(0).type('2000')
    cy.get('@addTailButton').click()
    cy.get(smallCircleClass)
      .should('contain', '2000')
      .invoke('attr', 'class')
      .should('contain', circleIsChanging)
    cy.tick(DELAY_IN_MS)
    cy.get(circleContent).eq(5).should('contain', '2000')
      .and('contain', 'tail')
      .children(circleClass)
      .invoke('attr', 'class')
      .should('contain', circleIsModified)
    cy.tick(DELAY_IN_MS)
    cy.get(circleClass).eq(5).invoke('attr', 'class')
      .should('contain', circleIsDefault)
  })

  it('removes an element from the head', () => {
    cy.clock()
    cy.get(circleClass).should('have.length', 5)
    cy.get('@removeHeadButton').click()
    cy.get(circleClass).first().should('contain', '')
    cy.get(smallCircleClass).should('contain', '1')
    .invoke('attr', 'class')
    .should('contain', circleIsChanging)
    cy.tick(DELAY_IN_MS)
    cy.get(circleClass).should('have.length', 4)
    cy.get(circleContent).first().should('contain', '12')
    .and('contain', 'head')
  })

  it('removes an element from the tail', () => {
    cy.clock()
    cy.get(circleClass).should('have.length', 5)
    cy.get('@removeTailButton').click()
    cy.get(circleClass).last().should('contain', '')
    cy.get(smallCircleClass).should('contain', '8')
    .invoke('attr', 'class')
    .should('contain', circleIsChanging)
    cy.tick(DELAY_IN_MS)
    cy.get(circleClass).should('have.length', 4)
    cy.get(circleContent).last().should('contain', '0')
    .and('contain', 'tail')
  })

  it('adds elements by index', () => {
    cy.clock()
    cy.get('@valueInput').type('1000')
    cy.get('@indexInput').type('3')
    cy.get('@addByIndexButton').click()
    cy.get('[data-cy=circle]').as('circles')
    
    cy.get('@circles').should('have.length', '5').each(($el, index) => {
      if (index < 4) {
        cy.wrap($el).find(smallCircleClass).should('contain', '1000').invoke('attr', 'class').should('contain', circleIsChanging)
        cy.tick(DELAY_IN_MS)
      }
    })
    cy.get('@circles').eq(3).should('contain', 1000)
      .children(circleClass)
      .invoke('attr', 'class')
      .should('contain', circleIsModified)
      cy.tick(DELAY_IN_MS)
    cy.get('@circles').eq(3).should('contain', 1000)
      .children(circleClass)
      .invoke('attr', 'class')
      .should('contain', circleIsDefault)
  })

  it('removes elements by index', () => {
    cy.clock()
    cy.get('@indexInput').type('3')
    cy.get('@removeByIndexButton').click()
    cy.get(circleClass).should('have.length', '5').each(($el, index) => {
      if (index < 4) {
        cy.wrap($el).invoke('attr', 'class').should('contain', circleIsChanging)
        cy.tick(DELAY_IN_MS)
      }
    })
    cy.get(circleClass).eq(3).should('not.have.text').invoke('attr', 'class').should('contain', circleIsDefault)
    cy.get(smallCircleClass).should('contain', '0').invoke('attr', 'class').should('contain', circleIsChanging)
    cy.get(circleClass).eq(3).should('contain', '')
    cy.tick(DELAY_IN_MS)
    cy.get(circleClass).should('have.length', '4')
  })
})