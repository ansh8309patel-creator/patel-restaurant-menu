import { initializeApp }

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {

  getFirestore,
  collection,
  addDoc

}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {

  getAuth,
  onAuthStateChanged,
  signOut

}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// FIREBASE CONFIG

const firebaseConfig = {

  apiKey: "AIzaSyAtNFkNDAAis_ekvqQA_xTOzckkOeBA-Jc",

  authDomain: "patel-restaurant.firebaseapp.com",

  projectId: "patel-restaurant",

  storageBucket: "patel-restaurant.firebasestorage.app",

  messagingSenderId: "146982041851",

  appId: "1:146982041851:web:d892473fb9d3ec0bb2585e",

  measurementId: "G-BHGX2NSZPF"

};

// INITIALIZE

const app =
  initializeApp(firebaseConfig);

const db =
  getFirestore(app);

const auth =
  getAuth(app);

// PROTECT ADMIN PAGE

onAuthStateChanged(auth, (user) => {

  if (!user) {

    alert("Please login first!");

    window.location.href =
      "login.html";

  }

});

// LOGOUT

window.logout = function () {

  signOut(auth)

  .then(() => {

    alert("Logged Out!");

    window.location.href =
      "login.html";

  });

};

// ADD MENU ITEM

const form =
  document.getElementById("food-form");

form.addEventListener(
  "submit",
  async (e) => {

    e.preventDefault();

    const name =
      document.getElementById("food-name").value;

    const price =
      document.getElementById("food-price").value;

    const image =
      document.getElementById("food-image").value;

    const category =
      document.getElementById("food-category").value;

    try {

      await addDoc(
        collection(db, "menu"),
        {

          name,
          price,
          image,
          category

        }
      );

      alert(
        "Food Added Successfully!"
      );

      form.reset();

    }

    catch (error) {

      alert(error.message);

    }

  }
);