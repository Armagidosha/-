import styles from './sorting-page.module.css'
import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { StateArray } from '../../types/uTypes';
import { Column } from '../ui/column/column';
import { ElementStates } from '../../types/element-states';
import { delay } from '../../utils/utils';
import { useLoading } from '../../utils/hooks';

export const SortingPage: React.FC = () => {

  const { isLoading, isDisabled, updateState } = useLoading({
    ascending: false,
    descending: false
  })

  const [result, setResult] = useState<StateArray<number>[]>([])
  const [sortingAlgo, setSortingAlgo] = useState<string>('selection')

  const randomizeArray = (minL: number, maxL: number) => {
    const arrayLength = Math.floor(Math.random() * (maxL - minL + 1)) + minL
    const randomizedArray: StateArray<number>[] = []
    for (let i = 0; i < arrayLength; i++) {
      randomizedArray.push({
        element: Math.floor(Math.random() * 101),
        state: ElementStates.Default
      })
    }
    setResult(randomizedArray)
  }

  const bubbleSort = async (arr: StateArray<number>[], ascending: boolean) => {
    const newArr = arr
    const length = newArr.length
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - 1 - i; j++) {
        newArr[j].state = ElementStates.Changing
        newArr[j + 1].state = ElementStates.Changing
        const shouldSwap = ascending ? newArr[j].element > newArr[j + 1].element :
          newArr[j].element < newArr[j + 1].element;

        if (shouldSwap) {
          const temp = newArr[j].element;
          newArr[j].element = newArr[j + 1].element;
          newArr[j + 1].element = temp;
          await delay()
          setResult([...newArr])
        }
        newArr[j].state = ElementStates.Default
        newArr[j + 1].state = ElementStates.Default
      }
      newArr[length - i - 1].state = ElementStates.Modified
    }
    setResult([...newArr])
  }


  const selectionSort = async (arr: StateArray<number>[], ascending: boolean) => {
    const newArr = arr
    const length = newArr.length;
    for (let i = 0; i < length; i++) {
      let minIndex = i;
      newArr[minIndex].state = ElementStates.Changing
      setResult([...newArr])
      for (let j = i + 1; j < length; j++) {
        newArr[j].state = ElementStates.Changing
        setResult([...newArr])
        await delay(100)
        const shouldSwap = ascending ?
          newArr[j].element < newArr[minIndex].element :
          newArr[j].element > newArr[minIndex].element;

        if (shouldSwap) {
          minIndex = j;
        }
        newArr[j].state = ElementStates.Default
        setResult([...newArr])
      }

      if (minIndex !== i) {
        const temp = newArr[i];
        newArr[i] = arr[minIndex];
        newArr[minIndex] = temp;
        newArr[minIndex].state = ElementStates.Default;
        newArr[i].state = ElementStates.Modified;
      }
      newArr[i].state = ElementStates.Modified;
    }

    setResult([...newArr])
  }

  const chooseFunc = async (ascending = true) => {
    if (sortingAlgo === 'selection') {
      ascending ? updateState('ascending', true) : updateState('descending', true)
      await selectionSort(result, ascending)

    } else {
      !ascending ? updateState('descending', true) : updateState('ascending', true)
      await bubbleSort(result, ascending)
    }
    updateState('ascending', false)
    updateState('descending', false)
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={`${styles.container} input-container`}>
        <div className={styles.radioContainer}>
          <RadioInput label="Выбор" name="sorting" disabled={isDisabled} onInput={() => setSortingAlgo('selection')} defaultChecked />
          <RadioInput label="Пузырёк" name="sorting" disabled={isDisabled} onInput={() => setSortingAlgo('bubble')} />
        </div>
        <Button
          text="По возрастанию"
          onClick={() => chooseFunc(true)}
          sorting={Direction.Ascending}
          isLoader={isLoading.ascending}
          disabled={isDisabled || !result.length}
          linkedList='big' />
        <Button
          text="По убыванию"
          onClick={() => chooseFunc(false)}
          sorting={Direction.Descending}
          isLoader={isLoading.descending}
          disabled={isDisabled || !result.length}
          linkedList='big' />
        <Button
          extraClass='ml-40'
          text='Новый массив'
          disabled={isDisabled}
          onClick={() => randomizeArray(3, 17)}
        />
      </div>
      <ul className={styles.ul}>
        {result.map((element, index) =>
          <li key={index}>
            <Column index={element.element} state={element.state} />
          </li>
        )}
      </ul>
    </SolutionLayout>
  );
};
