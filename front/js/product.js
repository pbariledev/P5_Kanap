const localStorageName = "itemInOrder";

//fonction pour recuperer l'Id de l'URL
function getProductId() {  
    return new URL(location.href).searchParams.get("id")   
}

//fonction de récupération des données liées à Id produit
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

//fonction au clic sur Ajouter panier
function handleaddtocart(){ 
    const addButton = document.querySelector("#addToCart");
    addButton.addEventListener("click", () => {
        const quantity =  document.querySelector("#quantity");
        const color = document.querySelector("#colors");
        const nocolor = color.value =="";
        const noquantity = quantity.value == 0;
        const errorquantity = quantity.value <0 || quantity.value > 100;
        
        //si pas de color ou quantité nul ou mauvaise alert sinon localstorage
        if (nocolor || noquantity || errorquantity){
            alert("veuillez saisir une couleur et une quantité entre 1 et 100 pour ajouter au panier");
        } else {//-----------localStorage-----------
            //récuperer les valeurs des formulaires
            let optionsProduit = {
                id : getProductId (),
                quantity : quantity.value,
                color : color.value,
            }
            //déclarer un variable "produitSaveInLocalStorage"
            let produitSaveInLocalStorage = JSON.parse(localStorage.getItem(localStorageName));
                if(produitSaveInLocalStorage){
                    const doublon = produitSaveInLocalStorage.find ((element) => element.id == optionsProduit.id && element.color == optionsProduit.color)
                    if (doublon){
                        doublon.quantity = parseInt(doublon.quantity) + parseInt(optionsProduit.quantity);
                        localStorage.setItem(localStorageName, JSON.stringify(produitSaveInLocalStorage));
                    }else{
                        produitSaveInLocalStorage.push(optionsProduit);
                        localStorage.setItem(localStorageName, JSON.stringify(produitSaveInLocalStorage));
                    }
                } else{
                    produitSaveInLocalStorage = [];
                    produitSaveInLocalStorage.push(optionsProduit);
                    localStorage.setItem(localStorageName, JSON.stringify(produitSaveInLocalStorage));
                }  
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
    })
    .catch(function(err) {  // si erreur dans l'URL renvoi à l'index
        window.location.href = "./index.html"
    }))
