
//recuperer l'Id de l'URL
function getProductId() {
    return new URL(location.href).searchParams.get("id")   
}

function displayDetailProduct(produit) {
    const img = document.createElement("img");
        img.src =produit.imageUrl;
        document.getElementsByClassName("item__img")[0].appendChild(img)
        title.textContent = produit.name
        price.textContent = produit.price
        description.textContent = produit.description
        produit.colors.forEach(color => {
            const colorChoice = document.createElement('option')
            colorChoice.value = color
            colorChoice.innerHTML = color
            colors.appendChild(colorChoice)
          });
}
function handleaddtocart(){
    const addButton = document.querySelector("#addToCart");

    addButton.addEventListener("click", () => {
        const quantity = document.querySelector("#quantity");
        const color = document.querySelector("#colors");

        const nocolor = color.value =="";
        const noquantity = quantity.value == 0;
        const errorquantity = quantity.value <0 && quantity.value > 100;

        if (nocolor || noquantity || errorquantity){
            alert("veuillez saisir une couleur et une quantité entre 1 et 100 pour ajouter au panier");
        } else {
            //sauvegardeDanspanier();
            alert("Votre produit a bien été rajouté au panier")
        }
    })
}


fetch(`http://localhost:3000/api/products/${getProductId()}`)
    .then (res =>res.json()
    .then (produit => {
        displayDetailProduct(produit);
        handleaddtocart();
        console.log(produit)
    })
    .catch(function(err) {
        window.location.href = "./index.html"
        // Une erreur est survenue
      })
    )

    function getQuantityValue (){
        var input = document.getElementById("quantity").value;
    }
    function getColorValue (){
        var input = document.getElementById("colors").value;
    }
    

    let optionsProduit = {
        idProduit : getProductId (),
        quantityProduit : getQuantityValue (),
        colorProduit : getColorValue (),
    }
        console.log(optionsProduit);
    
        //-----------localStorage-----------
//au clic
    const addButton = document.querySelector("#addToCart");
    addButton.addEventListener("click", () => {
//récuperer les valeurs du formulaire
// stocker les valeurs du formulaire dans le storage
//déclarer un variable "produitSaveInLocalStorage"
    let produitSaveInLocalStorage = JSON.parse(localStorage.getItem("itemInOrder"));
    console.log(produitSaveInLocalStorage);
    
    if(produitSaveInLocalStorage){
        produitSaveInLocalStorage.push(optionsProduit);
        localStorage.setItem("itemInOrder", JSON.stringify(produitSaveInLocalStorage));
        console.log(produitSaveInLocalStorage)
    } else{
        produitSaveInLocalStorage = [];
        produitSaveInLocalStorage.push(optionsProduit);
        localStorage.setItem("itemInOrder", JSON.stringify(produitSaveInLocalStorage));
        console.log(produitSaveInLocalStorage)
    }
    })