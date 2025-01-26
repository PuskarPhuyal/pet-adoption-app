// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "pet-adopt-3783a.firebaseapp.com",
  projectId: "pet-adopt-3783a",
  storageBucket: "pet-adopt-3783a.firebasestorage.app",
  messagingSenderId: "137831742666",
  appId: "1:137831742666:web:4fd424aa5ffbac8dc34833"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const storage = getStorage(app);