import {
  FAVORITING_BOOK,
  BOOK_FAVORITED,
  BOOK_FAVORITING_FAILED,
  UNFAVORITE_BOOK,
} from "./books-constants";
import firebase from "@firebase/app";

export function FavoritingBook() {
  return {
    type: FAVORITING_BOOK,
  };
}

export function BookFavorited({ userId, book }) {
  return {
    type: BOOK_FAVORITED,
    payload: {
      userId,
      book,
    },
  };
}

export function BookFavoritingFailed(error) {
  return {
    type: BOOK_FAVORITING_FAILED,
    payload: error,
  };
}

export function UnfavoriteBook({ book, userId }) {
  return {
    type: UNFAVORITE_BOOK,
    payload: {
      book,
      userId,
    },
  };
}
// state.user.data.id;
