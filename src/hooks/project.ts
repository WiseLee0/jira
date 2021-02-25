
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

export const useEditProject = () => {
    const Request = useRequest();
    const { run, ...result } = useAsync()
    const editProject = (params: Partial<Project>) =>
        run(Request(`projects/${params.id}`, {
            method: "PATCH",
            data: params,
        }))
    return {
        editProject,
        ...result
    }
};

export const useAddProject = () => {
    const Request = useRequest();
    const { run, ...result } = useAsync()
    const addProject = (params: Partial<Project>) =>
        run(Request(`projects/${params.id}`, {
            method: "POST",
            data: params,
        }))
    return {
        addProject,
        ...result
    }
};
