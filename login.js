import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {

  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {

  apiKey: "AIzaSyAtNFkNDAAis_ekvqQA_xTOzckkOeBA-Jc",

  authDomain: "patel-restaurant.firebaseapp.com",

  projectId: "patel-restaurant",

  storageBucket: "patel-restaurant.firebasestorage.app",

  messagingSenderId: "146982041851",

  appId: "1:146982041851:web:d892473fb9d3ec0bb2585e",

  measurementId: "G-BHGX2NSZPF"

};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// SIGNUP

document.getElementById("signup-form")

.addEventListener("submit", (e) => {

  e.preventDefault();

  const email =
    document.getElementById("signup-email").value;

  const password =
    document.getElementById("signup-password").value;

  createUserWithEmailAndPassword(
    auth,
    email,
    password
  )

  .then(() => {

    alert("Account Created Successfully!");

  })

  .catch((error) => {

    alert(error.message);

  });

});

// LOGIN

document.getElementById("login-form")

.addEventListener("submit", (e) => {

  e.preventDefault();

  const email =
    document.getElementById("email").value;

  const password =
    document.getElementById("password").value;

  signInWithEmailAndPassword(
    auth,
    email,
    password
  )

  .then(() => {

    alert("Login Successful!");

    window.location.href =
      "admin.html";

  })

  .catch((error) => {

    alert(error.message);

  });

});