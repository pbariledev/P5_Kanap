// selection de la class ou je vais injecter le code HTML
const itemsOrder = document.querySelector ("#cartAndFormContainer")

// si le panier est vide : afficher le panier est vide
if(localStorage.length === 0 ){
    let cartVide = `
    <h1>Votre panier est vide</h1>
    `;
    itemsOrder.innerHTML = cartVide;
} else{
    //si le panier n'est pas vide: afficher les produits qui sont dans le localStorage
    console.log("je ne suis pas vide")
    const retrievedItemInOrder = localStorage.getItem (localStorage.key(0))
    console.log (retrievedItemInOrder)
    var parsedItemInOrder = JSON.parse(retrievedItemInOrder)

    let containerCart= [];

    for (i=0; i<parsedItemInOrder.length; i++){
        console.log(parsedItemInOrder.length);
        
        containerCart = containerCart + `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
        <div class="cart__item__img">
          <!--<img src="../images/product01.jpg" alt="Photographie d'un canapé">-->
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>Nom du produit</h2>
            <p>Vert</p>
            <p>42,00 €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;
    }
      if (i === parsedItemInOrder.length){
      // injection dans le panier
      itemsOrder.innerHTML= containerCart;
    }
}
