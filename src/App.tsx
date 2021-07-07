import "./App.css";
import { useAuth } from "./context/auth-context";
import { Authenticate } from "./views/authenticate";
import { UnAuthenticate } from "./views/unauthenticate";
function App() {
  const { user } = useAuth();
  return <div>{user ? <Authenticate /> : <UnAuthenticate />}</div>;
}

export default App;
