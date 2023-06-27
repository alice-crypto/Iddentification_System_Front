import React, { useState, useEffect } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  Fade,
  Select,
  Input,
  OutlinedInput,
  MenuItem
} from "@material-ui/core";
import { withRouter, useHistory } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import axios from 'axios';
import useStyles from "./styles";
import { newAvis } from "../../context/AvisContext";

export default function CreateAvis(props) {
  var [givenname, setGivenNameValue] = useState("");
  var [surname, setSurenameValue] = useState("");
  var [dateofbirth, setDateofbirth] = useState("");
  var [genre, setGenre] = useState("");
  var [height,setHeight] = useState("");
  var [photo, setPhoto] = useState(null);
  var [reward, setReward] = useState("");
  const handleOptionChange = (event) => {
    setGenre(event.target.value);
  };

  const [place, setPlace_of_birth] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
        try{
            const response =await axios.get('http://127.0.0.1:8000/router/boroughs/');
            setPlace_of_birth(response.data);
        } catch(error) {
            console.error('Erreur lors du chargement des données :', error)
        }
    };
    fetchData();
  }, []);
  var [placeofbirth, setPlaceofbirth] = useState(place.values.id=1);
  const handlePlaceOfBirthChange = (event) => {
    setPlaceofbirth(event.target.value);
  }

  // comboBox
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(options.values.id=1);

  useEffect(() => {
    // Fonction pour charger les données de la base de données
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/router/commissariat/');
        setOptions(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    };

    fetchData();
  }, []);

  const handleSelectOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const history = useHistory();
  var newfile;
  const handleFileChange = (e) => {
    const fichier = e.target.files[0];
    setPhoto(fichier);
    const reader = new FileReader();
    reader.onload = (event) => {
        // Accéder au contenu du fichier ici
        const fileContent = event.target.result;
        const base64Content = btoa(fileContent)

        console.log('Contenu du fichier :', base64Content);

        // Faites ce que vous voulez avec le contenu du fichier
    };
    reader.readAsBinaryString(fichier);
  };

  // global
  var classes = useStyles();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);

  return (
    <>
    <PageTitle title="Nouvel avis de recherche" button={<Button
      variant="contained"
      size="medium"
      color="secondary"
      onClick={() => props.history.push("/app/avis/listavis")}

    >
        voir la liste
    </Button>} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Widget upperTitle bodyClass={classes.tableOverflow}>
          <div>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Remplir le formulaire" />
          </Tabs>
          {activeTabId === 0 && (
            <React.Fragment>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
                <OutlinedInput type="text" InputProps={{}} margin="normal" placeholder="Given Name" value={givenname} onChange={e => setGivenNameValue(e.target.value)} fullWidth required/><br/><br/>
                <OutlinedInput type="text" InputProps={{}} margin="normal" placeholder="Surname" value={surname} onChange={e => setSurenameValue(e.target.value)} fullWidth required/><br/><br/>
                <OutlinedInput type="date" InputProps={{}} margin="normal" placeholder="Date of birth" value={dateofbirth} onChange={e => setDateofbirth(e.target.value)} fullWidth required/><br/><br/>
                <Select value={placeofbirth} onChange={handlePlaceOfBirthChange} fullWidth required input={
                    <OutlinedInput/>
                  }>
                     {place.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.name}
                    </MenuItem>
                    ))}
                </Select> <br/><br/>
                <Input type="radio" name="genre" value="1" checked={setGenre === '1'} onChange={handleOptionChange}/>
                <label for="Masculin">Masulin</label><br/><br/>
                <Input type="radio" name="genre" value="0" checked={setGenre === '0'} onChange={handleOptionChange}/>
                <label for="Feminin">Feminin</label><br/><br/>
                <OutlinedInput type="number" InputProps={{}} margin="normal" placeholder="Height" value={height} onChange={e=>setHeight(e.target.value)} fullWidth required/><br/><br/>
                <OutlinedInput type="file" margin="normal" onChange={handleFileChange} fullWidth required/><br/><br/>
                <OutlinedInput type="text" InputProps={{}} margin="normal" placeholder="Reward" value={reward} onChange={e => setReward(e.target.value)} fullWidth required/><br/><br/>
                <Select value={selectedOption} onChange={handleSelectOptionChange} fullWidth required input={
                    <OutlinedInput/>
                  }>
                    {options.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.name}</MenuItem>
                    ))}
                </Select>
                <br/><br/><br/>
                <div>
                  {isLoading ? (
                    <CircularProgress size={26} />
                  ) : (
                    <Button
                      disabled={
                        givenname.length === 0||reward.length === 0 ||selectedOption.length === 0
                      }
                      onClick={()  => {
                    
                        newAvis(
                            givenname,
                            surname,
                            dateofbirth,
                            placeofbirth,
                            genre,
                            height,
                            photo,
                            reward,
                            selectedOption,
                            props.history,
                            setIsLoading,
                            setError,
                          )
                      }
                
                      }
                      variant="contained"
                      color="primary"
                      size="large"
                      type="submit"
                    >
                      Envoyer
                    </Button>
                  )}
                </div>
            </React.Fragment>
          )}
        </div>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
