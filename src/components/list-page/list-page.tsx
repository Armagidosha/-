import styles from './list-page.module.css'
import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { LinkedList } from "./List";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { useInput } from "../../utils/hooks";
import { ElementStates } from '../../types/element-states';
import { StateArray } from '../../types/uTypes';
import { Circle } from '../ui/circle/circle';
import { ArrowIcon } from '../ui/icons/arrow-icon';
import { delay } from '../../utils/utils';
import { DELAY_IN_MS } from '../../constants/delays';
import { AnimQueue } from '../../types/linked-list';
import { useLoading } from '../../utils/hooks';

const defList = ['1', '12', '42', '0', '8'].reverse().map(element => ({
  element: element,
  state: ElementStates.Default
}))

const list = new LinkedList<StateArray<string>>(defList)

export const ListPage: React.FC = () => {
  const { inputs, handleChange } = useInput({
    value: '',
    index: ''
  })

  const { isLoading, isDisabled, updateState } = useLoading({
    append: false,
    prepend: false,
    detachHead: false,
    detachTail: false,
    insertIndex: false,
    remIndex: false
  })

  const [result, setResult] = useState<StateArray<string>[]>([])
  const [animQueue, setAnimQueue] = useState<AnimQueue>({
    index: null,
    showCircle: false,
    isHead: false,
    element: null,
  })

  const renderCircle = (index: number, show: boolean, element: string, state?: ElementStates, isHead?: boolean) => {
    if (show) {
      setAnimQueue({
        index: index,
        isHead: isHead,
        showCircle: show,
        element: <Circle isSmall={true} letter={element} state={state} />
      })
    }
  }

  const hideCircle = () => {
    setAnimQueue({
      index: null,
      showCircle: false,
      isHead: false,
      element: null
    })
  }

  const append = async (element: string) => {
    updateState('append', true)
    renderCircle(result.length - 1, true, element, ElementStates.Changing, true)
    const tail = list.append({
      element: element, state: ElementStates.Modified
    })
    await delay(DELAY_IN_MS)
    setResult([...list.returnList()])
    hideCircle()
    tail.value.state = ElementStates.Default
    await delay(DELAY_IN_MS)
    setResult([...list.returnList()])
    updateState('append', false)
  }

  const prepend = async (element: string) => {
    updateState('prepend', true)
    renderCircle(0, true, element, ElementStates.Changing, true)
    const head = list.prepend({ element: element, state: ElementStates.Modified })
    await delay(DELAY_IN_MS)
    hideCircle()
    setResult([...list.returnList()])
    head.value.state = ElementStates.Default
    await delay(DELAY_IN_MS)
    setResult([...list.returnList()])
    updateState('prepend', false)
  }

  const remHead = async () => {
    updateState('detachHead', true)
    const element = list.detachHead()
    if (element) {
      renderCircle(0, true, element.value.element, ElementStates.Changing, false)
      element.value.element = ''
    }
    await delay(DELAY_IN_MS)
    hideCircle()
    setResult([...list.returnList()])
    updateState('detachHead', false)
  }

  const remTail = async () => {
    updateState('detachTail', true)
    const element = list.detachTail()
    if (element) {
      renderCircle(result.length - 1, true, element.value.element, ElementStates.Changing, false)
      element.value.element = ''
    }
    await delay(DELAY_IN_MS)
    hideCircle()
    setResult([...list.returnList()])
    updateState('detachTail', false)
  }

  const insertIndex = async (element: string, index: number) => {
    updateState('insertIndex', true)
    const addedNode = list.insertAt({
      element: element,
      state: ElementStates.Modified
    }, Number(index))
    for (let i = 0; i <= index; i++) {
      renderCircle(i, true, element, ElementStates.Changing, true)
      await delay(DELAY_IN_MS)
    }
    if (addedNode) {
      hideCircle()
      addedNode.value.state = ElementStates.Modified
      setResult([...list.returnList()])
      await delay(DELAY_IN_MS)
      addedNode.value.state = ElementStates.Default
    }
    setResult([...list.returnList()])
    updateState('insertIndex', false)
  }

  const remIndex = async (index: number) => {
    updateState('remIndex', true)
    const animlist = list.returnList()
    const deletedEl = animlist[index].element
    for (let i = 0; i <= index; i++) {
      animlist[i].state = ElementStates.Changing
      setResult([...animlist])
      await delay(DELAY_IN_MS)
    }
    animlist[index].element = ''
    animlist[index].state = ElementStates.Default
    setResult([...animlist])
    renderCircle(Number(index), true, deletedEl, ElementStates.Changing, false)
    list.removeAt(Number(index))
    await delay(DELAY_IN_MS)
    for (const elem of animlist) {
      elem.state = ElementStates.Default
    }
    hideCircle()
    setResult([...list.returnList()])
    updateState('remIndex', false)
  }

  useEffect(() => {
    setResult([...list.returnList()])
  }, [])

  return (
    <SolutionLayout title="Связный список">
      <div className={`${styles.inpContainer} input-container `}>
        <div className={styles.container}>
          <Input
            onChange={handleChange}
            placeholder='Введите значение'
            name='value'
            disabled={result.length === 6 || isDisabled}
            maxLength={4}
            isLimitText={true}
            extraClass={styles.input}
            data-cy='input' />
          <Button
            type='submit'
            text='Добавить в head'
            disabled={result.length === 6 || inputs.value.length === 0 || isDisabled}
            isLoader={isLoading.prepend}
            linkedList='big'
            onClick={() => prepend(inputs.value)}
            data-cy='button' />
          <Button
            type='submit'
            text='Добавить в tail'
            disabled={result.length === 6 || inputs.value.length === 0 || isDisabled}
            isLoader={isLoading.append}
            linkedList='big'
            onClick={() => append(inputs.value)}
            data-cy='button' />
          <Button
            type='submit'
            text='Удалить из head'
            isLoader={isLoading.detachHead}
            disabled={!result.length || isDisabled}
            linkedList='big'
            onClick={remHead}
            data-cy='button' />
          <Button
            type='submit'
            text='Удалить из tail'
            isLoader={isLoading.detachTail}
            disabled={!result.length || isDisabled}
            linkedList='big'
            onClick={remTail}
            data-cy='button' />
        </div>
        <div className={styles.container}>
          <Input
            onChange={handleChange}
            placeholder='Введите индекс'
            name='index'
            type='number'
            max={result.length - 1}
            disabled={result.length === 0 || isDisabled}
            extraClass={styles.input}
            data-cy='input' />
          <Button
            type='submit'
            text='Добавить по индексу'
            disabled={result.length === 6 || !inputs.index.length || inputs.index > result.length - 1 || !inputs.value.length || inputs.index < 0 || isDisabled}
            isLoader={isLoading.insertIndex}
            linkedList='big'
            onClick={() => insertIndex(inputs.value, inputs.index)}
            data-cy='button' />
          <Button
            type='submit'
            text='Удалить по индексу'
            disabled={result.length === 0 || !inputs.index.length || inputs.index < 0 || result.length <= inputs.index || isDisabled}
            isLoader={isLoading.remIndex}
            linkedList='big'
            onClick={() => remIndex(inputs.index)}
            data-cy='button' />
        </div>
        <ul className={styles.ul}>
          {result.map((element, index) => {
            return <li className={styles.li} key={index}>
              <div className={styles.circleContainer}>
                <Circle
                  letter={element.element}
                  tail={animQueue.showCircle && !animQueue.isHead && animQueue.index === index ? animQueue.element : index === result.length - 1 ? 'tail' : ''}
                  head={animQueue.showCircle && animQueue.isHead && animQueue.index === index ? animQueue.element : index % result.length === 0 ? 'head' : ''}
                  index={index}
                  state={element.state}
                />
              </div>
              {result[index + 1] ?
                <ArrowIcon /> : null
              }
            </li>
          }
          )

          }

        </ul>
      </div>
    </SolutionLayout>
  );
};