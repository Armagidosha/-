import { reverseString } from "./utils"

describe('recursion', () => {
  it ('empty', () => {
    expect(reverseString('')).toBe('')
  })

  it('only 1 element', () => {
    expect(reverseString('t')).toBe('t')
  })

  it('odd', () => {
    expect(reverseString('tes')).toBe('set')
  })

  it('even', () => {
    expect(reverseString('test')).toBe('tset')
  })
})