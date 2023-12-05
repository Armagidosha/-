import { SHORT_DELAY_IN_MS } from "../constants/delays";
import { StateArray } from "../types/uTypes";

export const swap = (arr: StateArray<string>[], firstIndex: number, secondIndex: number): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

export function delay(ms: number = SHORT_DELAY_IN_MS): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}