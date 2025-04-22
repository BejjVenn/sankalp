// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore";
// import firebaseConfig from "./config/firebaseConfig"; 

import { getAuth } from "firebase/auth";


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
const firestore = getFirestore(app);
const auth = getAuth(app); // ✅ Add this line
export { firestore, auth}; // ✅ Export both Firestore and Auth

