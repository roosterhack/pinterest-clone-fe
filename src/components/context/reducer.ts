let user = localStorage.getItem("jwt") ? localStorage.getItem("username") : "";
let token = localStorage.getItem("jwt") ? localStorage.getItem("jwt") : "";
let isLoggedIn = !!localStorage.getItem("jwt");

interface InitialStateProps {
  isLoggedIn: boolean;
  username: string;
  token: string;
  loading: boolean;
  errorMessage: any;
}

export const initialState = {
  isLoggedIn,
  username: "" || user,
  token: "" || token,
  loading: false,
  errorMessage: null,
};

export const ACTIONS = {
  REQUEST_LOGIN: "REQUEST_LOGIN",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGOUT: "LOGOUT",
  LOGIN_ERROR: "LOGIN_ERROR",
};

export const AuthReducer = (initialState: InitialStateProps, action: any) => {
  switch (action.type) {
    case ACTIONS.REQUEST_LOGIN:
      return {
        ...initialState,
        loading: true,
      };
    case ACTIONS.LOGIN_SUCCESS:
      return {
        ...initialState,
        username: action.payload.username,
        token: action.payload.auth_token,
        isLoggedIn: true,
        loading: false,
      };
    case ACTIONS.LOGOUT:
      return {
        ...initialState,
        isLoggedIn: false,
        username: "",
        token: "",
      };
    case ACTIONS.LOGIN_ERROR:
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
