// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyD6Ah1mIwQWrLZcn8NMisXLnSpwTgVo2Ro",
  authDomain: "react-auth-df56f.firebaseapp.com",
  projectId: "react-auth-df56f",
  storageBucket: "react-auth-df56f.appspot.com",
  messagingSenderId: "986560630868",
  appId: "1:986560630868:web:fb36afc8fdaff799915dc1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);
 export const db = getFirestore(app)
 export default app;