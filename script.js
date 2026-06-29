const items = [
  { name: 'Paneer Masala', price: 220, icon: '🍛' },
  { name: 'Kaju Masala', price: 350, icon: '🥘' },
  { name: 'Margherita Pizza', price: 300, icon: '🍕' },
  { name: 'Paneer Thin Crust', price: 320, icon: '🍕' },
  { name: 'Golden Corn Pizza', price: 430, icon: '🌽🍕' },
  { name: 'Veggie Loaded Pizza', price: 450, icon: '🥗🍕' },
  { name: 'Smoky BBQ Paneer Pizza', price: 400, icon: '🔥🍕' }
];

let cart = {};

function render(arr = items) {
  let menu = document.getElementById("menu");
  menu.innerHTML = "";

  arr.forEach(item => {
    menu.innerHTML += `
      <div class="card">
        <div style="font-size:50px;">${item.icon}</div>
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
        <button onclick="add('${item.name}', ${item.price})">
          Add to Cart
        </button>
      </div>
    `;
  });
}

render();

function add(name, price) {
  if (!cart[name]) {
    cart[name] = { price: price, quantity: 1 };
  } else {
    cart[name].quantity++;
  }

  updateCart();
}

function updateCart() {
  let cartList = document.getElementById("cart");
  cartList.innerHTML = "";

  let subtotal = 0;

  for (let item in cart) {
    let totalPrice = cart[item].price * cart[item].quantity;

    let li = document.createElement("li");
    li.innerHTML = `
      ${item} x ${cart[item].quantity} = ₹${totalPrice}
      <button onclick="increase('${item}')">+</button>
      <button onclick="decrease('${item}')">-</button>
    `;

    cartList.appendChild(li);

    subtotal += totalPrice;
  }

  let gst = subtotal * 0.05;
  let total = subtotal + gst;

  document.getElementById("sub").innerHTML = subtotal.toFixed(2);
  document.getElementById("gst").innerHTML = gst.toFixed(2);
  document.getElementById("total").innerHTML = total.toFixed(2);
}

function increase(item) {
  cart[item].quantity++;
  updateCart();
}

function decrease(item) {
  cart[item].quantity--;

  if (cart[item].quantity <= 0) {
    delete cart[item];
  }

  updateCart();
}

function bill() {
  let table = document.getElementById("table").value;
  let total = document.getElementById("total").innerHTML;

  alert(
    "******** BILL ********\n\n" +
    "Table: " + table +
    "\nTotal Amount: ₹" + total +
    "\n\nThank you for visiting Ansh Restaurant!"
  );
}

function searchMenu() {
  let text = document.getElementById("search").value.toLowerCase();

  let filtered = items.filter(item =>
    item.name.toLowerCase().includes(text)
  );

  render(filtered);
}

function review() {
  let rating = document.getElementById("rating").value;
  let reviewText = document.getElementById("review").value;

  if (reviewText.trim() === "") {
    alert("Please write a review.");
    return;
  }

  let reviews = document.getElementById("reviews");

  reviews.innerHTML += `
    <div style="border-bottom:1px solid #ccc;padding:10px 0;">
      <strong>⭐ ${rating}/5</strong><br>
      ${reviewText}
    </div>
  `;

  document.getElementById("review").value = "";
}
