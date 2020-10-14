import React from "react";
import {
  FAVORITING_BOOK,
  BOOK_FAVORITED,
  BOOK_FAVORITING_FAILED,
  UNFAVORITE_BOOK,
} from "./books-constants";
import { set, omit, merge } from 'lodash'

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

const defaultState = {
  loading: false,
  data: {},
  error: null,
};

export default function booksReducer(
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
    case BOOK_FAVORITED: {
      console.log({ action });
      const { book, userId } = action.payload;
      const updatedState = set(state, `data.${userId}.${book.id}`, book)

      return {
        ...updatedState,
        loading: false,
      }
    }
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
};
