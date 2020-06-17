import { createStore } from "redux";
import { LOGIN, LOGOUT } from "./user-constants";

const defaultState = {
  isLoggedIn: false,
  data: null,
};

const fakeUserData = {
  name: "bob",
  password: "12345",
};

export default function userReducer(
  state = defaultState,
  action
) {
  switch (action.type) {
    case BEGIN_LOGIN:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: fakeUserData,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        data: null,
      };
    case LOGOUT:
      return { ...state, data: null };
    default:
      return state;
  }
}
