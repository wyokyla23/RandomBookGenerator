import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuBookTwoToneIcon from "@material-ui/icons/MenuBookTwoTone";
import Grid from "@material-ui/core/Grid";
import firebase from "@firebase/app";
import {
  useSelector,
  useDispatch,
} from "react-redux";
import FavoritedIcon from "@material-ui/icons/FavoriteOutlined";
import NotFavoritedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import {
  BookFavorited,
  FavoritingBook,
  BookFavoritingFailed,
  UnfavoriteBook,
} from "../../stores/booksStore/books-actions";
import { storeBookInFirebase } from "../../stores/booksStore/books-actions";
import { removeBookFromFirebase } from "../../stores/booksStore/books-actions";

const useStyles = makeStyles((theme) => ({
  root: {},
  homeGridContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "6em",
    minHeight: "700px",
    [theme.breakpoints.down("md")]: {
      minHeight: "600px",
    },
    [theme.breakpoints.down("sm")]: {
      minHeight: "500px",
    },
  },

  paperContainer: {
    maxWidth: "600px",
    [theme.breakpoints.down("md")]: {
      maxWidth: "500px",
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "400px",
    },
  },
}));

export default function Home(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(
    ({ user }) => user.data
  );
  const userId = user?.id;
  const [book, setBook] = useState(null);
  const isFavorited = user.favoriteBookIds.some(
    (bookId) => bookId === book?.id
  );

  const generateBook = () => {
    setBook({
      title: "Where the Red Fern Grows",
      year: 2019,
      description:
        "ads afj jskdhkjhsdf jkhsdkjf hsdhf sdkjhf ksjdhfsjkd ",
      author: "whatever",
      price: "$34.55",
    });
  };

  const storeBookInFirebase = async ({
    book,
    userId,
  }) => {
    try {
      dispatch(FavoritingBook());
      const db = firebase.firestore();
      const bookRef = db
        .collection("books")
        .doc();
      await bookRef.set(book);
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

  const removeBookFromFirebase = async ({
    userId,
    book,
  }) => {
    try {
      const { id: bookId } = book;
      console.log({ bookId });
      const db = await firebase.firestore();
      const bookRef = db
        .collection("books")
        .doc(bookId);
      await bookRef.delete();
      db.collection("users")
        .doc(userId)
        .update({
          favoriteBookIds: firebase.firestore.FieldValue.arrayRemove(
            bookId
          ),
        });
      dispatch(UnfavoriteBook(userId, book));
    } catch (error) {
      console.log(error);
    }
  };

  // const generateBook = () => {
  //   fetch('https://www.googleapis.com/books/v1/volumes/pIs9Em38dAoC')
  //   .then(res => res.json())
  //   .then((result) => {
  //     console.log(result)
  //   })

  console.log({ book });

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="column"
    >
      <h1>Generate Book</h1>
      {book && (
        <>
          <h2 className="title">
            title: {book.title}
          </h2>
          <h2 className="year">
            year: {book.year}
          </h2>
          <h2 className="description">
            description: {book.description}
          </h2>
          <h2 className="author">
            author: {book.author}
          </h2>
          <h2 className="price">
            Price: {book.price}
          </h2>
        </>
      )}
      <IconButton onClick={() => generateBook()}>
        <MenuBookTwoToneIcon />
      </IconButton>
      {isFavorited ? (
        <IconButton
          onClick={() =>
            removeBookFromFirebase({ userId })
          }
        >
          <FavoritedIcon />
        </IconButton>
      ) : (
        <IconButton
          onClick={() =>
            storeBookInFirebase({
              userId,
              book,
            })
          }
        >
          <NotFavoritedIcon />
        </IconButton>
      )}
      <IconButton
        onClick={() =>
          removeBookFromFirebase({ userId, book })
        }
      >
        <FavoritedIcon />
      </IconButton>
    </Grid>
  );
}
