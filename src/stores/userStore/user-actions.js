import {
  BEGIN_LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
} from "./user-constants";

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

export const login = (params) => async (
  dispatch
) => {
  dispatch(BeginLogin());
  const userData = await firebaseonasdasdasdihas;
  if (userData) {
    dispatch(LoginSuccess(userData));
  } else {
    dispatch(LoginFailed());
  }
};
