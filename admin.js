// PROTECT ADMIN PAGE

if(
  localStorage.getItem(
    "adminLoggedIn"
  ) !== "true"
){

  window.location.href =
    "login.html";

}

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

const db = firebase.firestore();

const auth = firebase.auth();

// ADMIN MENU

const adminMenu =
  document.getElementById(
    "admin-menu"
  );

// LOAD DISHES

async function loadDishes(){

  adminMenu.innerHTML = "";

  const snapshot =
    await db.collection("menu").get();

  snapshot.forEach(doc => {

    const item = doc.data();

    adminMenu.innerHTML += `

      <div class="card">

        <img
          src="${item.image}"
          class="food-img"
        >

        <div class="card-content">

          <h3>
            ${item.name}
          </h3>

          <p>
            ₹${item.price}
          </p>

          <button
            class="delete-btn"
            onclick="
              deleteDish(
                '${doc.id}'
              )
            "
          >
            Delete Dish
          </button>

        </div>

      </div>

    `;

  });

}

// LOAD MENU

loadDishes();

// ADD DISH

window.addDish =
async function(){

  const name =
    document.getElementById(
      "dish-name"
    ).value;

  const price =
    document.getElementById(
      "dish-price"
    ).value;

  const image =
    document.getElementById(
      "dish-image"
    ).value;

  const category =
    document.getElementById(
      "dish-category"
    ).value;

  if(
    !name ||
    !price ||
    !image ||
    !category
  ){

    alert(
      "Please fill all fields"
    );

    return;

  }

  await db.collection("menu").add({

    name,
    price:Number(price),
    image,
    category

  });

  alert("Dish Added!");

  document.getElementById(
    "dish-name"
  ).value = "";

  document.getElementById(
    "dish-price"
  ).value = "";

  document.getElementById(
    "dish-image"
  ).value = "";

  document.getElementById(
    "dish-category"
  ).value = "";

  loadDishes();

};

// DELETE DISH

window.deleteDish =
async function(id){

  const confirmDelete =
    confirm(
      "Delete this dish?"
    );

  if(!confirmDelete){

    return;

  }

  await db
    .collection("menu")
    .doc(id)
    .delete();

  alert(
    "Dish Deleted!"
  );

  loadDishes();

};

// LOGOUT

window.logout = function(){

  auth.signOut().then(() => {

    localStorage.removeItem(
      "adminLoggedIn"
    );

    window.location.href =
      "login.html";

  });

};