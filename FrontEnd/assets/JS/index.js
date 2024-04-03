// url de l'api 
const url = 'http://localhost:5678/api/works';
// récupére tous les travaux
function getAllWorks(){
    return new Promise((resolve, reject) => {
        fetch(url)
    .then(response => {
    // Vérifie si la requête a été effectuée avec succès
    if (!response.ok) {
      throw new Error('La requête a échoué');
    }
    // Convertit la réponse en JSON
    return response.json();
  })
  .then(data => {
    resolve(data);
    // Manipule les données récupérées
    console.log('Données récupérées:', data);

  })
  .catch(error => {
    reject(error)
    // Attrape et gère les erreurs
    console.error('Une erreur s\'est produite:', error);
  });



    })
}
// appel de la fonction 
getAllWorks(url)
  .then(data => {
    console.log('Données récupérées avec succès :', data);
    data.forEach(element => {
        const gallery = document.querySelector(".gallery")
        const name = document.createElement("div")
        name.innerHTML = element.title
        gallery.appendChild(name)
    
        
    })
  })
  .catch(error => {
    console.error('Une erreur s\'est produite lors de la récupération des données :', error);
  });


// Utilisation de l'API Fetch pour récupérer les données
fetch(url)
  .then(response => {
    // Vérifie si la requête a été effectuée avec succès
    if (!response.ok) {
      throw new Error('La requête a échoué');
    }
    // Convertit la réponse en JSON
    return response.json();
  })
  
  
    
   

  

 