const localStorageName = "itemInOrder";

//fonction pour la mise à jour dynaique du total quantité-prix
function modifyTotal (cart){
    //TOTAL ARTICLES
    const totalQteItem = document.querySelector ("#totalQuantity")
    let totalQte = 0;
    for (let product of cart) {
        totalQte += Number(product.quantity);
    } 

    totalQteItem.innerHTML = totalQte

    //TOTAL PRIX PANIER
    const totalPriceItem = document.querySelector ("#totalPrice")
    let totalPriceOrder = 0;
    for (let product of cart) {
        //pour chaques produits
        fetch(`http://localhost:3000/api/products/${product.id}`)
            .then (res =>res.json()
            .then (produit => {
                const price = produit.price;
                const quantity = product.quantity;
                totalPriceOrder += price * quantity ;
                totalPriceItem.innerHTML = totalPriceOrder;
            }))
    };
}

async function postOrder(dataPush) {
    try {
      const response = await fetch(
        "http://localhost:3000/api/products/order",
        dataPush
      );
  
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log(result);
      localStorage.clear();
      document.location.href = "confirmation.html?orderId=" + result.orderId;
    } catch (error) {
      console.log(error);
    }
}

const itemsOrder = document.querySelector ("#cartAndFormContainer") // selection de la class ou je vais injecter le code HTML


