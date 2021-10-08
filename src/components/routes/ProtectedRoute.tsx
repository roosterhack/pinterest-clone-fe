import { Route, Redirect } from "react-router-dom";

interface ProtectedRouteProps {
  isLoggedIn: boolean;
  component: any;
  path: string;
}

const ProtectedRoute = ({
  isLoggedIn,
  component: Component,
  ...rest
}: ProtectedRouteProps) => {
  return (
    <Route
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
