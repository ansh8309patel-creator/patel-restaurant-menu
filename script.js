const menu = document.getElementById("menu");

const cartItems =
document.getElementById("cartItems");

const totalPrice =
document.getElementById("totalPrice");

let cart = {};

db.collection("dishes").onSnapshot((snapshot) => {

  menu.innerHTML = "";

  snapshot.forEach((doc) => {

    const dish = doc.data();

    menu.innerHTML += `

      <div class="dish-card">

        <img src="${dish.image}"
             class="dish-image">

        <div class="dish-content">

          <h2>${dish.name}</h2>

          <div class="price">

            ₹${dish.price}

          </div>

          <div class="category">

            ${dish.category}

          </div>

          <div class="cart-controls">

            <button onclick="decreaseQty('${doc.id}')">
              -
            </button>

            <span class="qty"
                  id="qty-${doc.id}">
              0
            </span>

            <button
              onclick="increaseQty(
              '${doc.id}',
              '${dish.name}',
              ${dish.price}
              )">

              +

            </button>

          </div>

        </div>

      </div>

    `;
  });

});

function increaseQty(id,name,price){

  if(!cart[id]){

    cart[id] = {

      name:name,
      price:price,
      qty:0

    };
  }

  cart[id].qty++;

  document.getElementById(
  `qty-${id}`
  ).innerText = cart[id].qty;

  updateCart();
}

function decreaseQty(id){

  if(cart[id]){

    if(cart[id].qty > 0){

      cart[id].qty--;
    }

    document.getElementById(
    `qty-${id}`
    ).innerText = cart[id].qty;

    updateCart();
  }
}

function updateCart(){

  cartItems.innerHTML = "";

  let total = 0;

  for(let id in cart){

    if(cart[id].qty > 0){

      let itemTotal =
      cart[id].price * cart[id].qty;

      total += itemTotal;

      cartItems.innerHTML += `

        <p>

          ${cart[id].name}

          x ${cart[id].qty}

          = ₹${itemTotal}

        </p>

      `;
    }
  }

  totalPrice.innerText =
  "Total: ₹" + total;
}

function orderWhatsApp(){

  let message =
  "Hello Patel Cafe,%0A%0AMy Order:%0A";

  let total = 0;

  for(let id in cart){

    if(cart[id].qty > 0){

      let itemTotal =
      cart[id].price * cart[id].qty;

      total += itemTotal;

      message +=

      `${cart[id].name}
       x ${cart[id].qty}
       = ₹${itemTotal}%0A`;

    }
  }

  message += `%0ATotal = ₹${total}`;

  window.open(

`https://wa.me/919428425949?text=${message}`

  );
}