import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBs13Lt1RiXWk-2t5Vl542jJsTMxZpiwe4",
  authDomain: "appbomberos-8ccf9.firebaseapp.com",
  projectId: "appbomberos-8ccf9",
  storageBucket: "appbomberos-8ccf9.appspot.com",
  messagingSenderId: "117355750924",
  appId: "1:117355750924:web:7e7d2854bfb0b6625cb029",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { app, auth, db };
