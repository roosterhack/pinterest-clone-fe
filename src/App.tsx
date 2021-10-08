import "./App.css";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import MyPins from "./pages/MyPins";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LoginRedirect } from "./pages/Auth/LoginRedirect";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import { AuthProvider, useAuthState } from "./components/context/AuthContext";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
`;

function App() {
  const { isLoggedIn } = useAuthState();

  return (
    <AuthProvider>
      <GlobalStyle />
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

            <ProtectedRoute
              path="/mypins"
              component={MyPins}
              isLoggedIn={isLoggedIn}
            />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
