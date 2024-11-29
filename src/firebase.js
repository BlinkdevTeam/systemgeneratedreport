// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC1id1bulVq3lLUJhkzaNBKH363gp4WqEc",
  authDomain: "philricescannerapp.firebaseapp.com",
  databaseURL: "https://philricescannerapp-default-rtdb.firebaseio.com",
  projectId: "philricescannerapp",
  storageBucket: "philricescannerapp.firebasestorage.app",
  messagingSenderId: "57763195941",
  appId: "1:57763195941:web:e1c8e98a6905b53fc2e3cc",
  measurementId: "G-1S23JZ7X56",
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
