// Définit l'adresse où fetch les données
const baseUrl = 'http://localhost:5678/api';

// Sélection de la div gallery
const gallery = document.querySelector(".gallery");
// Sélection de la div "filters" pour les boutons filtre
const filters = document.querySelector('.filters');

// Récupération des projets et des catégories dans l'API
async function fetchData() {
  try {
    // Effectue deux requêtes fetch en parallèle, une pour les œuvres et une pour les catégories
    const [worksResponse, categoriesResponse] = await Promise.all([
      fetch(`${baseUrl}/works`),
      fetch(`${baseUrl}/categories`)
    ]);

    // Vérifie si les réponses sont OK (code de statut 200-299)
    if (!worksResponse.ok || !categoriesResponse.ok) {
      throw new Error('Network response was not ok');
    }

    // Convertit les réponses en objets JSON
    const works = await worksResponse.json();
    const categories = await categoriesResponse.json();

    // Renvoie un objet contenant les œuvres et les catégories
    return { works, categories };
  } catch (error) {
    // Gère les erreurs de requête
    console.error('Error fetching data:', error);
    // Renvoie des tableaux vides en cas d'erreur
    return { works: [], categories: [] };
  }
}

async function displayButtonsCategorys(categories) {
  // Parcourt chaque catégorie
  categories.forEach(category => {
    // Crée un bouton pour la catégorie
    const btn = document.createElement("button");
    // Définit le texte du bouton (première lettre en majuscule, le reste en minuscule)
    btn.textContent = category.name.charAt(0).toUpperCase() + category.name.slice(1).toLowerCase();
    // Définit l'ID du bouton avec l'ID de la catégorie
    btn.id = category.id;
    // Ajoute le bouton à la div "filters"
    filters.appendChild(btn);
  });
}

// Filtrage au clic sur le bouton par catégories
async function filterCategory(works) {
  // Sélectionne tous les boutons dans la div "filters"
  const buttons = document.querySelectorAll(".filters button");
  buttons.forEach(button => {
    // Ajoute un gestionnaire d'événement "click" à chaque bouton
    button.addEventListener("click", (e) => {
      // Récupère l'ID du bouton cliqué
      const btnId = e.target.id;
      if (btnId !== "0") {
        // Si un bouton de catégorie est cliqué (ID différent de 0)
        // Filtre les œuvres correspondant à la catégorie
        const filteredWorks = works.filter(work => work.categoryId == btnId);
        // Affiche les œuvres filtrées
        affichageWorks(filteredWorks);
      } else {
        // Si le bouton "Tous" est cliqué (ID 0)
        // Affiche toutes les œuvres
        affichageWorks(works);
      }
      console.log("le bouton filtre " + btnId + " a été cliqué");
    });
  });
}

// Affichage des projets (works) dans le DOM
async function affichageWorks(worksArray) {
  // Vide la galerie avant d'ajouter les œuvres
  gallery.innerHTML = "";
  // Parcourt chaque œuvre
  worksArray.forEach((work) => {
    // Crée un élément figure pour l'œuvre
    const figure = document.createElement("figure");
    // Crée un élément img pour l'image de l'œuvre
    const img = document.createElement("img");
    // Crée un élément figcaption pour le titre de l'œuvre
    const figCaption = document.createElement("figcaption");
    // Définit la source de l'image
    img.src = work.imageUrl;
    // Définit le titre de l'œuvre
    figCaption.textContent = work.title;
    // Ajoute l'image et le titre à la figure
    figure.appendChild(img);
    figure.appendChild(figCaption);
    // Ajoute la figure à la galerie
    gallery.appendChild(figure);
  });
}

// Appeler les fonctions pour lancer les works
async function init() {
  // Récupère les œuvres et les catégories
  const { works, categories } = await fetchData();
  // Affiche toutes les œuvres par défaut
  await affichageWorks(works);
  // Affiche les boutons de catégories
  await displayButtonsCategorys(categories);
  // Ajoute le filtrage par catégorie
  await filterCategory(works);
}

// Initialise l'application
init();


/////////////////////////////////////////// ADMIN ////////////////////////////////////////////////


//////Fonction pour se deconnecter 

// Cette variable récupère la valeur du jeton d'authentification stocké dans le localStorage 
const token = window.localStorage.token 

function logOut() {
    // verifie si  un token d'authentification est présent dans le local storage . si il est présent 
    // le bouton Login se transoforme en Logout ( InnerHtml)
    const logOutBtn = document.getElementById("logOut");
  
    if (window.localStorage.getItem("token")) {
      logOutBtn.innerHTML = "logout";
     // Lorsque l'element est cliqué , le jeton est supprimé et l'utilsateur de ce fait déconnecté . 
      logOutBtn.addEventListener("click", () => {
        logOutBtn.href = window.location.href;
        window.localStorage.removeItem("token");
      });
    }}
  
  logOut();
  
  
  //// Fonction pour afficher la vue admin si l'utilisateur est connecté
  function displayAdminView() {
  const adminView = document.querySelectorAll(".adminView");
  const sectionFilters = document.querySelector(".filters"); // Sélection de l'élément .filters

  
  //si l utilisateur est connecté
  if (window.localStorage.getItem("token")) {
    //enleve les filtres
  sectionFilters.style.display = "none";
  } else {
    // Si l'utilisateur n'est pas connecté
    adminView.forEach((adminView) => {
      adminView.style.display = "none";
    });
    }}
  
  displayAdminView();