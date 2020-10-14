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
  root: {
    '&:hover': {
      backgroundColor: 'transparent'
    },
  },
  homeGridContainer: {
    // border: 'solid',
    alignItems: "flex-start",
    fontSize: '2rem',
    paddingTop: '.5em',
    margin: '0 auto',
    maxWidth: 750,
  },
  bookIcon: {
    width: '2em',
    height: '2em',
    borderRadius: '2em',
    padding: '.3em',
    backgroundColor: '#3DCCCC',
  },
  generateBook: {
    borderBottom: 'solid black',
    BorderStyle: 'thin',
    marginBottom: '2em',
    justifyContent: 'center'
  },
  description: {
    fontWeight: 'normal',
    marginBlockEnd: '1.5em',
  },
  published: {
    fontWeight: 'normal'
  },
  title: {
    marginBlockStart: '0em',
    marginBlockEnd: '0em',
  },
  author: {
    marginBlockStart: '.5em',
    marginBlockEnd: '1.5em'
  },
  favoriteIcon: {
    width: '1.2em',
    height: '1.2em',
    borderRadius: '2em',
    padding: '.3em',
    backgroundColor: '#8B0000'
  },
  unfavoritedIcon: {
    width: '1.2em',
    height: '1.2em',
    borderRadius: '2em',
    padding: '.3em',
    color: '#8B0000'
  }
}));

export default function Home(props) {
  const [book, setBook] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const userId = useSelector(
    ({ user }) => user?.data?.id
  )
  const isFavorited = useSelector(
    ({ books, user }) => {
      if (books?.data && book) {
        const userId = user.data.id
        const userBooks = books.data[userId];
        return Boolean(userBooks?.[book.id])
      } else {
        return false
      }
    }
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

  return (
    <Grid
      container
      className={classes.homeGridContainer}
      // spacing={4}
      justify="center"
    >
      <Grid
        container
        className={classes.generateBook}
      >
        <h1>Generate Book</h1>
        <IconButton
          className={classes.root}
          style={{ color: 'black' }}
          onClick={() => generateBook(setBook)}
        >
          <MenuBookTwoToneIcon className={classes.bookIcon} />
        </IconButton>
      </Grid>
      <Paper elevation={24}>
        {book && (
          <div className="book-info">
            <h2 className={classes.title}>
              {book.book.title}
            </h2>
            <h3 className={classes.author}>
              by {book.book.author}
            </h3>
            <h3 className={classes.description}>
              {book.book.description}
            </h3>
            <h4 className={classes.published}>
              Published:
              {book.bookDetails.published_date}
            </h4>
            <Link
              target="_blank"
              rel="noopener"
              style={{ textDecoration: 'none' }}
              href={
                book.bookDetails
                  .amazon_product_url
              }
            >
              Get this book
            </Link>
          </div>
        )}
      </Paper>
      {book && (
        isFavorited ? (
          <IconButton
            aria-label="unfavorite"
            onClick={() =>
              removeBookFromFirebase({ userId, book })
            }
          >
            <FavoritedIcon className={classes.favoriteIcon} />
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
              <NotFavoritedIcon
                className={classes.unfavoritedIcon}
              />
            </IconButton>
          )
      )}
      {/* <IconButton
        onClick={() =>
          removeBookFromFirebase({ userId, book })
        }
      >
        <FavoritedIcon />
      </IconButton> */}
    </Grid>
  );
}
