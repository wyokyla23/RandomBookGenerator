import React from "react";
import {
  FAVORITING_BOOK,
  BOOK_FAVORITED,
  BOOK_FAVORITING_FAILED,
  UNFAVORITE_BOOK,
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
  data: {},
  error: null,
};

export default React.memo(function booksReducer(
  state = defaultState,
  action
) {
  console.log({ bookState: state });
  switch (action.type) {
    case FAVORITING_BOOK:
      console.log({ action });
      return {
        ...state,
        loading: true,
      };
    case BOOK_FAVORITED:
      console.log({ action });
      const userBooks =
        state.data[action.payload.userId] || {};
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          [action.payload.userId]: {
            ...userBooks,
            [action.payload.book.id]: {
              ...userBooks[
                action.payload.book.id
              ],
              ...action.payload.book,
            },
          },
        },
      };
    case BOOK_FAVORITING_FAILED:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    case UNFAVORITE_BOOK:
      console.log({ action });
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
});
