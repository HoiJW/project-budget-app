// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCY7fKT5bGqbuEFwM9lqh-S8Q1xHt73c10",
  authDomain: "mybudget-817cb.firebaseapp.com",
  projectId: "mybudget-817cb",
  storageBucket: "mybudget-817cb.appspot.com",
  messagingSenderId: "168340446400",
  appId: "1:168340446400:web:2d594d388fb097eb336125"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;