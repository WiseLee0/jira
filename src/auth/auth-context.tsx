import { FullPageError, FullPageLoading } from 'components/full-page'
import React, { useState } from 'react'
import { ReactNode } from 'react'
import { useAsync, useMount } from 'utils/customHooks'
import { Request } from 'utils/http'
import * as auth from './auth-provider'
interface AuthForm {
    username: string
    password: string
}

interface User {
    token: string
    name: string
    password: string
}

async function bootstrapUser() {
    const token = auth.getToken()
    if (token) {
        const data = await Request('me', { token })
        return data.user
    }
    return null
}


const AuthContext = React.createContext<{
    user: User | null,
    login: (form: AuthForm) => Promise<void>,
    register: (form: AuthForm) => Promise<void>,
    logout: () => Promise<void>,
} | undefined>(undefined)
AuthContext.displayName = 'AuthContext'
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { run, data: user, setData: setUser, isPadding, isLoading, isError, error } = useAsync<User | null>()
    const login = (form: AuthForm) => auth.login(form).then(setUser)
    const register = (form: AuthForm) => auth.register(form).then(setUser)
    const logout = () => auth.logout().then(() => setUser(null))
    useMount(() => {
        run(bootstrapUser())
    })
    if (isPadding || isLoading) {
        return <FullPageLoading></FullPageLoading>
    }
    if (isError) {
        return <FullPageError error={error || new Error("发生了一些错误")}></FullPageError>
    }
    return <AuthContext.Provider
        value={{ user, login, register, logout }}
        children={children} />
}

export const useAuth = () => {
    const context = React.useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth必须在AuthProvider中使用')
    }
    return context
}