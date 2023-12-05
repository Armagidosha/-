import styles from './stack-page.module.css'
import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { useInput, useLoading } from '../../utils/hooks';
import { Circle } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';
import { StateArray } from '../../types/uTypes';
import { delay } from '../../utils/utils';
import { Stack } from './Stack';

const stack = new Stack<StateArray<string>>()

export const StackPage: React.FC = () => {

  const { inputs, setValues, handleChange } = useInput({
    value: ''
  })
  const { isLoading, isDisabled, updateState } = useLoading({
    clear: false,
    pop: false,
    push: false
  })
  const [result, setResult] = useState<StateArray<string>[]>([])



  const push = async () => {
    updateState('push', true)
    if (stack.size > 10) {
      return
    }
    setValues({ value: '' })
    stack.push({
      element: inputs.value,
      state: ElementStates.Changing,
    })
    setResult([...stack.stack])
    await delay()
    stack.stack[stack.size - 1].state = ElementStates.Default
    updateState('push', false)
  }

  const pop = async () => {
    updateState('pop', true)
    if (stack.size < 1) {
      return
    }
    stack.stack[stack.size - 1].state = ElementStates.Changing
    await delay()
    stack.pop()
    setResult([...stack.stack])
    updateState('pop', false)
  }

  const clear = async () => {
    updateState('clear', true)
    await delay()
    stack.clear()
    setResult([...stack.stack])
    updateState('clear', false)

  }


  return (
    <SolutionLayout title="Стек">
      <div className={`${styles.container} input-container`}>
        <Input
          isLimitText={true}
          maxLength={4}
          onChange={handleChange}
          disabled={isDisabled}
          name='value'
          value={inputs.value}
        />
        <Button
          type="submit"
          text='Добавить'
          onClick={push}
          disabled={isDisabled || !inputs.value.length}
          isLoader={isLoading.push} />
        <Button
          type="button"
          text='Удалить'
          onClick={pop}
          disabled={isDisabled || !stack.size} 
          isLoader={isLoading.pop} />
        <Button
          extraClass='ml-40'
          type="reset"
          text='Очистить'
          onClick={clear}
          disabled={isDisabled || !stack.size}
          isLoader={isLoading.clear} />
      </div>
      <ul className={styles.ul}>
        {result.map((element, index) =>
          <li key={index}>
            <Circle
              letter={`${element.element}`}
              index={index}
              state={element.state}
              head={index === result.length - 1 ? 'top' : ''} />
          </li>)}
      </ul>
    </SolutionLayout>
  );
};
