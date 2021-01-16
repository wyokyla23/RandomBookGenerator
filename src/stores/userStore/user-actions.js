import {
  BEGIN_LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  FAVORITED_BOOK,
} from "./user-constants";
import firebase from "@firebase/app";
import { snapshotToDocument } from "../../utils/helper-functions";

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

export function FavoritedBook(bookId) {
  return {
    type: FAVORITED_BOOK,
    payload: {
      bookId
    }
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
    const userObject = result?.user;
    if (userObject?.uid) {
      const db = firebase.firestore();
      const newUser = {
        email,
        favoriteBookIds: [],
        id: userObject?.uid
      };
      await db
        .collection("users")
        .doc(userObject.uid)
        .set(newUser);
      dispatch(LoginSuccess(newUser));
    } else {
      throw new Error('User failed to create')
    }
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
    const userId = result?.user?.uid;
    if (userId) {
      const userSnapshot = await firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .get();
      const userData = snapshotToDocument(
        userSnapshot
      );
      console.log("login successful");
      dispatch(LoginSuccess(userData));
    }
  } catch (error) {
    console.log(error);
    dispatch(LoginFailed(error));
  }
};

//Log out User
export const logout = () => async (dispatch) => {
  console.log("logged out");
  dispatch(Logout());
};

//Delete User
export const deleteUser = () => (dispatch) => {
  try {
    const currentUser = firebase.auth()
      .currentUser;
    if (currentUser) {
      currentUser.delete();
      dispatch(Logout());
    }
  } catch (error) {
    console.log(error);
  }
};
