import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCj8mGfTCVa3jkEqAhdtlM5vJtLgd4_k5c",
    authDomain: "course-app-s.firebaseapp.com",
    projectId: "course-app-s",
    databaseURL: "https://course-app-s-default-rtdb.firebaseio.com/",
    storageBucket: "course-app-s.appspot.com",
    messagingSenderId: "612533648734",
    appId: "1:612533648734:web:5a8d841ad83ade9e6aa3cf",
    measurementId: "G-LDFGDVNXGB"
};

firebase.initializeApp(firebaseConfig);
export default firebase