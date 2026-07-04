// FIREBASE CONFIG

const firebaseConfig = {

  apiKey: "YOUR_API_KEY",

  authDomain: "patel-restaurant.firebaseapp.com",

  projectId: "patel-restaurant",

  storageBucket:
    "patel-restaurant.appspot.com",

  messagingSenderId:
    "146982041851",

  appId:
    "YOUR_APP_ID"

};

// INITIALIZE FIREBASE

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

// MENU CONTAINER

const menuContainer =
  document.getElementById("menu-container");

// LOAD DISHES FROM FIRESTORE

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

      <img src="${item.image}"
           class="food-img">

      <h3>${item.name}</h3>

      <p>₹${item.price}</p>

      <button onclick="
        addToCart(
          '${item.name}',
          ${item.price}
        )
      ">
        Add to Cart
      </button>

    `;

    menuContainer.appendChild(card);

  });

}

// LOAD MENU

loadMenu();

// CART

let total = 0;

let cart = [];

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

// WHATSAPP ORDER

window.sendToWhatsApp =
function(){

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

  let phone =
    "919428425949";

  window.open(

    "https://wa.me/" +
    phone +
    "?text=" +
    message,

    "_blank"

  );

};