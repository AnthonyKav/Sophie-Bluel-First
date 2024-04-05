//défini l'adresse où fetch les données 
const url = 'http://localhost:5678/api/works';

// Sélection de la div gallery 
const gallery = document.querySelector(".gallery");
//selection de la div "filters" pour les boutons filtre
const filters = document.querySelector('.filters');

// Récupération des projets dans l'api 
async function getWorks() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching works:', error);
        return [];
    }
}
// Récupération du tableau des catégories //
async function getCategorys() {
    const response = await fetch("http://localhost:5678/api/categories");
    return await response.json();
}

async function displayButtonsCategorys() {
    //Apelle la fonction GetCategorys pour  liste de catégorie en attendant la resolution de la promesse 
    const categorys = await getCategorys();
    // Parcours chaque élement de la liste retournée par GetCategorys 
    categorys.forEach(category => {
        const btn = document.createElement("button")
        //défini le texte du bouton en extrayant la premiere lettre pour la mettre en majucule et le reste en minuscule 
        btn.textContent = category.name.charAt(0).toUpperCase() + category.name.slice(1).toLowerCase();
        // defini l'id du bouton avec l'id de la catégorie 
        btn.id = category.id;
        //ajoute le bouton crée à l'élement filters du html 
        filters.appendChild(btn);
    });
}

// Filtrage au clic sur le bouton par catégories //

async function filterCategory() {
    // récupére les images en utilsant la fonction getWorks (elle attend que cette dernière soit resolu grace au await)
    const images = await getWorks();
    console.log(images);
    // Sélectionne tous les boutons à l'intérieur de l'élément HTML avec la classe "filters".
    const buttons = document.querySelectorAll(".filters button")
   //Pour chaque bouton sélectionné, ajoute un gestionnaire d'événements "click".
    buttons.forEach(button => {
        //Lorsque l'utilisateur clique sur un bouton, cela déclenche cet événement. La fonction callback reçoit l'événement ( e) comme paramètre.
        button.addEventListener("click", (e) => {
            //Récupère l'ID du bouton sur lequel l'utilisateur a cliqué.
            const btnId = e.target.id;
            //Vérifie si l'ID du bouton est différent de "0" (qui représente le bouton "Tous"). Si c'est le cas, 
            //cela signifie qu'un filtre de catégorie spécifique a été sélectionné, sinon, tous les travaux sont affichés.
            if (btnId !== "0") {
                const buttonsTriCategory = images.filter((caption) => {
                    return caption.categoryId == btnId
                });
                affichageWorks(buttonsTriCategory);
            } else {
                affichageWorks(images);
            }
            console.log(btnId);
        })
    });
}
    

// Affichage des projets (works) dans le DOM 
async function affichageWorks(worksArray) {
    gallery.innerHTML = ""; // Vide la galerie avant d'ajouter les works 
    worksArray.forEach((work) => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figCaption = document.createElement("figcaption");
        img.src = work.imageUrl;
        figCaption.textContent = work.title;
        figure.appendChild(img);
        figure.appendChild(figCaption);
        gallery.appendChild(figure);
    });
}



// Appeler les fonctions après le chargement de la page

// Ajoute un écouteur d'evenement sur le chargement du Dom , les fonction asynchrone se déclanchent une fois que le Dom à fini de charger 
document.addEventListener("DOMContentLoaded", async () => {
    await displayButtonsCategorys();
    await affichageWorks(await getWorks()); // Afficher toutes les œuvres par défaut
    await filterCategory();
});




  
    
   

  

 