import styles from './queue-page.module.css'
import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { useInput } from '../../utils/hooks';
import { ElementStates } from '../../types/element-states';
import { StateArray } from '../../types/uTypes';
import { Circle } from '../ui/circle/circle';
import { Queue } from './Queue';
import { delay } from '../../utils/utils';

const queue = new Queue<StateArray<string>>(7)

export const QueuePage: React.FC = () => {

  const { inputs, setValues, handleChange } = useInput({
    value: ''
  })

  const [result, setResult] = useState<StateArray<string>[]>([])
  const [isDisabled, setIsDisabled] = useState<boolean>(false)

  useEffect(() => {
    setResult([...queue.queue as StateArray<string>[]])
  }, [])

  const enqueue = async () => {
    setIsDisabled(true)
    setValues({ value: '' })

    queue.enqueue({
      element: inputs.value,
      state: ElementStates.Changing
    })
    setResult([...queue.queue as StateArray<string>[]])
    await delay()
    const lastEl = queue.queue[queue.end - 1]
    if (lastEl) {
      lastEl.state = ElementStates.Default
    }
    setResult([...queue.queue as StateArray<string>[]])
    setIsDisabled(false)
  }

  const dequeue = async () => {
    setIsDisabled(true)
    const firstEl = queue.queue[queue.start]
    if (firstEl) {
      firstEl.state = ElementStates.Changing
    }
    setResult([...queue.queue as StateArray<string>[]])
    await delay()
    queue.dequeue()
    setResult([...queue.queue as StateArray<string>[]])
    setIsDisabled(false)
  };

  const clear = async () => {
    queue.clear()
    setIsDisabled(true)
    await delay()
    setResult([...queue.queue as StateArray<string>[]])
    setIsDisabled(false)
  }

  return (
    <SolutionLayout title="Очередь">
      <div className={`${styles.container} input-container`}>
        <Input
          isLimitText={true}
          maxLength={4}
          onChange={handleChange}
          name='value'
          value={inputs.value} />
        <Button
          type="submit"
          text='Добавить'
          onClick={enqueue}
          isLoader={isDisabled}
          disabled={queue.end === queue.arrSize} />
        <Button
          type="button"
          text='Удалить'
          onClick={dequeue}
          isLoader={isDisabled}
          disabled={queue.start >= queue.end} />
        <Button
          extraClass='ml-40'
          type="reset"
          text='Очистить'
          isLoader={isDisabled}
          disabled={!(queue.end > 0 || queue.start > 0)}
          onClick={clear} />
      </div>
      <ul className={styles.ul}>
        {result.map((element, index) =>
          <li key={index}>
            <Circle letter={element?.element} index={index}
              head={index === queue.start && element ? 'head' : ''}
              tail={index === queue.end - 1 ? 'tail' : ''}
              state={element?.state}
            />
          </li>
        )

        }
      </ul>
    </SolutionLayout>
  );
};
