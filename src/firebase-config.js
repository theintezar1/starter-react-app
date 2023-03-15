// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA3k0HtWsWHRpmaOXnd8ZSg_FtCxFF94qs",
  authDomain: "mealplanner-90991.firebaseapp.com",
  projectId: "mealplanner-90991",
  storageBucket: "mealplanner-90991.appspot.com",
  messagingSenderId: "216573524446",
  appId: "1:216573524446:web:500df3b85019695c71c54f",
  measurementId: "G-4JRY7ZWDTX"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app)
