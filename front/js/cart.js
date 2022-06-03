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
        console.log("je ne suis pas vide")
        const retrievedItemInOrder = localStorage.getItem ("itemInOrder");
        console.log (retrievedItemInOrder)
        var parsedItemInOrder = JSON.parse(retrievedItemInOrder);
        parsedItemInOrder.sort(function (a, b) {
            if (a.name < b.name) {
              return -1;
            } else {
              return 1;
            };
           });
        console.log (parsedItemInOrder)

        parsedItemInOrder.forEach(product => { //boucle pour chaques produits trouvés

            //fonction de récupération des données liées à Id produit
            function displayDetailProduct(produit) {
                    const imgage =produit.imageUrl;
                    const title = produit.name;
                    const price = produit.price;
                    const description = produit.description;
            }

                    fetch(`http://localhost:3000/api/products/${product.id}`)
                .then (res =>res.json()
                .then (produit => {
                    displayDetailProduct(produit);
                

                        //1 creer l'element HTML
                            //creer un element dynamique
                            let itemHtmlElement = `
                            <article class="cart__item" data-id="${product.id}" data-color="{product.color}">
                            <div class="cart__item__img">
                            <img src=${produit.imageUrl} alt=${produit.description}>
                            </div>
                            <div class="cart__item__content">
                            <div class="cart__item__content__description">
                                <h2>${produit.name}</h2>
                                <p>${product.color}</p>
                                <p>${produit.price}€</p>
                            </div>
                            <div class="cart__item__content__settings">
                                <div class="cart__item__content__settings__quantity">
                                <p>Qté :  </p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                                </div>
                                <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Supprimer</p>
                                </div>
                            </div>
                            </div>
                        </article>`
                        //2 afficher l'élement HTML au bon endroit dans le DOM
                            const items = document.getElementById("cart__items");
                                const parser = new DOMParser();
                                const data = parser.parseFromString(itemHtmlElement, "text/html");
                                items.appendChild(data.body.firstChild);
                                
                            }))
        });
    }

