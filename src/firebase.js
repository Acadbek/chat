// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRVpe2UHS3AW8TY76QFPsLl266yEQb2Yw", // O'zingiznikini joylashtiring
  authDomain: "test-528e9.firebaseapp.com",
  projectId: "test-528e9",
  storageBucket: "test-528e9.firebasestorage.app",
  messagingSenderId: "646303932398",
  appId: "1:646303932398:web:6ada743ba4fae19b96b8ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase xizmatlarini eksport qilish
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();