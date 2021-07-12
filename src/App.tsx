import "./App.css";
import { useAuth } from "./context/auth-context";
import { Authenticate } from "./views/authenticate";
import { UnAuthenticate } from "./views/unauthenticate";
function App() {
  const { user } = useAuth();
  return (
    <div>
      <Authenticate />
    </div>
  );
}

export default App;
