import { useAuth } from "auth/auth-context"
import { logout } from "auth/auth-provider"

const BSAEURL = process.env.REACT_APP_BASE_URL
interface IConfig extends RequestInit {
    token?: string
    data?: { [name: string]: unknown }
}
export const Request = async (path: string, { data, token, headers, ...customConfig }: IConfig = {}) => {
    const config = {
        method: 'GET',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': data ? 'application/json' : ''
        },
        ...customConfig
    }
    if (config.method.toUpperCase() == 'GET') {
        let arr = []
        for (const key in data) {
            arr.push(`${key}=${data[key]}`)
        }
        if (arr.length) path += `?${arr.join('&')}`
    } else {
        config.body = JSON.stringify(data || {})
    }
    return fetch(`${BSAEURL}/${path}`, config).then(async res => {
        if (res.status == 401) {
            await logout()
            window.location.reload()
            return Promise.reject({
                message: '请重新登录'
            })
        }
        const data = await res.json()
        if (res.ok) return data
        else return Promise.reject(data)
    })
}
const useRequest = () => {
    const { user } = useAuth()
    return (...[path, config]: Parameters<typeof Request>) => Request(path, { ...config, token: user?.token })
}
export default useRequest