// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

var app;
var storage;

try {
  app = getApp();
} catch (error) {
  const firebaseConfig = {
    apiKey: "AIzaSyDGF6lit4nMKdBxfEQlItgdtiZJHwPuzgo",
    authDomain: "web-chat-pingo.firebaseapp.com",
    projectId: "web-chat-pingo",
    storageBucket: "web-chat-pingo.appspot.com",
    messagingSenderId: "101414910911",
    appId: "1:101414910911:web:00805ec9c4484905d8bf0a",
    measurementId: "G-KYVQTYP6RS"
  };
  app = initializeApp(firebaseConfig);
}
storage = getStorage(app);

// Initialize Firebase

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, storage };
