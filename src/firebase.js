import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/auth";

const firebaseConfig = {
  apiKey:
    "AIzaSyAxuME1af3lkDLjPWid8xosPll80x3WUXg",
  authDomain: "sandbox-j123kj.firebaseapp.com",
  databaseURL:
    "https://sandbox-j123kj.firebaseio.com",
  projectId: "sandbox-j123kj",
  storageBucket: "sandbox-j123kj.appspot.com",
  messagingSenderId: "913766241321",
  appId:
    "1:913766241321:web:b6e7b367d111759800f838",
  measurementId: "G-KF0K6Y35J9",
};

firebase.initializeApp(firebaseConfig);
