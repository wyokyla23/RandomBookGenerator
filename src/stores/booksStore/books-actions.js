import {
  BEGIN_BOOK_RETRIEVAL,
  BOOK_RETRIEVED,
  BOOK_NOT_RETRIEVED,
  REMOVE_BOOK,
} from "./books-constants";
import firebase from "@firebase/app";

export function BeginBookRetrieval() {
  return {
    type: BEGIN_BOOK_RETRIEVAL,
  };
}

export function BookRetrieved({ userId, book }) {
  return {
    type: BOOK_RETRIEVED,
    payload: {
      userId,
      book,
    },
  };
}

export function BookNotRetrieved(error) {
  return {
    type: BOOK_NOT_RETRIEVED,
    payload: error,
  };
}

export function RemoveBook({ bookId, userId }) {
  return {
    type: REMOVE_BOOK,
    payload: {
      bookId,
      userId,
    },
  };
}
// state.user.data.id;

export const addBook = ({ userId, book }) => async (dispatch) => {
  dispatch(BeginBookRetrieval());
  try {
    // instead of doing this, lets get the user data and ID 
    // from redux
    const user = await firebase.auth().currentUser;
    if (user) {
      // need bookId
      // we also need the user data from redux
      // because if we have the user data we can correctly
      // predict the shape of the new array of favorite books
      // e.g.
      // const favoriteBookIds = user.favoriteBookIds.concat(bookId)
      // use the user.id from redux
      const uid = user.uid;
      const db = firebase.firestore();
      await db.collection("users")
        .doc(uid)
        .update({
          // favoriteBookIds,
        });
    }
  } catch (error) {
    console.log(error);
  }
};
