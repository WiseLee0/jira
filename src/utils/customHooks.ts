import { useMemo, useRef } from "react"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import type { URLSearchParamsInit } from "react-router-dom"
import { cleanObj } from "utils"

export const useMount = (fn: () => void) => {
    useEffect(() => {
        fn()
    }, [])
}

export const useDebounce = <T>(value: T, delay: number): T => {
    const [debouceValue, setDebounceValue] = useState(value)
    useEffect(() => {
        const handle = setTimeout(() => {
            setDebounceValue(value)
        }, delay);
        return () => clearTimeout(handle)
    }, [value])
    return debouceValue
}

interface State<T> {
    error: Error | null
    data: T | null
    state: 'padding' | 'loading' | 'error' | 'success'
}
const defaultInitState: State<null> = {
    error: null,
    data: null,
    state: 'padding'
}
export const useAsync = <T>(initState?: State<T>) => {
    const [state, setState] = useState<State<T>>({ ...defaultInitState, ...initState })
    const setData = (data: T) => setState({
        data,
        state: "success",
        error: null
    })
    const setError = (error: Error) => setState({
        data: null,
        state: "error",
        error
    })
    const run = (promise: Promise<T>) => {
        if (!promise || !promise.then) {
            throw new Error('请传入 Promise 类型数据')
        }
        setState({
            ...state,
            state: 'loading'
        })
        return promise
            .then(data => {
                setData(data)
                return data
            }).catch(error => {
                setError(error)
                return error
            })
    }
    return {
        isPadding: state.state === 'padding',
        isLoading: state.state === 'loading',
        isSuccess: state.state === 'success',
        isError: state.state === 'error',
        run,
        setData,
        setError,
        ...state
    }
}

export const useDocumentTitle = (title: string, leaveKeep: boolean = true) => {
    const oldTitle = useRef(document.title).current
    useEffect(() => {
        document.title = title
    }, [title])
    useEffect(() => {
        return () => {
            if (!leaveKeep) {
                document.title = oldTitle
            }
        }
    }, [leaveKeep, oldTitle])
}

export const useQueryParam = <T extends string>(keys: T[]) => {
    const [searchParam, setSearchParam] = useSearchParams()
    return [useMemo(() => {
        return keys.reduce((acc, key) => {
            return {
                ...acc,
                [key]: searchParam.get(key) || ""
            }
        }, {} as { [k in T]: string })
    }, [searchParam]), (param: Partial<{ [p in T]: unknown }>) => {
        const obj = cleanObj({
            ...Object.fromEntries(searchParam),
            ...param
        }) as URLSearchParamsInit
        return setSearchParam(obj)
    }] as const
}