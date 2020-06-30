import {
  BEGIN_LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
} from "./user-constants";
import { sleep } from "../../utils/helper-functions";
import firebase from "@firebase/app";

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

export function LoginFailed(error) {
  return {
    type: LOGIN_FAILED,
    payload: error,
  };
}

export function Logout() {
  return {
    type: LOGOUT,
  };
}

//Sign-up User
export const register = ({
  email,
  password,
}) => async (dispatch) => {
  dispatch(BeginLogin());

  try {
    const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(
        email,
        password
      );
    const userObject = result.user;
    const db = firebase.firestore();
    db.collection("users")
      .doc(userObject.uid)
      .set({
        email,
      });
    dispatch(LoginSuccess({ email, password }));
  } catch (error) {
    console.error(error);
    console.log(email, password);
    dispatch(LoginFailed(error));
  }
};

//Log-in User
export const login = ({
  email,
  password,
}) => async (dispatch) => {
  dispatch(BeginLogin());

  try {
    const result = await firebase
      .auth()
      .signInWithEmailAndPassword(
        email,
        password
      );
    const userData = result.user;
    if (userData) {
      console.log("success");
      dispatch(LoginSuccess({ email, password }));
    }
  } catch (error) {
    console.log(error);
    dispatch(LoginFailed(error));
  }
};

//Get User Profile

//Log out User
export const logout = () => (dispatch) => {
  console.log("logged out");
  dispatch(Logout());
};
