let orderId = new URL(location.href).searchParams;
console.log(orderId)
let id = orderId.get('orderId');
console.log(id)

//placer id dans la span id = orderid
function getOrderId() {
    const displayOrderId = document.getElementById("orderId");
    displayOrderId.innerText = id;
    localStorage.clear();
}

getOrderId()