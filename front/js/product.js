
//recuperer l'Id de l'URL
function getProductId() {
    return new URL(location.href).searchParams.get("id")   
}

fetch(`http://localhost:3000/api/products/${getProductId()}`)
    .then (res =>res.json()
    .then (data => {
        console.log(data)
        const img = document.createElement("img");
        img.src =data.imageUrl;
        document.getElementsByClassName("item__img")[0].appendChild(img)
        title.textContent = data.name
        price.textContent = data.price
        description.textContent = data.description
        colors.textContent.forEach(color => {
            const colorChoice = document.createElement('option')
            colorChoice.value = color
            colorChoice.textContent = color
            colors.appendChild(colorChoice)
          })
    })
    .catch(function(err) {
        // Une erreur est survenue
      })
    )

    