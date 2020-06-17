import { LOGIN, LOGOUT } from "./user-constants";

export function login() {
  return {
    type: LOGIN,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
