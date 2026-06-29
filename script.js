let total = 0;

function showTables(){
    document.getElementById("table").style.display = "block";
}

function tableSelected(){
    let table = document.getElementById("table").value;
    document.getElementById("tableName").innerHTML = "Selected: " + table;
}

function addToCart(item, price){

    let li = document.createElement("li");
    li.innerHTML = item + " - ₹" + price;

    document.getElementById("cartList").appendChild(li);

    total += price;

    document.getElementById("total").innerHTML = total;
}