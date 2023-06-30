import axios from "axios";

export {deleteCard, See};

function deleteCard(id) {
  if (!!id) {
    axios.delete("http://localhost:8000/router/identity-cards/"+id+"/")
      .then(response => {
        // Connexion réussie, redirigez vers le tableau de bord (dashboard)
      })
      .catch(error => {
        // Gestion des erreurs
      });
  } else {
  }
}
function See(id, history) {
}