import axios from "axios";

export {deleteUser, See, UpdateUser};

function deleteUser(id) {
  if (!!id) {
    axios.delete("http://localhost:8000/router/Users/register/"+id+"/")
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
    history.push("/app/ui/seeavis?id="+id);
}

function UpdateUser(id, history) {
  history.push("/app/user/updateuser?id="+id);
}