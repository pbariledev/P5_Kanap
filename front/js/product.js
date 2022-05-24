
//recuperer l'Id de l'URL
(function() {
    const productId = getProductId()
    console.log(productId)
})()
function getProductId() {
    return new URL(location.href).searchParams.get("id")   
}

fetch("http://localhost:3000/api/products")
    .then (res =>res.json()
    .then (data => {
        console.log(data)

    })
    )
