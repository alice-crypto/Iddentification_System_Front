import React from "react";
import axios from "axios";
import { Height } from "@material-ui/icons";


var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut, newAvis };

// ###########################################################

function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  if (!!login && !!password) {
    const newLogin ={
      email:login,
      password:password
    }
    axios.post("http://localhost:8000/router/Auth/login/", newLogin)
      .then(response => {
        // Connexion réussie, redirigez vers le tableau de bord (dashboard)
        const token = response.data.token;
        const refreshToken = response.data.refreshToken;
        console.log('Token:', token);
        console.log('Refresh Token:', refreshToken);
        setTimeout(() => {
          localStorage.setItem('id_token', token)
          setError(null)
          setIsLoading(false)
          dispatch({ type: 'LOGIN_SUCCESS' })
          history.push('/app/dashboard')
        }, 2000);
      })
      .catch(error => {
        // Gestion des erreurs
        setError('Échec de la connexion. Veuillez vérifier vos identifiants.');
        console.error(error);
        setIsLoading(false)
      });
  } else {
    dispatch({ type: "LOGIN_FAILURE" });
    setError(true);
    setIsLoading(false);
  }
}

function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}

function newAvis(dispatch, givenname,
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
          dispatch({ type: 'POST_SUCCESS' })
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
    dispatch({ type: "POST_FAILURE" });
    setError(true);
    setIsLoading(false);
  }
}

