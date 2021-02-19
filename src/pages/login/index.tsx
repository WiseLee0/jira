import React, { useState } from "react"
import { LoginView } from "./login"
import { RegisterView } from "./register"

export const LoginPage = () => {
    const [isLoginView, setIsLoginView] = useState(true)
    return <div>
        {isLoginView ? < LoginView /> : <RegisterView />}
        <button onClick={() => setIsLoginView(!isLoginView)}>切换按钮</button>
    </div>
}