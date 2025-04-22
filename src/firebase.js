// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore";
// import firebaseConfig from "./config/firebaseConfig";



const firebaseConfig = {
  apiKey: "AIzaSyCbHZAHWqRLy6wgPxiqgIz8xCWsEQZgCgc",
  authDomain: "new-attendence-project.firebaseapp.com",
  projectId: "new-attendence-project",
  storageBucket: "new-attendence-project.firebasestorage.app",
  messagingSenderId: "617887432848",
  appId: "1:617887432848:web:498ac1982ef56ced335815",
  measurementId: "G-G72RHB5TL1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// export const firestore=getFirestore(app);


const firestore = getFirestore(app);

export { firestore };














// // src/authService.js
// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
// import app from "./firebaseConfig";

// const auth = getAuth(app);

// // Signup function
// export const signup = async (email, password) => {
//   return createUserWithEmailAndPassword(auth, email, password);
// };

// // Login function
// export const login = async (email, password) => {
//   return signInWithEmailAndPassword(auth, email, password);
// };

// // Logout function
// export const logout = async () => {
//   return signOut(auth);
// };