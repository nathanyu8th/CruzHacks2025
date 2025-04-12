// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxRyj7cEzCbzxQ6j0POzuOBvuKYiWruvY",
  authDomain: "cruzhacks-11fc8.firebaseapp.com",
  projectId: "cruzhacks-11fc8",
  storageBucket: "cruzhacks-11fc8.firebasestorage.app",
  messagingSenderId: "77869062438",
  appId: "1:77869062438:web:c7ad6c462c6ea76adc49e7",
  measurementId: "G-56C78CWSSC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export {app, auth};