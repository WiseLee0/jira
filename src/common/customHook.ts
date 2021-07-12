import { useCallback, useEffect, useMemo, useState } from "react";
import { cleanObj, urlString } from "../utils";
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
  return [val, setVal] as const;
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
const objPick = <O extends { [key in string]: unknown }, K extends keyof O>(
  obj: O,
  keys: K[]
) => {
  const filteredEntries = Object.entries(obj).filter(([key]) =>
    keys.includes(key as K)
  );
  return Object.fromEntries(filteredEntries) as Pick<O, K>;
};

export const useUrlQueryParams = <K extends string>(keys: K[]) => {
  const queryParam = useMemo(() => {
    const searchParams = new URLSearchParams(globalThis.location.search);
    return objPick(Object.fromEntries(searchParams), keys);
  }, [globalThis.location.search]);

  const setQueryParams = useCallback(
    <K extends string>(params: { [key in K]: unknown }) => {
      const obj = cleanObj({
        ...queryParam,
        ...params,
      });
      const query = urlString(obj);
      let url = "";
      if (query.length) url = globalThis.location.pathname + "?" + query;
      else url = globalThis.location.pathname;
      globalThis.history.pushState({}, "", url);
    },
    [queryParam]
  );

  return [queryParam, setQueryParams] as const;
};
