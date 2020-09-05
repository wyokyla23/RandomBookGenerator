import axios from "axios";

export const generateBook = (setBook) => {
  axios
    .get(
      "https://api.nytimes.com/svc/books/v3/lists.json?list=hardcover-fiction&api-key=m2NFnb6v60wkcQ5QFPjCcHvBviRCpH7l"
    )
    .then((response) => {
      const bookList = response.data.results;
      const randomBookFinder =
        bookList[
          Math.floor(
            Math.random() * bookList.length
          )
        ];
      const [
        bookSuggested,
      ] = randomBookFinder.book_details;
      const bookObject = {
        bookDetails: randomBookFinder,
        book: bookSuggested,
      };
      setBook(bookObject);
    });
};
