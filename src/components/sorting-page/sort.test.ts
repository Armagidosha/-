import { bubbleSort, selectionSort } from "./utils";

describe("sorting", () => {

  test("empty, ascending", () =>  {
    expect(bubbleSort([], true)).toStrictEqual([])
  })

  test("empty, descending", () =>  {
    expect(bubbleSort([], false)).toStrictEqual([])
  })

  test("only 1 element, ascending", () =>  {
    expect(bubbleSort([1], true)).toStrictEqual([1])
  })

  test("only 1 elelement, descending", () =>  {
    expect(bubbleSort([1], false)).toStrictEqual([1])
  })

  test("multiple elements, ascending", () =>  {
    expect(bubbleSort([1, 5, 19, 4], true)).toStrictEqual([1, 4, 5, 19])
  })

  test("multiple elements, descending", () =>  {
    expect(bubbleSort([1, 5, 19, 4], false)).toStrictEqual([19, 5, 4, 1])
  })

  test("empty, ascending, selection", () =>  {
    expect(selectionSort([], true)).toStrictEqual([])
  })

  test("empty, descending, selection", () =>  {
    expect(selectionSort([], false)).toStrictEqual([])
  })

  test("only 1 element, ascending, selection", () =>  {
    expect(selectionSort([1], true)).toStrictEqual([1])
  })

  test("only 1 elelement, descending, selection", () =>  {
    expect(selectionSort([1], false)).toStrictEqual([1])
  })

  test("multiple elements, ascending, selection", () =>  {
    expect(selectionSort([1, 5, 19, 4], true)).toStrictEqual([1, 4, 5, 19])
  })

  test("multiple elements, descending, selection", () =>  {
    expect(selectionSort([1, 5, 19, 4], false)).toStrictEqual([19, 5, 4, 1])
  })
})