if(localStorage.length === 0 ){ // si le panier est vide : afficher le panier est vide
    let cartVide = `<h1>Votre panier est vide</h1>`;
    itemsOrder.innerHTML = cartVide;
} else{//si le panier n'est pas vide: afficher les produits qui sont dans le localStorage
    const retrievedItemInOrder = localStorage.getItem (localStorageName);
    console.log (retrievedItemInOrder)
    var parsedItemInOrder = JSON.parse(retrievedItemInOrder);
    console.log (parsedItemInOrder);
    modifyTotal (parsedItemInOrder)

    parsedItemInOrder.forEach(product => { //boucle pour chaques produits trouvés
        fetch(`http://localhost:3000/api/products/${product.id}`)
            .then (res =>res.json()
            .then (produit => {
                //creer un element HTML dynamique
                let itemHtmlElement = `
                <article class="cart__item" data-id="${product.id}" data-color="${product.color}">
                    <div class="cart__item__img">
                        <img src=${produit.imageUrl} alt=${produit.description}>
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>${produit.name}</h2>
                            <p>${product.color}</p>
                            <p>${produit.price} €</p>
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
                
                //3 modification des quantités et suppression des elements
                const itemQuantityInput = document.querySelector(`.cart__item[data-id="${product.id}"][data-color="${product.color}"] input`);
                const itemDeleteLink = document.querySelector(`.cart__item[data-id="${product.id}"][data-color="${product.color}"] .deleteItem`);
                 
                //modification des quantités au clic
                itemQuantityInput.addEventListener("change", (event)=>{
                    const newQuantity = event.currentTarget.value;
                    let optionsProduit = {
                        id : product.id,
                        quantity : newQuantity,
                        color : product.color,
                    }
                    if(newQuantity>100){
                        alert("veuillez saisir une quantité entre 1 et 100 pour ajouter au panier");
                        event.preventDefault();
                    }else{
                        let produitSaveInLocalStorage = JSON.parse(localStorage.getItem(localStorageName));
                        const doublon = produitSaveInLocalStorage.find ((element) => element.id == optionsProduit.id && element.color == optionsProduit.color)
                        if (doublon){ 
                            doublon.quantity = newQuantity;
                            localStorage.setItem(localStorageName, JSON.stringify(produitSaveInLocalStorage));
                        }else{
                            produitSaveInLocalStorage.push(optionsProduit);
                            localStorage.setItem(localStorageName, JSON.stringify(produitSaveInLocalStorage));
                        };
                        modifyTotal(produitSaveInLocalStorage)
                    }
                })

                //suppression de l'item au clic
                itemDeleteLink.addEventListener("click", (event)=>{
                    event.preventDefault();
                    let optionsProduit = {
                        id : product.id,
                        color : product.color,
                    }
                    let produitSaveInLocalStorage = JSON.parse(localStorage.getItem(localStorageName));
                    //Selection de l'element à supprimer
                    produitSaveInLocalStorage = produitSaveInLocalStorage.filter( el => el.id !== optionsProduit.id || el.color !== optionsProduit.color );
                    localStorage.setItem(localStorageName, JSON.stringify(produitSaveInLocalStorage));
                    const itemDelete=document.querySelector(`.cart__item[data-id="${product.id}"][data-color="${product.color}"]`)
                    itemDelete.remove();
                    //Alerte produit supprimé et refresh
                    alert("Ce produit a bien été supprimé du panier");
                    modifyTotal(produitSaveInLocalStorage);
                    if(produitSaveInLocalStorage.length === 0 ){ // si le panier est vide : afficher le panier est vide
                        let cartVide = `
                        <h1>Votre panier est vide</h1>
                        `;
                        itemsOrder.innerHTML = cartVide;
                    }
                })  
                            
            })
        )
    });
   
    //------------ Verification du formulaire contact------------
    // creation des regex
    let AdressRegExp = new RegExp("^[a-zA-Z0-9._-]+[a-zA-Z-àâäéèêëïîôöùûüç ,.'-]+$");
    let textRegExp = new RegExp("^[a-zA-Z-àâäéèêëïîôöùûüç ,.'-]+$");
    let emailReg = new RegExp('^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-z]{2,10}$');

    // creation des constantes pour les inputs à ecouter
    const prenom = document.querySelector("#firstName");
    const nom = document.querySelector("#lastName");
    const adresse = document.querySelector("#address");
    const ville = document.querySelector("#city");
    const eMail = document.querySelector("#email");

    // verification Prénom
    prenom.addEventListener("change", (event)=>{
        if(textRegExp.test(firstName.value)){
            firstNameErrorMsg.innerHTML="";
        }else {
            firstNameErrorMsg.innerHTML="Merci de renseigner votre prénom";
        }
    })
    // verification Nom
    nom.addEventListener("change", (event)=>{
        if(textRegExp.test(lastName.value)){
            lastNameErrorMsg.innerHTML="";
        }else {
            lastNameErrorMsg.innerHTML="Merci de renseigner votre nom";
        }
    })
    // verification Adresse
    adresse.addEventListener("change", (event)=>{
        if(AdressRegExp.test(address.value)){
            addressErrorMsg.innerHTML="";
        }else {
            addressErrorMsg.innerHTML="Merci de renseigner votre adresse";
        }
    })
    // verification Ville
    ville.addEventListener("change", (event)=>{
        if(textRegExp.test(city.value)){
            cityErrorMsg.innerHTML="";
        }else {
            cityErrorMsg.innerHTML="Merci de renseigner votre ville";
        }
    })
    // verification Email
    eMail.addEventListener("change", (event)=>{
        if(emailReg.test(email.value)){
            emailErrorMsg.innerHTML="";
        }else {
            emailErrorMsg.innerHTML="Merci de renseigner un email correct";
        }
    })

    // REQUETE POST 
    //actions au click du bouton commande
    const btnCommand = document.getElementById("order");
    // recupération des inputs
    let inputFirstName = document.getElementById('firstName');
    let inputLastName = document.getElementById('lastName');
    let inputAddress = document.getElementById('address');
    let inputCity = document.getElementById('city');
    let inputEmail = document.getElementById('email');
    
    // au click commande
    btnCommand.addEventListener("click" ,(event)=>{
        event.preventDefault
        // verifier SI les input remplis
        if (
            !inputFirstName.value ||
            !inputLastName.value ||
            !inputAddress.value || 
            !inputCity.value ||
            !inputEmail.value
        ){
            alert("merci de renseigner tous les champs")
            event.preventDefault();
        }else if (    // SINON verifier SI les valeurs des inputs corrects
            !textRegExp.test(firstName.value) ||
            !textRegExp.test(lastName.value) ||
            !AdressRegExp.test(address.value) ||
            !textRegExp.test(city.value) ||
            !emailReg.test(email.value)
        ){alert('Merci de renseigner correctement tous les champs')
        }else {    //SINON stocker les inputs dans le localStorage
            let contactSaveInLocalStorage = JSON.parse(localStorage.getItem("OrderContact"));
            let contact = {
                firstName : firstName.value,
                lastName : lastName.value,
                address : address.value,
                city :city.value,
                email :email.value,
            }
            contactSaveInLocalStorage = [];
            contactSaveInLocalStorage.push(contact);
            localStorage.setItem("OrderContact", JSON.stringify(contactSaveInLocalStorage));
            let idProducts= [];
                for (let i =0 ; i < parsedItemInOrder.length ; i++){
                    idProducts.push(parsedItemInOrder[i].id);
                    console.log(idProducts)
                }
            const validation = { contact, products: idProducts}
            let dataPush = {
                method :'POST',
                body : JSON.stringify(validation),
                headers: {
                    "Content-Type": "application/json",
                }
                
            }
            postOrder(dataPush);
        };        
    })

}