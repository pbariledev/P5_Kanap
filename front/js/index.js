/* appeler le back pour recuperer les infos
 appelAPI(url).then(
        resultatDeAPI : un liste de produit
            --> parcourir la liste
        resultatDeAPI.forEach(canap)
            -->afficher les canap
            --> pour chaque element de la list l'afficher sur la page
 )*/

//1. appler l'API
fetch("http://localhost:3000/api/products")
.then(function(res){ // voir ce qu'il affiche sur la consol (response)
    console.log(res)
if (res.ok) {
    return res.json();
}
    })

.then(function(products){// voir nos produits sur la consol (8)
    console.log(products)
products.forEach(product => { //boucle pour chaques produits trouvés
    //afficher le detail du produit dans le DOM
        //1 creer l'element HTML
        //2 afficher l'élement HTML au bon endroit dans le DOM
            //creer un element dynamique
            let canapHtmlElement = `
                <a href="./product.html?id=${product._id}">
                    <article>
                        <img src="${product.imageUrl}" alt="${product.altTxt}">
                        <h3 class="productName">${product.name}</h3>
                        <p class="productDescription">${product.description}</p>
                    </article>
                </a>`

            const parser = new DOMParser();
            const data = parser.parseFromString(canapHtmlElement, "text/html")
                    console.log(data)

});
});