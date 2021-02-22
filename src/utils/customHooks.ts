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