import axios from "axios";

// export const generateBook = async (setBook) => {
//   const url =
//     "https://api.nytimes.com/svc/books/v3/lists.json?list=hardcover-fiction&api-key=m2NFnb6v60wkcQ5QFPjCcHvBviRCpH7l";
//   const options = {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//     },
//   };
//   const response = await fetch(url, options);
//   if (response.ok) {
//     const jsonText = await response.text();
//     const text = JSON.parse(jsonText);
//     const bookArray = text.results;
//     const randomBookFinder =
//       bookArray[
//         Math.floor(
//           Math.random() * bookArray.length
//         )
//       ];
//     const [
//       bookSuggested,
//     ] = randomBookFinder.book_details;
//     const bookObject = {
//       bookDetails: randomBookFinder,
//       book: bookSuggested,
//     };
//     setBook(bookObject);
//   } else {
//     console.log("IT DIDNT WORK");
//     setBook(null);
//   }
// };

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
