
import type { Project } from "pages/home/list";
import { useEffect } from "react";
import { cleanObj } from "utils";
import { useAsync } from "utils/customHooks"
import useRequest from "utils/http";
export const useProject = (param?: Partial<Project>) => {
    const Request = useRequest()
    const { run, ...result } = useAsync<Project[]>()
    useEffect(() => {
        run(Request("projects", { data: cleanObj(param || {}) }))
    }, [param]);
    return result
}