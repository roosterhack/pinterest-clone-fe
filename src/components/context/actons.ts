import { ACTIONS } from "./reducer";

export async function logout(dispatch: any) {
  dispatch({ type: ACTIONS.LOGOUT });
  localStorage.removeItem("username");
  localStorage.removeItem("jwt");
}
