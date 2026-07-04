function generateQR(){

  const tableNumber =
    document.getElementById(
      "table-number"
    ).value;

  const qrContainer =
    document.getElementById(
      "qr-container"
    );

  qrContainer.innerHTML = "";

  // WEBSITE URL

  const websiteURL =
    "http://127.0.0.1:5500/index.html?table=" +
    tableNumber;

  // TABLE TITLE

  const title =
    document.createElement("h2");

  title.innerText =
    "Table " + tableNumber;

  qrContainer.appendChild(title);

  // QR CODE

  const qrDiv =
    document.createElement("div");

  qrContainer.appendChild(qrDiv);

  new QRCode(qrDiv, {

    text: websiteURL,

    width: 250,

    height: 250

  });

}