import "./App.css";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import MyPins from "./pages/MyPins";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LoginRedirect } from "./pages/Auth/LoginRedirect";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import { AuthProvider, useAuthState } from "./components/context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Nav />
          <Switch>
            <Route
              exact
              path="/connect/:providerName/redirect"
              component={LoginRedirect}
            />
            <Route path="/" exact component={Home} />

            <ProtectedRoute path="/mypins" component={MyPins} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
