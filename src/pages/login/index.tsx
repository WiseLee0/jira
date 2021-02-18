import { useAuth } from "auth/auth-context"

export const LoginPage = () => {
    const { register, user } = useAuth()
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const username = (e.currentTarget.elements[0] as HTMLInputElement).value
        const password = (e.currentTarget.elements[1] as HTMLInputElement).value
        register({
            username,
            password
        })
    }
    return <form onSubmit={handleSubmit}>
        {user && <span>登录成功，用户名{user.name}</span>}
        <div>
            <label htmlFor="username">用户名</label>
            <input type="text" id="username" />
        </div>
        <div>
            <label htmlFor="password">密码</label>
            <input type="password" id="password" />
        </div>
        <button type="submit">提交</button>
    </form>
}