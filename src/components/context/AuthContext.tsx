import React, { createContext, useContext, useReducer } from "react";
import { AuthReducer, initialState } from "./reducer";

interface AuthStateContextProps {
  errorMessage: any;
  isLoggedIn: boolean;
  loading: boolean;
  token: string;
  username: string;
}

export const AuthStateContext = createContext<AuthStateContextProps | any>({});
export const AuthDispatchContext = createContext<any | null>(null);

export const useAuthState = () => {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
};

export const useAuthDispatch = () => {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within a AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }: any) => {
  const [user, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthStateContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
