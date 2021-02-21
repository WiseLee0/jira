import { useAuth } from "auth/auth-context"
import { useEffect } from "react"
import useRequest from "utils/http"

export const HomePage = () => {
    const { logout } = useAuth()
    const Request = useRequest()
    useEffect(() => {
        async function init() {
            const res = await Request('users')
            console.log(res);
        }
        init()
    }, [])
    return <div>
        <button onClick={logout}>登出</button>
    </div>
}