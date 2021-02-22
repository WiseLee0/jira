import { LoginPage } from './pages/login/index'
import { HomePage } from 'pages/home/index';
import { useAuth } from 'auth/auth-context';

export const App = () => {
    const { user } = useAuth()
    return <div>
        {user ? <HomePage></HomePage> : <LoginPage></LoginPage>}
    </div>
}