import { useState, useCallback } from 'react';
import { Loading } from '../types/linked-list';

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

export const useLoading = (initialState: Loading) => {
  const [isLoading, setIsLoading] = useState<Loading>(initialState);
  const isDisabled = Object.values(isLoading).some((value) => value === true)
  const updateState = (state: string, arg: boolean) => {
    setIsLoading((prevLoading) => ({ ...prevLoading, [state]: arg }));
  };

  return { isLoading, isDisabled, updateState };
};