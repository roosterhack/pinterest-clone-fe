import React from "react";
import { Link } from "react-router-dom";
import { useAuthDispatch, useAuthState } from "./context/AuthContext";
import { logout } from "./context/actons";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const providerName = "auth0";

const Nav = () => {
  const { isLoggedIn } = useAuthState();
  const dispatch = useAuthDispatch();

  return (
    <nav>
      <ul>
        {!isLoggedIn && (
          <>
            <li>
              <a href={`${backendUrl}/connect/${providerName}`}>Login</a>
            </li>
          </>
        )}
        {isLoggedIn && (
          <>
            <li>My pins</li>
            <li>
              <button onClick={() => logout(dispatch)}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
