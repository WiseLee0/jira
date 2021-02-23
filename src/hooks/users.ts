import { User } from "pages/home/search-panel";
import { cleanObj } from "utils";
import { useAsync, useMount } from "utils/customHooks";
import useRequest from "utils/http";

export const useUsers = (param?: Partial<User>) => {
    const Request = useRequest()
    const { run, ...result } = useAsync<User[]>()
    useMount(() => {
        run(Request('users', { data: cleanObj(param || {}) }))
    })
    return result
}