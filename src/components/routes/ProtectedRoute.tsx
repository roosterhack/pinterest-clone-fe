import { Route, Redirect } from "react-router-dom";
import { useAuthState } from "../context/AuthContext";

interface ProtectedRouteProps {
  component: any;
  path: string;
}

const ProtectedRoute = ({
  component: Component,
  ...rest
}: ProtectedRouteProps) => {
  const { isLoggedIn } = useAuthState();
  return (
    <Route
      exact
      {...rest}
      render={(props: any) => {
        if (isLoggedIn) {
          return <Component />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
