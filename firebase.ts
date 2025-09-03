import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxYejL1hWp_9J3PQZN_l4d5EtdGf33qO8",
  authDomain: "ping-me-2025.firebaseapp.com",
  projectId: "ping-me-2025",
  storageBucket: "ping-me-2025.firebasestorage.app",
  messagingSenderId: "761206529412",
  appId: "1:761206529412:web:7ad1e6ccde0191a496d1d1",
  measurementId: "G-NHVT3W53VC"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)