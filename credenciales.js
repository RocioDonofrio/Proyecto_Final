// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth"; // Solo inicializar auth sin persistencia
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBs13Lt1RiXWk-2t5Vl542jJsTMxZpiwe4",
  authDomain: "appbomberos-8ccf9.firebaseapp.com",
  projectId: "appbomberos-8ccf9",
  storageBucket: "appbomberos-8ccf9.appspot.com",
  messagingSenderId: "117355750924",
  appId: "1:117355750924:web:7e7d2854bfb0b6625cb029",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth without persistence
const auth = initializeAuth(app); // No estamos usando persistencia

// Initialize Firestore
const db = getFirestore(app);

// Export app, auth, and db to be used in other parts of your app
export { app, auth, db };
