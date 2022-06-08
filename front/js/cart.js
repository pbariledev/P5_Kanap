// selection de la class ou je vais injecter le code HTML
const itemsOrder = document.querySelector ("#cartAndFormContainer")

// si le panier est vide : afficher le panier est vide
if(localStorage.length === 0 ){
    let cartVide = `
    <h1>Votre panier est vide</h1>
    `;
    itemsOrder.innerHTML = cartVide;
}   else{
        //si le panier n'est pas vide: afficher les produits qui sont dans le localStorage
        const retrievedItemInOrder = localStorage.getItem ("itemInOrder");
        console.log (retrievedItemInOrder)
        var parsedItemInOrder = JSON.parse(retrievedItemInOrder);
        console.log (parsedItemInOrder);

        parsedItemInOrder.forEach(product => { //boucle pour chaques produits trouvés

            fetch(`http://localhost:3000/api/products/${product.id}`)
                .then (res =>res.json()
                .then (produit => {
                    //1 creer l'element HTML
                    //creer un element dynamique
                    let itemHtmlElement = `
                    <article class="cart__item" data-id="${product.id}" data-color="${product.color}">
                        <div class="cart__item__img">
                            <img src=${produit.imageUrl} alt=${produit.description}>
                        </div>
                        <div class="cart__item__content">
                            <div class="cart__item__content__description">
                                <h2>${produit.name}</h2>
                                <p>${product.color}</p>
                                <p>${product.price} €</p>
                            </div>
                            <div class="cart__item__content__settings">
                                <div class="cart__item__content__settings__quantity">
                                    <p>Qté :  </p>
                                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                                    </div>
                                    <div class="cart__item__content__settings__delete">
                                    <button class="deleteItem">Supprimer</button>
                                </div>
                            </div>
                        </div>
                    </article>`
                    //2 afficher l'élement HTML au bon endroit dans le DOM
                    const items = document.getElementById("cart__items");
                    const parser = new DOMParser();
                    const data = parser.parseFromString(itemHtmlElement, "text/html");
                        items.appendChild(data.body.firstChild); 
                    const itemQuantityInput = document.querySelector(`.cart__item[data-id="${product.id}"][data-color="${product.color}"] input`);
                    const itemDeleteLink = document.querySelector(`.cart__item[data-id="${product.id}"][data-color="${product.color}"] .deleteItem`);
                    const article = 
                        itemQuantityInput.addEventListener("change", (event)=>{
                            event.preventDefault();
                            const newQuantity = event.currentTarget.value;
                            let optionsProduit = {
                                id : product.id,
                                quantity : newQuantity,
                                color : product.color,
                            }
                            let produitSaveInLocalStorage = JSON.parse(localStorage.getItem("itemInOrder"));
                            const doublon = produitSaveInLocalStorage.find ((element) => element.id == optionsProduit.id && element.color == optionsProduit.color)
                            if (doublon){
                                doublon.quantity = newQuantity;
                            localStorage.setItem("itemInOrder", JSON.stringify(produitSaveInLocalStorage));
                            }else{
                                produitSaveInLocalStorage.push(optionsProduit);
                                localStorage.setItem("itemInOrder", JSON.stringify(produitSaveInLocalStorage));
                            }
                        })

                        itemDeleteLink.addEventListener("click", (event)=>{
                            event.preventDefault();
                            let optionsProduit = {
                                id : product.id,
                                color : product.color,
                            }
                            let produitSaveInLocalStorage = JSON.parse(localStorage.getItem("itemInOrder"));
                            //Selection de l'element à supprimer
                            produitSaveInLocalStorage = produitSaveInLocalStorage.filter( el => el.id !== optionsProduit.id || el.color !== optionsProduit.color );
                            localStorage.setItem("itemInOrder", JSON.stringify(produitSaveInLocalStorage));
                            //Alerte produit supprimé et refresh
                            alert("Ce produit a bien été supprimé du panier");
                            location.reload();
                        })  
                                    // voir gestion des qtt sup a 100 ou inf 0 ou = 0 à voir sur clock boutton commander
                            
                }))

        });
    }
//TOTAL ARTICLE
const totalQteItem = document.querySelector ("#totalQuantity")
let totalQte = 0;
for (let product of parsedItemInOrder) {
    totalQte += Number(product.quantity);
} 
    totalQteItem.innerHTML = totalQte

//TOTAL PRIX PANIER
const totalPriceItem = document.querySelector ("#totalPrice")
let totalPriceOrder = 0;
for (let product of parsedItemInOrder) {
    totalPriceOrder += Number(product.quantity*product.price);
} 
    totalPriceItem.innerHTML = totalPriceOrder

    


