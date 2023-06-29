import axios from "axios";
import dayjs from "dayjs";

export { newCard, newAvis, newRegion, newfrontAvis, newBorought, newfrontCard, newDepartment, newAuthority, newCommissariat, createUser };

function newCard(
  givenname,
  surname,
  dateofbirth,
  placeofbirth,
  genre,
  height,
  photo,
  reward,
  identity_number,
  deliverance_date,
  expired_date,
  phone,
  selectedOption,
    history,
    setIsLoading, 
    setError) {
    setError(false);
    setIsLoading(true);
    const today = new Date();
    if (!!givenname && !!surname) {
      console.log('photo ;', photo)
      console.log('tyoe ;', typeof photo)
  
  
      const data = new FormData()
      data.append('given_name', givenname)
      data.append('surname',surname)
      data.append('date_of_birth', dateofbirth)
      data.append('gender', genre)
      data.append('Height', height)
      data.append('photos', photo)
      data.append('PostedDate', dayjs().format('YYYY-MM-DD'))
      data.append('reward', reward)
      data.append('ClosingDate', dayjs().format('YYYY-MM-DD'))
      data.append('isActive', true)
      data.append('place_of_birth', placeofbirth)
      data.append('fk_authority', selectedOption)
      data.append('expired_date', expired_date)
      data.append('identity_number', identity_number)
      data.append('deliverance_date',deliverance_date)
      data.append('posted_phone_number', phone)
      console.log('data :', data)
  
  
      axios.post("http://localhost:8000/router/identity-cards/", data)
        .then(response => {
          // Connexion réussie, redirigez vers le tableau de bord (dashboard)
          setTimeout(() => {
            setError(null)
            setIsLoading(false)
            history.push("/app/card/listcard")
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
  function newfrontCard(
    givenname,
    surname,
    dateofbirth,
    placeofbirth,
    genre,
    height,
    photo,
    reward,
    identity_number,
    deliverance_date,
    expired_date,
    phone,
    selectedOption,
      history,
      setIsLoading, 
      setError) {
      setError(false);
      setIsLoading(true);
      const today = new Date();
      if (!!givenname && !!surname) {
        console.log('photo ;', photo)
        console.log('tyoe ;', typeof photo)
    
    
        const data = new FormData()
        data.append('given_name', givenname)
        data.append('surname',surname)
        data.append('date_of_birth', dateofbirth)
        data.append('gender', genre)
        data.append('Height', height)
        data.append('photos', photo)
        data.append('PostedDate', dayjs().format('YYYY-MM-DD'))
        data.append('reward', reward)
        data.append('ClosingDate', dayjs().format('YYYY-MM-DD'))
        data.append('isActive', false)
        data.append('place_of_birth', placeofbirth)
        data.append('fk_authority', selectedOption)
        data.append('expired_date', expired_date)
        data.append('identity_number', identity_number)
        data.append('deliverance_date',deliverance_date)
        data.append('posted_phone_number', phone)
        console.log('data :', data)
    
    
        axios.post("http://localhost:8000/router/identity-cards/", data)
          .then(response => {
            // Connexion réussie, redirigez vers le tableau de bord (dashboard)
            setTimeout(() => {
              setError(null)
              setIsLoading(false)
              history.push("/Icard")
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

function newAvis(
givenname,
  surname,
  dateofbirth,
  placeofbirth,
  genre,
  height,
  photo,
  reward,
  selectedOption,
  history,
  setIsLoading, 
  setError) {
  setError(false);
  setIsLoading(true);
  const today = new Date();
  if (!!givenname && !!surname) {
    console.log('photo ;', photo)
    console.log('tyoe ;', typeof photo)
    const newLogin ={
      given_name: givenname,
      surname: surname,
      date_of_birth: dateofbirth,
      gender: genre,
      Height: height,
      photos: photo,
      PostedDate:dayjs().format('YYYY-MM-DD'),
      reward: reward,
      ClosingDate: dayjs().format('YYYY-MM-DD'),
      isActive: true,
      place_of_birth: placeofbirth,
      fk_commissariat: selectedOption
    }


    const data = new FormData()
    data.append('given_name', givenname)
    data.append('surname',surname)
    data.append('date_of_birth', dateofbirth)
    data.append('gender', genre)
    data.append('Height', height)
    data.append('photos', photo)
    data.append('PostedDate', dayjs().format('YYYY-MM-DD'))
    data.append('reward', reward)
    data.append('ClosingDate', dayjs().format('YYYY-MM-DD'))
    data.append('isActive', true)
    data.append('place_of_birth', placeofbirth)
    data.append('fk_commissariat', selectedOption)
    console.log('data :', data)


    axios.post("http://localhost:8000/router/wanted-poster/", data)
      .then(response => {
        // Connexion réussie, redirigez vers le tableau de bord (dashboard)
        setTimeout(() => {
          setError(null)
          setIsLoading(false)
          history.push("/app/avis/listavis")
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
function newRegion(regionname,setIsLoading,setError) {
  setError(false);
  setIsLoading(true);
  const today = new Date();
  if (!!regionname) {
    const newInfo ={
      name: regionname,
    }
    axios.post("http://localhost:8000/router/regions/", newInfo)
      .then(response => {
        // Connexion réussie, redirigez vers le tableau de bord (dashboard)
        setTimeout(() => {
          setError(null)
          setIsLoading(false)
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
function newDepartment(departmentname,region,setIsLoading,setError) {
  setError(false);
  setIsLoading(true);
  const today = new Date();
  if (!!departmentname) {
    const newInfo ={
      name: departmentname,
      fk_region :region, 
    }
    axios.post("http://localhost:8000/router/departments/", newInfo)
      .then(response => {
        // Connexion réussie, redirigez vers le tableau de bord (dashboard)
        setTimeout(() => {
          setError(null)
          setIsLoading(false)
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
function newBorought(boroughtname,department,setIsLoading,setError) {
  setError(false);
  setIsLoading(true);
  const today = new Date();
  if (!!boroughtname) {
    const newInfo ={
      name: boroughtname,
      fk_department: department
    }
    axios.post("http://localhost:8000/router/boroughs/", newInfo)
      .then(response => {
        // Connexion réussie, redirigez vers le tableau de bord (dashboard)
        setTimeout(() => {
          setError(null)
          setIsLoading(false)
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



function newfrontAvis(
  givenname,
    surname,
    dateofbirth,
    placeofbirth,
    genre,
    height,
    photo,
    reward,
    selectedOption,
    history,
    setIsLoading, 
    setError) {
    setError(false);
    setIsLoading(true);
    const today = new Date();
    if (!!givenname && !!surname) {
      console.log('photo ;', photo)
      console.log('tyoe ;', typeof photo)
      const newLogin ={
        given_name: givenname,
        surname: surname,
        date_of_birth: dateofbirth,
        gender: genre,
        Height: height,
        photos: photo,
        PostedDate:dayjs().format('YYYY-MM-DD'),
        reward: reward,
        ClosingDate: dayjs().format('YYYY-MM-DD'),
        isActive: false,
        place_of_birth: placeofbirth,
        fk_commissariat: selectedOption
      }
  
  
      const data = new FormData()
      data.append('given_name', givenname)
      data.append('surname',surname)
      data.append('date_of_birth', dateofbirth)
      data.append('gender', genre)
      data.append('Height', height)
      data.append('photos', photo)
      data.append('PostedDate', dayjs().format('YYYY-MM-DD'))
      data.append('reward', reward)
      data.append('ClosingDate', dayjs().format('YYYY-MM-DD'))
      data.append('isActive', true)
      data.append('place_of_birth', placeofbirth)
      data.append('fk_commissariat', selectedOption)
      console.log('data :', data)
  
  
      axios.post("http://localhost:8000/router/wanted-poster/", data)
        .then(response => {
          // Connexion réussie, redirigez vers le tableau de bord (dashboard)
          setTimeout(() => {
            setError(null)
            setIsLoading(false)
            history.push("/accueil")
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



function newAuthority(authorityname,setIsLoading,setError) {
    setError(false);
    setIsLoading(true);
    const today = new Date();
    if (!!authorityname) {
      const newInfo ={
        name: authorityname
      }
      axios.post("http://localhost:8000/router/authorities/", newInfo)
        .then(response => {
          // Connexion réussie, redirigez vers le tableau de bord (dashboard)
          setTimeout(() => {
            setError(null)
            setIsLoading(false)
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
function newCommissariat(commissariatname,setIsLoading,setError) {
    setError(false);
    setIsLoading(true);
    const today = new Date();
    if (!!commissariatname) {
      const newInfo ={
        name: commissariatname
      }
      axios.post("http://localhost:8000/router/commissariat/", newInfo)
        .then(response => {
          // Connexion réussie, redirigez vers le tableau de bord (dashboard)
          setTimeout(() => {
            setError(null)
            setIsLoading(false)
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
  function createUser(
    username,
    password,
    firstname,
    lastname,
    email,
    phone,
    history,
    setIsLoading, 
    setError) {
    setError(false);
    setIsLoading(true);
    const today = new Date();
    if (!!username && !!password && !!firstname && !!lastname && !!email && !!phone) {    
    
        const data = new FormData()
        data.append('username', username)
        data.append('password',password)
        data.append('first_name', firstname)
        data.append('last_name', lastname)
        data.append('email', email)
        data.append('phone', phone)
        console.log('data :', data)
    
    
        axios.post("http://localhost:8000/router/Users/register/", data)
          .then(response => {
            // Connexion réussie, redirigez vers le tableau de bord (dashboard)
            setTimeout(() => {
              setError(null)
              setIsLoading(false)
              history.push("/app/user/listuser")
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
  

