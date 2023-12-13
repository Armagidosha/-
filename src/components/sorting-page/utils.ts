export const bubbleSort = (arr: number[], ascending: boolean) => {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      const shouldSwap = ascending ? arr[j] > arr[j + 1] : arr[j] < arr[j + 1];

      if (shouldSwap) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  return arr;
};

export const selectionSort = (arr: number[], ascending: boolean) => {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      const shouldSwap = ascending ? arr[j] < arr[minIndex] : arr[j] > arr[minIndex];

      if (shouldSwap) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      const temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }
  }

  return arr;
};