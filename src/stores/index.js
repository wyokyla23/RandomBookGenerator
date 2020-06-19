import {
  combineReducers,
  createStore,
} from "redux";
import user from "./userStore/user-reducer";
// import books from './booksStore/books-reducer';

const rootReducer = combineReducers({
  user,
  // books,
});

const store = createStore(rootReducer);

export default store;
