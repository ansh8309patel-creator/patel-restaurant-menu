window.sendToWhatsApp = async function(){

  if(cart.length === 0){

    alert("Cart is empty!");

    return;

  }

  // SAVE ORDER TO FIREBASE

  const orderData = {

    table: tableNumber,

    items: cart,

    total: total,

    time: new Date().toLocaleString()

  };

  // FIREBASE SAVE

  const { addDoc, collection } =

    await import(
      "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"
    );

  await addDoc(
    collection(db, "orders"),
    orderData
  );

  // WHATSAPP MESSAGE

  let message =
    "🍽️ Table " +
    tableNumber +
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

  let phoneNumber =
    "919999999999";

  let url =
    "https://wa.me/" +
    phoneNumber +
    "?text=" +
    message;

  window.open(url, "_blank");

};