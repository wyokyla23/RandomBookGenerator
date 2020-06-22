import {
  BEGIN_LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
} from "./user-constants";
import { sleep } from "../../utils/helper-functions";

export function BeginLogin() {
  return {
    type: BEGIN_LOGIN,
  };
}

export function LoginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
}

export function LoginFailed() {
  return {
    type: LOGIN_FAILED,
  };
}

export function Logout() {
  return {
    type: LOGOUT,
  };
}

export const login = (values) => async (
  dispatch
) => {
  dispatch(BeginLogin(values));
  await sleep(3000);
  const userData = await { values };
  if (userData) {
    dispatch(LoginSuccess(userData));
  } else {
    dispatch(LoginFailed());
  }
};

export const logout = () => (dispatch) => {
  dispatch(Logout());
};
