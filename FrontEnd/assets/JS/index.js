const url = 'http://localhost:5678/api/works';

// Sélection de la div gallery 
const gallery = document.querySelector(".gallery");

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

// Appel de la fonction getWorks et affichage des données récupérées
getWorks()
    .then(worksArray => affichageWorks(worksArray))
    .catch(error => console.error('Error getting works:', error));



  
    
   

  

 