import { useState, useCallback } from 'react';

type Value = {
  [key: string]: any
}

export const useInput = (event: Value) => {
  const [inputs, setValues] = useState(event);

  const handleChange = useCallback((event) => {
    const {value, name} = event.target;
    setValues({...inputs, [name]: value});
  }, [inputs]);
  return {inputs, setValues, handleChange};
}