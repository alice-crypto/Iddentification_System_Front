import axios from "axios";

export {deleteAvis, See, Update};

function deleteAvis(id) {
  if (!!id) {
    axios.delete("http://localhost:8000/router/wanted-poster/"+id+"/")
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
    history.push("/app/avis/seeavis?id="+id);
}

function Update(id, history) {
  history.push("/app/avis/updateavis?id="+id);
}