import {
  BEGIN_BOOK_RETRIEVAL,
  BOOK_RETRIEVED,
  BOOK_NOT_RETRIEVED,
  REMOVE_BOOK,
} from "./books-constants";

// data: {
//   [userId]: {
//     [bookId]: {
//       ...bookData,
//     },
//     [book2Id]: {
//       ...book2Data,
//     }
//   }
// },



import omit from "lodash/omit";
const defaultState = {
  loading: false,
  data: null,
  error: null,
};

export default function booksReducer(
  state = defaultState,
  action
) {
  switch (action.type) {
    case BEGIN_BOOK_RETRIEVAL:
      return {
        ...state,
        loading: true,
      };
    case BOOK_RETRIEVED:
      console.log({ action });
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          [action.payload.userId]: {
            ...state.data[action.payload.userId],
            [action.payload.book.id]: {
              ...state.data[
                action.payload.userId
              ][action.payload.book.id],
              ...action.payload.book,
            },
          },
        },
      };
    case BOOK_NOT_RETRIEVED:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    case REMOVE_BOOK:
      return {
        ...state.data,
        [action.payload.userId]: omit(
          state.data[action.payload.userId],
          [action.payload.bookId]
        ),
      };
    default:
      return state;
  }
}
