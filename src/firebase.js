// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuZm8T2-ltDJuGZqb6g30yMz0pgLWL0uU",
  authDomain: "budget-app-af04c.firebaseapp.com",
  databaseURL: "https://budget-app-af04c-default-rtdb.firebaseio.com",
  projectId: "budget-app-af04c",
  storageBucket: "budget-app-af04c.appspot.com",
  messagingSenderId: "609066328604",
  appId: "1:609066328604:web:dc6f45b6622d838d5eb5d9"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;