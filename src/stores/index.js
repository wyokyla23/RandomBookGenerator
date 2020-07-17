import {
  combineReducers,
  createStore,
  applyMiddleware,
} from "redux";
import user from "./userStore/user-reducer";
import thunk from "redux-thunk";
import books from "./booksStore/books-reducer";

const rootReducer = combineReducers({
  user,
  books,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
