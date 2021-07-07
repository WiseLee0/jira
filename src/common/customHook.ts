import { useEffect, useState } from "react";

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = <T>(params: T, delay: number = 800) => {
  const [val, setVal] = useState<T>();
  useEffect(() => {
    const handle = setTimeout(() => {
      setVal(params);
    }, delay);
    return () => clearTimeout(handle);
  }, [params, delay]);
  return [val, setVal];
};

export const useArray = <T>(persons: T[] = []) => {
  const [val, setVal] = useState(persons);
  function add(param: T) {
    setVal([...val, param]);
  }
  function clear() {
    setVal([]);
  }
  function removeIndex(index: number) {
    const copy = [...val];
    copy.splice(index, 1);
    setVal(copy);
  }
  return {
    add,
    clear,
    removeIndex,
    value: val,
  };
};
