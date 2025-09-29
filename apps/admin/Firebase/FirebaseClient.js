'use client'

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDDOBxVjSE3JZUJUSiG5Mupud-pkVHCCJA",
  authDomain: "numcheck-f9334.firebaseapp.com",
  databaseURL: "https://numcheck-f9334-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "numcheck-f9334",
  storageBucket: "numcheck-f9334.firebasestorage.app",
  messagingSenderId: "866912306406",
  appId: "1:866912306406:web:57f6c919af58ca397de727"
};

export const app = initializeApp(firebaseConfig);