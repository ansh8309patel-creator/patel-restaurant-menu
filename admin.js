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

// INITIALIZE

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

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

// LOAD

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

  await db.collection("menu").add({

    name,
    price:Number(price),
    image,
    category

  });

  alert("Dish Added!");

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