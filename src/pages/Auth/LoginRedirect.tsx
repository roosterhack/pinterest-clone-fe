import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { ACTIONS } from "../../components/context/reducer";
import { useAuthDispatch } from "../../components/context/AuthContext";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

interface ParamTypes {
  providerName: string;
}

export const LoginRedirect = (props: any) => {
  const dispatch = useAuthDispatch();
  const [text, setText] = useState("Loading...");
  const location = useLocation();
  const params = useParams<ParamTypes>();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: ACTIONS.REQUEST_LOGIN });
    // Successfully logged with the provider
    // Now logging with strapi by using the access_token (given by the provider) in props.location.search
    fetch(
      `${backendUrl}/auth/${params.providerName}/callback${location.search}`
    )
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
        }
        return res;
      })
      .then((res) => res.json())
      .then((res) => {
        console.log(res, "user");
        // Successfully logged with Strapi
        // Now saving the jwt to use it for future authenticated requests to Strapi
        localStorage.setItem("jwt", res.jwt);
        localStorage.setItem("username", res.user.username);
        localStorage.setItem("id", res.user.id);
        setText(
          "You have been successfully logged in. You will be redirected in a few seconds..."
        );
        dispatch({
          type: ACTIONS.LOGIN_SUCCESS,
          payload: {
            username: res.user.username,
            auth_token: res.jwt,
            user: res.user,
          },
        });
        setTimeout(() => history.push("/"), 2000); // Redirect to homepage after 3 sec
      })
      .catch((err) => {
        console.log(err);
        setText("An error occurred, please see the developer console.");
        dispatch({ type: ACTIONS.LOGIN_ERROR, error: err });
      });
  }, [props, history, location.search, params.providerName, dispatch]);

  return <p>{text}</p>;
};
