import { swap } from "../../utils/utils"

export const reverseString = (string: string) => {
  const stringArr = string.split('')
  let left = 0
  let right = string.length - 1

  while (left < right) {
    swap(stringArr, left, right)
    left++
    right--
  }
  const reversedString = stringArr.join('')
  return reversedString
}