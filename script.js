// FIREBASE CONFIG

const firebaseConfig = {

  apiKey: "PASTE_API_KEY",

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

// MENU CONTAINER

const menuContainer =
  document.getElementById(
    "menu-container"
  );

// LOAD MENU

async function loadMenu(){

  menuContainer.innerHTML = "";

  const snapshot =
    await db.collection("menu").get();

  snapshot.forEach(doc => {

    const item = doc.data();

    const card =
      document.createElement("div");

    card.className =
      "card " + item.category;

    card.innerHTML = `

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

        <button onclick="
          addToCart(
            '${item.name}',
            ${item.price}
          )
        ">
          Add to Cart
        </button>

        <button
          class="delete-btn"
          onclick="
            deleteDish(
              '${doc.id}'
            )
          "
        >
          Delete
        </button>

      </div>

    `;

    menuContainer.appendChild(card);

  });

}

// START MENU

loadMenu();

// CART

let total = 0;

let cart = [];

// ELEMENTS

const cartItems =
  document.getElementById(
    "cart-items"
  );

const cartTotal =
  document.getElementById(
    "cart-total"
  );

// ADD TO CART

window.addToCart = function(
  item,
  price
){

  total += Number(price);

  cart.push({
    name:item,
    price:price
  });

  const li =
    document.createElement("li");

  li.textContent =
    item + " - ₹" + price;

  cartItems.appendChild(li);

  cartTotal.textContent = total;

};

// SEARCH

const searchInput =
  document.getElementById(
    "searchInput"
  );

searchInput.addEventListener(
  "keyup",
  function(){

    const value =
      searchInput.value.toLowerCase();

    const cards =
      document.querySelectorAll(".card");

    cards.forEach(card => {

      const text =
        card.innerText.toLowerCase();

      if(text.includes(value)){

        card.style.display =
          "block";

      }

      else{

        card.style.display =
          "none";

      }

    });

  }
);

// FILTER

window.filterItems =
function(category){

  const cards =
    document.querySelectorAll(".card");

  cards.forEach(card => {

    if(category === "all"){

      card.style.display =
        "block";

    }

    else if(
      card.classList.contains(
        category
      )
    ){

      card.style.display =
        "block";

    }

    else{

      card.style.display =
        "none";

    }

  });

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

  loadMenu();

};

// WHATSAPP ORDER

window.sendToWhatsApp =
function(){

  if(cart.length === 0){

    alert(
      "Cart is empty!"
    );

    return;

  }

  let table =
    new URLSearchParams(
      window.location.search
    ).get("table") || "Unknown";

  let message =
    "🍽️ Table " +
    table +
    " Order:%0A%0A";

  cart.forEach(item => {

    message +=
      "• " +
      item.name +
      " - ₹" +
      item.price +
      "%0A";

  });

  message +=
    "%0ATotal: ₹" + total;

  const phone =
    "919428425949";

  const url =
    "https://wa.me/" +
    phone +
    "?text=" +
    message;

  window.open(
    url,
    "_blank"
  );

};