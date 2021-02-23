import { useEffect, useState } from "react"

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