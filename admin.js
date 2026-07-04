// CHECK LOGIN

auth.onAuthStateChanged((user) => {

  if (!user) {
    window.location.href = "login.html";
  }

});


// ADD DISH

function addDish() {

  const name = document.getElementById("dishName").value;

  const price = document.getElementById("dishPrice").value;

  const image = document.getElementById("dishImage").value;

  const category = document.getElementById("dishCategory").value;

  if (!name || !price || !image || !category) {

    alert("Please fill all fields");

    return;
  }

  db.collection("dishes").add({

    name: name,
    price: price,
    image: image,
    category: category

  })

  .then(() => {

    alert("Dish Added");

    document.getElementById("dishName").value = "";
    document.getElementById("dishPrice").value = "";
    document.getElementById("dishImage").value = "";
    document.getElementById("dishCategory").value = "";

  })

  .catch((error) => {

    alert(error.message);

  });

}


// LOAD DISHES

function loadDishes() {

  const dishList = document.getElementById("dishList");

  db.collection("dishes").onSnapshot((snapshot) => {

    dishList.innerHTML = "";

    snapshot.forEach((doc) => {

      const dish = doc.data();

      dishList.innerHTML += `

        <div class="dish-card">

          <img src="${dish.image}" width="200">

          <h3>${dish.name}</h3>

          <p>₹${dish.price}</p>

          <p>${dish.category}</p>

          <button onclick="deleteDish('${doc.id}')">
            Delete
          </button>

        </div>

      `;

    });

  });

}


// DELETE DISH

function deleteDish(id) {

  db.collection("dishes").doc(id).delete()

  .then(() => {

    alert("Dish Deleted");

  });

}


// LOGOUT

function logout() {

  auth.signOut()

  .then(() => {

    window.location.href = "login.html";

  });

}


// START

loadDishes();