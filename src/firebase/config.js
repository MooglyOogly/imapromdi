import { initializeApp } from "@firebase/app";
import { getFirestore } from '@firebase/firestore'
import { getAuth } from "@firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5bNq_SzUz4jCAR_tZuYkY3HiwXL3pOgg",
  authDomain: "imapromd-7c9f3.firebaseapp.com",
  projectId: "imapromd-7c9f3",
  storageBucket: "imapromd-7c9f3.appspot.com",
  messagingSenderId: "466232995332",
  appId: "1:466232995332:web:a6e24a37821ad8fd730f51",
  measurementId: "G-V1QN3E0816"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize Services
const db = getFirestore()
const auth = getAuth()

export { db, auth }