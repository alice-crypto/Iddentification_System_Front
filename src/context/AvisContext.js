import axios from "axios";

export { newAvis };

function newAvis(givenname,
  surname,
  dateofbirth,
  placeofbirth,
  genre,
  height,
  photo,
  reward,
  selectedOption,
  history,
  setIsLoading, setError) {
  setError(false);
  setIsLoading(true);
  const today = new Date();
  if (!!givenname && !!surname) {
    const newLogin ={
      given_name: givenname,
      surname: surname,
      date_of_birth: dateofbirth,
      gender: genre,
      Height: height,
      photos: photo,
      PostedDate: "2023-08-10",
      reward: reward,
      ClosingDate: "2023-12-11",
      isActive: true,
      place_of_birth: placeofbirth,
      fk_commissariat: selectedOption
    }
    axios.post("http://localhost:8000/router/wanted-poster/", newLogin)
      .then(response => {
        // Connexion réussie, redirigez vers le tableau de bord (dashboard)
        setTimeout(() => {
          setError(null)
          setIsLoading(false)
          history.push("/app/dashboard")
        }, 2000);
      })
      .catch(error => {
        // Gestion des erreurs
        setError('Échec de la connexion. Veuillez vérifier vos identifiants.');
        console.error(error);
        setIsLoading(false)
      });
  } else {
    setError(true);
    setIsLoading(false);
  }
}

