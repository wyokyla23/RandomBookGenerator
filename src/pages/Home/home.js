import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuBookTwoToneIcon from "@material-ui/icons/MenuBookTwoTone";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import firebase from "@firebase/app";
import {
  useSelector,
  useDispatch,
} from "react-redux";
import FavoritedIcon from "@material-ui/icons/FavoriteOutlined";
import NotFavoritedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import { UnfavoriteBook } from "../../stores/booksStore/books-actions";
import { generateBook } from "./helpers";
import { storeBookInFirebase } from "../../stores/booksStore/books-actions";

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

  console.log({ book });

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="column"
    >
      <h1>Generate Book</h1>
      <IconButton
         onClick={() => generateBook(setBook)}
      >
        <MenuBookTwoToneIcon />
      </IconButton>
      {book && (
        <Paper elevation={24}>
          <div className="book-info">
            <h2 className="title">
              {book.book.title}
            </h2>
            <h2 className="author">
              by {book.book.author}
            </h2>
            <h2 className="description">
              {book.book.description}
            </h2>
            <h2 className="published">
              published:
              {book.bookDetails.published_date}
            </h2>
            <Link
              target="_blank"
              rel="noopener"
              href={
                book.bookDetails
                  .amazon_product_url
              }
            >
              Get this book
            </Link>
          </div>
        </Paper>
      )}

      {isFavorited ? (
        <IconButton
          aria-label="unfavorite"
          onClick={() =>
            removeBookFromFirebase({ userId })
          }
        >
          <FavoritedIcon />
        </IconButton>
      ) : (
        <IconButton
          aria-label="favorite"
          onClick={() =>
            dispatch(
              storeBookInFirebase({
                userId,
                book,
                setBook,
              })
            )
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
