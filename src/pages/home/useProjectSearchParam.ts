import { useMemo } from "react"
import { useQueryParam } from "utils/customHooks"

export const useProjectSearchParam = () => {
    const [param, setParam] = useQueryParam(['name', 'personId'])
    const projectParam = useMemo(() => { return { ...param, personId: Number(param.personId) ? Number(param.personId) : undefined } }, [param])
    return [
        projectParam,
        setParam
    ] as const
}