import styles from './string.module.css'
import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from '../ui/circle/circle';

import { useInput } from '../../utils/hooks';
import { ElementStates } from "../../types/element-states";
import { StateArray } from '../../types/uTypes';
import { swap } from '../../utils/utils';
import { delay } from '../../utils/utils';

export const StringComponent: React.FC = () => {
  const { inputs, handleChange } = useInput({
    value: ''
  })

  const [result, setResult] = useState<StateArray<string>[]>();
  const [isDisabled, setIsDisabled] = useState<boolean>(false)

  const reverseString = async () => {
    setIsDisabled(true)
    const inputString = await inputs.value;
    let splitted: StateArray<string>[] = Array.from(inputString, (letter: string) => ({
      element: letter,
      state: ElementStates.Default
    }));
    setResult(splitted)
    let left = 0;
    let right = splitted.length - 1;

    while (left < right) {
      splitted[left].state = ElementStates.Changing;
      splitted[right].state = ElementStates.Changing;
      setResult([...splitted]);
      await delay();
      swap(splitted, left, right);
      left++;
      right--;
      splitted[left - 1].state = ElementStates.Modified;
      splitted[right + 1].state = ElementStates.Modified;
      setResult([...splitted]);
    }

    if (splitted.length % 2) {
      splitted[Math.floor(splitted.length / 2)].state = ElementStates.Changing;
      setResult([...splitted])
      await delay()
      splitted[Math.floor(splitted.length / 2)].state = ElementStates.Modified;
      setResult([...splitted])
    }
    setIsDisabled(false)
  }

  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    setResult([])
    reverseString()
  }

  return (
    <SolutionLayout title="Строка">
      <div className='input-container'>
        <Input
          onChange={handleChange}
          name='value'
          isLimitText={true}
          maxLength={11} />
        <Button
          type="button"
          text='Развернуть'
          onClick={onSubmit}
          isLoader={isDisabled}
          disabled={!inputs.value.length} />
      </div>
      <ul className={styles.ul}> {
        result?.map((element, index) =>
          <li key={index} className={styles.li}>
            <Circle 
              letter={`${element.element}`} 
              state={element.state}
              />
          </li>
        )
      }
      </ul>
    </SolutionLayout>
  );
};
