import styles from './stack-page.module.css'
import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { useInput } from '../../utils/hooks';
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
  const [result, setResult] = useState<StateArray<string>[]>([])
  const [isDisabled, setIsDisabled] = useState<boolean>()



  const push = async () => {
    if (stack.size > 10) {
      return
    }
    setValues({ value: '' })
    setIsDisabled(true)

    stack.push({
      element: inputs.value,
      state: ElementStates.Changing,
    })
    setResult([...stack.stack])
    await delay()
    stack.stack[stack.size - 1].state = ElementStates.Default
    setIsDisabled(false)
  }

  const pop = async () => {
    if (stack.size < 1) {
      return
    }
    setIsDisabled(true)
    stack.stack[stack.size - 1].state = ElementStates.Changing
    await delay()
    stack.pop()
    setResult([...stack.stack])
    setIsDisabled(false)
  }

  const clear = async () => {
    setIsDisabled(true)
    await delay()
    stack.clear()
    setResult([...stack.stack])
    setIsDisabled(false)
  }


  return (
    <SolutionLayout title="Стек">
      <div className={`${styles.container} input-container`}>
        <Input
          isLimitText={true}
          maxLength={4}
          onChange={handleChange}
          name='value'
          value={inputs.value}
        />
        <Button
          type="submit"
          text='Добавить'
          onClick={push}
          isLoader={isDisabled} />
        <Button
          type="button"
          text='Удалить'
          onClick={pop}
          isLoader={isDisabled}
          disabled={stack.size ? false : true} />
        <Button
          extraClass='ml-40'
          type="reset"
          text='Очистить'
          onClick={clear}
          disabled={!stack.size}
          isLoader={isDisabled} />
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
