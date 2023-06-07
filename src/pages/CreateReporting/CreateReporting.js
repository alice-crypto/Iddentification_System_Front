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
  OutlinedInput,
  MenuItem
} from "@material-ui/core";
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import axios from 'axios';
import useStyles from "./styles";
import { newRegion, newBorought, newDepartment, newAuthority, newCommissariat } from "../../context/AvisContext";

export default function CreateReporting(props) {
  var [regionname, setRegionNameValue] = useState("");
  var [departmentname, setDepartmentNameValue] = useState("");
  var [arrondissementname, setArrondissentNameValue] = useState("");
  var [authorityname, setAuthorityNameValue] = useState("");
  var [commissariatname, setCommissariatNameValue] = useState("");



  const [place, setPlace_of_birth] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
        try{
            const response =await axios.get('http://127.0.0.1:8000/router/regions/');
            setPlace_of_birth(response.data);
        } catch(error) {
            console.error('Erreur lors du chargement des données :', error)
        }
    };
    fetchData();
  }, []);
  var [region, setPlaceofbirth] = useState(place.values.id=1);
  const handleSelectOptionChangeArrondissement = (event) => {
    setPlaceofbirth(event.target.value);
  }



  // comboBox
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(options.values.id=1);

  useEffect(() => {
    // Fonction pour charger les données de la base de données
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/router/departments/');
        setOptions(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    };
    fetchData();
  }, []);
  const handleSelectOptionChangeDepartement = (event) => {
    setSelectedOption(event.target.value);
  };

  // global
  var classes = useStyles();

  // local
  var [isLoading1, setIsLoading1] = useState(false);
  var [isLoading2, setIsLoading2] = useState(false);
  var [isLoading3, setIsLoading3] = useState(false);
  var [isLoading4, setIsLoading4] = useState(false);
  var [isLoading5, setIsLoading5] = useState(false);

  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);

  return (
    <>
    <PageTitle title="Module de Reporting" button={<Button
      variant="contained"
      size="medium"
      color="secondary"
    >
        voir la liste
    </Button>} />
      <Grid container spacing={4}>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Widget upperTitle bodyClass={classes.tableOverflow}>
          <div>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Nouvelle région" />
          </Tabs>
          {activeTabId === 0 && (
            <React.Fragment>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
                <OutlinedInput type="text" InputProps={{}} margin="normal" placeholder="Nomination" value={regionname} onChange={e => setRegionNameValue(e.target.value)} fullWidth required/><br/><br/>
                <div>
                  {isLoading1 ? (
                    <CircularProgress size={26} />
                  ) : (
                    <Button
                      disabled={
                        regionname.length === 0
                      }
                      onClick={()  => {
                        newRegion(
                            regionname,
                            setIsLoading1,
                            setError,
                          )
                        setRegionNameValue("")
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
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Widget upperTitle bodyClass={classes.tableOverflow}>
          <div>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Nouveau département" />
          </Tabs>
          {activeTabId === 0 && (
            <React.Fragment>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
                <OutlinedInput type="text" InputProps={{}} margin="normal" placeholder="Nomination" value={departmentname} onChange={e => setDepartmentNameValue(e.target.value)} fullWidth required/><br/><br/>
                <Select value={region} onChange={handleSelectOptionChangeDepartement} fullWidth required input={
                    <OutlinedInput/>
                  }>
                    {place.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.name}</MenuItem>
                    ))}
                </Select><br/><br/>
                <div>
                  {isLoading2 ? (
                    <CircularProgress size={26} />
                  ) : (
                    <Button
                      disabled={
                        departmentname.length === 0
                      }
                      onClick={()  => {
                    
                        newDepartment(
                            departmentname,
                            region,
                            setIsLoading2,
                            setError,
                          )
                        setDepartmentNameValue("")
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
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Widget upperTitle bodyClass={classes.tableOverflow}>
          <div>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Nouvel arrondissement" />
          </Tabs>
          {activeTabId === 0 && (
            <React.Fragment>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
                <OutlinedInput type="text" InputProps={{}} margin="normal" placeholder="Nomination" value={arrondissementname} onChange={e => setArrondissentNameValue(e.target.value)} fullWidth required/><br/><br/>
                <Select value={selectedOption} onChange={handleSelectOptionChangeArrondissement} fullWidth required input={
                    <OutlinedInput/>
                  }>
                    {options.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.name}</MenuItem>
                    ))}
                </Select><br/><br/>
                <div>
                  {isLoading3 ? (
                    <CircularProgress size={26} />
                  ) : (
                    <Button
                      disabled={
                        arrondissementname.length === 0
                      }
                      onClick={()  => {
                    
                        newBorought(
                            arrondissementname,
                            selectedOption,
                            setIsLoading3,
                            setError,
                          )
                        setArrondissentNameValue("")
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
      <Grid container spacing={4}>
        <Grid item lg={6} md={4} sm={6} xs={12}>
          <Widget upperTitle bodyClass={classes.tableOverflow}>
          <div>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Enregistrer une autre autorité des cartes" />
          </Tabs>
          {activeTabId === 0 && (
            <React.Fragment>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
                <OutlinedInput type="text" InputProps={{}} margin="normal" placeholder="Nom et prenom" value={authorityname} onChange={e => setAuthorityNameValue(e.target.value)} fullWidth required/><br/><br/>
                <div>
                  {isLoading4 ? (
                    <CircularProgress size={26} />
                  ) : (
                    <Button
                      disabled={
                        authorityname.length === 0
                      }
                      onClick={()  => {
                    
                        newAuthority(
                            authorityname,
                            setIsLoading4,
                            setError,
                          )
                        setAuthorityNameValue("")
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
        <Grid item lg={6} md={4} sm={6} xs={12}>
          <Widget upperTitle bodyClass={classes.tableOverflow}>
          <div>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Enregistrer un commissariat" />
          </Tabs>
          {activeTabId === 0 && (
            <React.Fragment>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
                <OutlinedInput type="text" InputProps={{}} margin="normal" placeholder="Nomination" value={commissariatname} onChange={e => setCommissariatNameValue(e.target.value)} fullWidth required/><br/><br/>
                <div>
                  {isLoading5 ? (
                    <CircularProgress size={26} />
                  ) : (
                    <Button
                      disabled={
                        commissariatname.length === 0
                      }
                      onClick={()  => {
                    
                        newCommissariat(
                            commissariatname,
                            setIsLoading5,
                            setError,
                          )
                        setCommissariatNameValue("")
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
