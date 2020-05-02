import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/analytics";

const config = {
  apiKey: "AIzaSyDrnuLlcoyU4-NFzaZ5H2SD8CbRITWuhZo",
  authDomain: "dog-online-dev.firebaseapp.com",
  databaseURL: "https://dog-online-dev.firebaseio.com",
  projectId: "dog-online-dev",
  storageBucket: "dog-online-dev.appspot.com",
  messagingSenderId: "528724801441",
  appId: "1:528724801441:web:1e603931a5929bc30b3de0",
  measurementId: "G-PB000BT8V2"
};


firebase.initializeApp(config);
firebase.analytics();

export default firebase;
