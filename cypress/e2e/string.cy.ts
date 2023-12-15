import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { buttonSelector, circleClass, circleIsChanging, circleIsDefault, circleIsModified, inputSelector } from "../../src/constants/utils";

const unreversedString = 'test';
const reversedString = 'tset';

const sansReverseState = [
  circleIsChanging,
  circleIsDefault,
  circleIsDefault,
  circleIsChanging
];

const halfReverseState = [
  circleIsModified,
  circleIsChanging,
  circleIsChanging,
  circleIsModified
];

const fullReverseState = [
  circleIsModified,
  circleIsModified,
  circleIsModified,
  circleIsModified
]

/**
 * Checks the state of each element after a tick.
 *
 * @param {string[] | string} state - The state of the elements.
 * @param {string} reverse - The reverse state of the elements.
 * @return {void} This function does not return anything.
 */
const checkStateAfterTick = (state: string[] | string, reverse: string): void => {
  cy.get(circleClass).each(($element, index) => {
    cy.wrap($element)
      .invoke('attr', 'class')
      .should('include', state[index]);
    cy.get(circleClass).contains(reverse[index])
  })
}

describe('recursion', () => {
  beforeEach(() => {
    cy.visit('/recursion')
    cy.get(inputSelector).as('input')
    cy.get(buttonSelector).as('button')
  })

  it('checks if button is disabled', () => {
    cy.get('@input').should('be.empty')
    cy.get('@button').should('be.disabled')
  })

  it('reverse string', () => {
    cy.clock()
    cy.get('@input').type('test')
    cy.get('@button').click()
    checkStateAfterTick(sansReverseState, unreversedString)
    cy.tick(SHORT_DELAY_IN_MS)
    checkStateAfterTick(halfReverseState, unreversedString)
    cy.tick(SHORT_DELAY_IN_MS)
    checkStateAfterTick(fullReverseState, reversedString)
  });
});