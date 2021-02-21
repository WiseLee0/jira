import { useEffect, useState } from "react"

export const useMount = (fn: () => void) => {
    useEffect(() => {
        fn()
    }, [])
}

export const useDebounce = (value: unknown, delay: number) => {
    const [debouceValue, setDebounceValue] = useState(value)
    useEffect(() => {
        const handle = setTimeout(() => {
            setDebounceValue(value)
        }, delay);
        return () => clearTimeout(handle)
    }, [value])
    return debouceValue
}