import styles from './fibonacci-page.module.css'
import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { useInput } from '../../utils/hooks';
import { Circle } from "../ui/circle/circle";

export const FibonacciPage: React.FC = () => {
  const { inputs, handleChange } = useInput({
    value: null
  })
  const [result, setResult] = useState<number[]>([]);
  const [isDisabled, setIsDisabled] = useState(false)

  function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const calcFibonacci = async (num: number) => {
    setResult([])
    if (num < 0 || num > 19) {
      alert('Введите положительное целое число от 0 до 19')
      return
    }

    let fibonacci: number[] = [];
    if (num >= 0) {
      setIsDisabled(true)
      fibonacci.push(0)
      await delay(1000)
      setResult([...fibonacci])
    }
    if (num >= 1) {
      fibonacci.push(1)
      await delay(1000)
      setResult([...fibonacci])
    }

    for (let i = 2; i < num + 1; i++) {
      await delay(1000)
      fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2];
      setResult([...fibonacci]);
    }
    setIsDisabled(false)
  };


  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault()
    if (inputs.value) {
      calcFibonacci(Number(inputs.value))
    }
  }


  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className='input-container'>
        <Input
          onChange={handleChange}
          value={inputs.fibValue}
          type="number"
          isLimitText={true}
          max={19}
          name="value" />
        <Button
          onClick={onSubmit}
          type="submit"
          text="Рассчитать" 
          isLoader={isDisabled}/>
      </div>
      <ul className={styles.ul}> {
        result.map((element, index) =>
          <li key={index} className={styles.li}><Circle letter={`${element}`} index={index} /></li>
        )
      }
      </ul>

    </SolutionLayout>
  );
};
