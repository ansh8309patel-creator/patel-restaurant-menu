// CREATE ACCOUNT

function signup() {

  const email = document.getElementById("email").value;

  const password = document.getElementById("password").value;

  if (!email || !password) {

    alert("Please enter email and password");

    return;
  }

  auth.createUserWithEmailAndPassword(email, password)

  .then(() => {

    alert("Account Created Successfully");

  })

  .catch((error) => {

    alert(error.message);

  });

}


// LOGIN

function login() {

  const email = document.getElementById("email").value;

  const password = document.getElementById("password").value;

  if (!email || !password) {

    alert("Please enter email and password");

    return;
  }

  auth.signInWithEmailAndPassword(email, password)

  .then(() => {

    alert("Login Successful");

    window.location.href = "admin.html";

  })

  .catch((error) => {

    alert(error.message);

  });

}