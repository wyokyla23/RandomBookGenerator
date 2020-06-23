import {
  BEGIN_LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
} from "./user-constants";

const defaultState = {
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
      console.log({ action });
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
