import React, { useState, useEffect  } from "react";
import { Grid } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";

// styles
import "react-toastify/dist/ReactToastify.css";
import useStyles from "./styles";

// components
import Widget from "../../components/Widget/Widget";
import PageTitle from "../../components/PageTitle/PageTitle";
import Notification from "../../components/Notification";
import {useLocation} from 'react-router-dom';
import axios from "axios";


export default function SeeAvis(props) {
  var classes = useStyles(); 
  const [tableValue, setTableValue] = useState();
  var [givenname, setGivenNameValue] = useState("");
  var [surname, setSurenameValue] = useState("");
  var [dateofbirth, setDateofbirth] = useState("");
  var [genre, setGenre] = useState("");
  var [height,setHeight] = useState("");
  var [photo, setPhoto] = useState(null);
  var [reward, setReward] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  useEffect(() => {
    const fetchData = async () => {
        try{
            const response =await axios.get('http://127.0.0.1:8000/router/wanted-poster/'+searchParams.get('id')+'/');
            setGivenNameValue(response.data.given_name);
            setSurenameValue(response.data.surname);
            setDateofbirth(response.data.date_of_birth)
            setGenre(response.data.gender)
            setHeight(response.data.Height)
            setPhoto(response.data.photos)
            setReward(response.data.reward)
            console.log(response.data.given_name)
        } catch(error) {
            console.error('Erreur lors du chargement des données :', error)
        }
    };
    fetchData();
  }, []);

  return (
    <>
      <PageTitle title="Détail de l'avis de recherche" />
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Widget title="Recherche" disableWidgetMenu>
          <img src={photo} width='100%'/>
            <Notification
              className={classes.notificationItem}
              type="feedback"
              message={givenname}
              variant="rounded"
              color="success"
            />
            <Notification
              className={classes.notificationItem}
              type="feedback"
              message={surname}
              variant="rounded"
              color="success"
            />
            <Notification
              className={classes.notificationItem}
              type="feedback"
              message={dateofbirth}
              variant="rounded"
              color="success"
            />
            <Notification
              className={classes.notificationItem}
              type="feedback"
              message={genre}
              variant="rounded"
              color="success"
            />
            <Notification
              className={classes.notificationItem}
              type="feedback"
              message={height}
              variant="rounded"
              color="success"
            />
            <Notification
              className={classes.notificationItem}
              type="feedback"
              message={reward}
              variant="rounded"
              color="success"
            />
          </Widget>
        </Grid>
      </Grid>
    </>
  );

}
