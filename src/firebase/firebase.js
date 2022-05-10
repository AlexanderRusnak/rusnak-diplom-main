import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

const config = {
  apiKey: "AIzaSyA7OQ_MhJWp2PjJoa2oSFmXvNGZw2N6DpQ",
  authDomain: "rusnak-diplom.firebaseapp.com",
  databaseURL:
    "https://rusnak-diplom-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "rusnak-diplom",
  storageBucket: "rusnak-diplom.appspot.com",
  messagingSenderId: "663021287538",
};

firebase.initializeApp(config);
export default firebase;
