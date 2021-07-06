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
  }, [params]);
  return [val, setVal];
};
