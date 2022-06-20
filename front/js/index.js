
//1. appeler l'API
fetch("http://localhost:3000/api/products")
    .then(function(res){ // voir ce qu'il affiche sur la consol
        if (res.ok) {
            return res.json();
        }
    })

    .then(function(products){// voir nos produits sur la consol
        products.forEach(product => { //boucle pour chaques produits trouvés
            //1 creer l'element HTML dynamique
            let canapHtmlElement = `
                <a href="./product.html?id=${product._id}">
                    <article>
                        <img src="${product.imageUrl}" alt="${product.altTxt}">
                        <h3 class="productName">${product.name}</h3>
                        <p class="productDescription">${product.description}</p>
                    </article>
                </a>`
            //2 afficher l'élement HTML au bon endroit dans le DOM
            const items = document.getElementById("items");
                const parser = new DOMParser();
                const data = parser.parseFromString(canapHtmlElement, "text/html");
                items.appendChild(data.body.firstChild);

        });
    });