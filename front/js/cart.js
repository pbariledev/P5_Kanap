const itemsOrder = document.querySelector ("#cartAndFormContainer") // selection de la class ou je vais injecter le code HTML


if(localStorage.length === 0 ){ // si le panier est vide : afficher le panier est vide

    let cartVide = `
    <h1>Votre panier est vide</h1>
    `;
    itemsOrder.innerHTML = cartVide;
}   else{//si le panier n'est pas vide: afficher les produits qui sont dans le localStorage
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
                            alert("veuillez saisir une couleur et une quantité entre 1 et 100 pour ajouter au panier");
                            event.preventDefault();
                        }
                        else{let produitSaveInLocalStorage = JSON.parse(localStorage.getItem("itemInOrder"));
                        const doublon = produitSaveInLocalStorage.find ((element) => element.id == optionsProduit.id && element.color == optionsProduit.color)
                        if (doublon){ 
                            doublon.quantity = newQuantity;
                        localStorage.setItem("itemInOrder", JSON.stringify(produitSaveInLocalStorage));
                        }else{
                            produitSaveInLocalStorage.push(optionsProduit);
                            localStorage.setItem("itemInOrder", JSON.stringify(produitSaveInLocalStorage));
                        }
                        location.reload();}
                        

                    })
                        //suppression de l'item au clic
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

                         // voir gestion des qtt sup a 100 ou inf 0 ou = 0 à voir sur clock boutton commander
   
// verification du formulaire contact

// creation des regex
let textRegExp = new RegExp("^[a-zA-Z-àâäéèêëïîôöùûüç ,.'-]+$");
let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
let cityRegExp = new RegExp("^[0-9]{1,5}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
let emailReg = new RegExp('^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-z]{2,10}$');

// creation des cosntantes pour les inputs à ecouter
const prenom = document.querySelector("#firstName");
const nom = document.querySelector("#lastName");
const adresse = document.querySelector("#address");
const ville = document.querySelector("#city");
const eMail = document.querySelector("#email");

// verification Prénom
prenom.addEventListener("change", (event)=>{
    if(textRegExp.test(firstName.value)){
        firstNameErrorMsg.innerHTML="";
    }
    else {
        firstNameErrorMsg.innerHTML="Merci de renseigner votre prénom";
    }
})
// verification Nom
nom.addEventListener("change", (event)=>{
    if(textRegExp.test(lastName.value)){
        lastNameErrorMsg.innerHTML="";
    }
    else {
        lastNameErrorMsg.innerHTML="Merci de renseigner votre nom";
    }
})
// verification Adresse
adresse.addEventListener("change", (event)=>{
    if(addressRegExp.test(address.value)){
        addressErrorMsg.innerHTML="";
    }
    else {
        addressErrorMsg.innerHTML="Merci de renseigner votre adresse";
    }
})
// verification Ville
ville.addEventListener("change", (event)=>{
    if(cityRegExp.test(city.value)){
        cityErrorMsg.innerHTML="";
    }
    else {
        cityErrorMsg.innerHTML="Merci de renseigner votre ville";
    }
})
// verification Email
eMail.addEventListener("change", (event)=>{
    if(emailReg.test(email.value)){
        emailErrorMsg.innerHTML="";
    }
    else {
        emailErrorMsg.innerHTML="Merci de renseigner votre Mail";
    }
})

// actions au click du bouton commande
const btnCommand = document.getElementById("order");
    // recupération des inputs
    let inputFirstName = document.getElementById('firstName');
    let inputLastName = document.getElementById('lastName');
    let inputAddress = document.getElementById('address');
    let inputCity = document.getElementById('city');
    let inputEmail = document.getElementById('email');
    // au click commande
    btnCommand.addEventListener("click" ,(event)=>{
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
        }
        // SINON verifier SI les valeurs des inputs corrects
        else if (

            !textRegExp.test(firstName.value) ||
            !textRegExp.test(lastName.value) ||
            !addressRegExp.test(address.value) ||
            !cityRegExp.test(city.value) ||
            !emailReg.test(email.value)
        ) {
            alert('Merci de renseigner correctement tous les champs')
        }
        //SINON stocker les inputs dans le localStorage
        else {
            let contactSaveInLocalStorage = JSON.parse(localStorage.getItem("OrderContact"));

            let contact = {
                prenom : firstName.value,
                nom : lastName.value,
                adresse : address.value,
                ville :city.value,
                eMail :email.value,
            }
            contactSaveInLocalStorage = [];
            contactSaveInLocalStorage.push(contact);
            localStorage.setItem("OrderContact", JSON.stringify(contactSaveInLocalStorage));

        }
    })

