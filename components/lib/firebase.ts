
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; //  Import Firebase Auth
import { getFirestore } from "firebase/firestore";

// Firebase configuration (replace with your Firebase project credentials)
const firebaseConfig = {
  apiKey: "AIzaSyDnBl6Ol8Jfp0X42MLBCup916baZCnVrjY",
  authDomain: "medical-research-data.firebaseapp.com",
  projectId: "medical-research-data",
  storageBucket: "medical-research-data.appspot.com", // Fixed URL
  messagingSenderId: "765438970645",
  appId: "1:765438970645:web:96d3c9bc8339a21c8c771c",
  measurementId: "G-3JF5DSQCY5",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); //  Initialize and export auth
const db = getFirestore(app);

export { app, auth, db }; //  Export `auth`
