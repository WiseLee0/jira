import { useAuth } from "auth/auth-context"

export const HomePage = () => {
    const { logout } = useAuth()
    return <div>
        <button onClick={logout}>登出</button>
    </div>
}