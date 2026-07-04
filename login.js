// FIREBASE CONFIG

const firebaseConfig = {

  apiKey: "PASTE_API_id",

  authDomain:
    "patel-restaurant.firebaseapp.com",

  projectId:
    "patel-restaurant",

  storageBucket:
    "patel-restaurant.appspot.com",

  messagingSenderId:
    "146982041851",

  appId:
    "PASTE_APP_ID"

};

// INITIALIZE FIREBASE

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

// LOGIN FUNCTION

window.login = function(){

  const email =
    document.getElementById(
      "email"
    ).value;

  const password =
    document.getElementById(
      "password"
    ).value;

  auth.signInWithEmailAndPassword(
    email,
    password
  )

  .then(() => {

    localStorage.setItem(
      "adminLoggedIn",
      "true"
    );

    window.location.href =
      "admin.html";

  })

  .catch((error) => {

    alert(error.message);

  });

};