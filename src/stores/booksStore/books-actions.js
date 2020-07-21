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
export const storeBookInFirebase = ({
  book,
  userId,
  setBook,
}) => async (dispatch) => {
  try {
    dispatch(FavoritingBook());
    const db = firebase.firestore();
    const newBook = {
      title: book.book.title,
      author: book.book.author,
      description: book.book.description,
      published: book.bookDetails.published_date,
      price: book.book.price,
    };
    const bookRef = db.collection("books").doc();
    await bookRef.set(newBook);
    const bookId = bookRef.id;
    const bookWithId = {
      ...book,
      id: bookId,
    };
    setBook(bookWithId);
    db.collection("users")
      .doc(userId)
      .update({
        favoriteBookIds: firebase.firestore.FieldValue.arrayUnion(
          bookId
        ),
      });
    dispatch(
      BookFavorited({
        userId,
        book: bookWithId,
      })
    );
    console.log({ bookId });
  } catch (error) {
    console.log(error);
    dispatch(BookFavoritingFailed(error));
  }
};
