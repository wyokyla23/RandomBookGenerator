import {
  BEGIN_LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
} from "./user-constants";

const fakeUserData = {
  name: " ",
  password: " ",
};

const defaultState = {
  isLoggedIn: false,
  data: null,
  loading: false,
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
        isLoggedIn: true,
        loading: false,
        data: action.payload,
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
