// FIREBASE IMPORTS

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// FIREBASE CONFIG

const firebaseConfig = {

  apiKey: "AIza....",

  authDomain: "patel-restaurant.firebaseapp.com",

  projectId: "patel-restaurant",

  storageBucket: "patel-restaurant.firebasestorage.app",

  messagingSenderId: "146982041851",

  appId: "1:146982041851:web:d892473fb9d3ec0bb2585e"

};

// INITIALIZE FIREBASE

const app = initializeApp(firebaseConfig);

// DATABASE

const db = getFirestore(app);

export { db };