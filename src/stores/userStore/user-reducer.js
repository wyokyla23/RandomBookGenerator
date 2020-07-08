import {
  BEGIN_LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
} from "./user-constants";

const testAccount = {
  email: "firetest2@gmail.com",
  id: "cZIC15M7XUfFl3hMRLpzIfeNgla2",
};

const defaultState = {
  data: testAccount,
  loading: false,
  error: null,
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
        data: action.payload,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        data: null,
      };
    default:
      return state;
  }
}
