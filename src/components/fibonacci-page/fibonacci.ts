export const calcFibonacci = (num: number) => {
  let fibonacci: number[] = [];
  if (num >= 0) {
    fibonacci.push(0)
  }
  if (num >= 1) {
    fibonacci.push(1)
  }
  for (let i = 2; i < num + 1; i++) {
    fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2];
  }
  return fibonacci
};