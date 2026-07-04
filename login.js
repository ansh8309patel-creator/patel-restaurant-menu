// FIREBASE CONFIG

const firebaseConfig = {

  apiKey: "AIzaSyAtNFkNDAAis_ekvqQA_xTOzckkOeBA-Jc",

  authDomain:
    "patel-restaurant.firebaseapp.com",

  projectId:
    "patel-restaurant",

  storageBucket:
    "patel-restaurant.appspot.com",

  messagingSenderId:
    "146982041851",

  appId:
     appId: "1:146982041851:web:d892473fb9d3ec0bb2585e",

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