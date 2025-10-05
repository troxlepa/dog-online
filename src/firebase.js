import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";
import "firebase/compat/analytics";

const config = {
  apiKey: "AIzaSyA0uguXB-erhbqFtECZLH1TOBoxi3OHEqQ",
  authDomain: "dogonline-62b90.firebaseapp.com",
  databaseURL: "https://dogonline-62b90.firebaseio.com",
  projectId: "dogonline-62b90",
  storageBucket: "dogonline-62b90.appspot.com",
  messagingSenderId: "13254457357",
  appId: "1:13254457357:web:173594e074d9f8d4dbfd44",
  measurementId: "G-KWJJ59TXSV"
  };


firebase.initializeApp(config);
//firebase.analytics();

export default firebase;
