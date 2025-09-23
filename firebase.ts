// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxYejL1hWp_9J3PQZN_l4d5EtdGf33qO8",
  authDomain: "ping-me-2025.firebaseapp.com",
  projectId: "ping-me-2025",
  storageBucket: "ping-me-2025.firebasestorage.app",
  messagingSenderId: "761206529412",
  appId: "1:761206529412:web:7ad1e6ccde0191a496d1d1",
  measurementId: "G-NHVT3W53VC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)