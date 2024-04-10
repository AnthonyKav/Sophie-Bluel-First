// ******************************************************************************
// ****************************** LOG IN // LOG OUT ******************************
// ******************************************************************************
const email = document.querySelector('#email').value;
const password = document.querySelector('#password').value;
const user = { email, password};
const logOutBtn = document.getElementById("logOut");
const form = document.querySelector('form');
const token = window.localStorage.token 


// Fonction pour gérer la connexion
function logIn() {
    // Ajouter un écouteur d'événement sur la soumission du formulaire
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Empêcher le rechargement de la page

        // Récupérer les valeurs des champs email et mot de passe et les stocks dans User 
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        const user = { email, password };

        try {
            // Envoyer une requête POST à l'API pour se connecter
            const response = await fetch("http://localhost:5678/api/users/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            // Si la réponse est un succès (code 200)
            if (response.status === 200) {
                const data = await response.json(); // Récupérer les données de la réponse
                const idtoken = data.token; // Extraire le token de la réponse
                window.localStorage.setItem("token", idtoken); // Stocker le token dans le localStorage
                window.location.href = "index.html"; // Rediriger vers la page d'accueil
            } else {
                // Afficher un message d'erreur si les identifiants sont incorrects
                document.getElementById("nameError").innerHTML = "Erreur dans l'identifiant ou le mot de passe";
            }
        } catch (error) {
            console.log(error); // Afficher les erreurs dans la console
        }
    });
}

// Fonction pour gérer la déconnexion
function logOut() {
    // Vérifier si un token est présent dans le localStorage
    if (window.localStorage.getItem("token")) {
        logOutBtn.innerHTML = "logout"; // Changer le texte du bouton de déconnexion
        logOutBtn.addEventListener("click", () => {
            window.localStorage.removeItem("token"); // Supprimer le token du localStorage
        });
    }
}

// Appeler les fonctions de connexion et déconnexion
logIn();
logOut();