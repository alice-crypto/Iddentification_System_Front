//import { createTheme, ThemeProvider } from '@mui/material/styles';

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  AppBar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Box,
  Toolbar,
  Typography,
  Container,
  Link,
  Modal,
  Dialog,
  Chip,
  OutlinedInput,
  Fade,
  Select,  
  MenuItem,
  Input,
  CircularProgress,  
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import * as Icons from "@material-ui/icons";
import CameraIcon from "@material-ui/icons/PhotoCamera"
import useStyles from "./styles";
import logo from "./logo.svg";
import { withRouter, useHistory } from "react-router-dom";
import {newfrontCard } from "../../context/AvisContext";
//import {Stack} from "@material-ui/core/"
//import {createTheme, ThemeProvider} from '@material-ui/styles'
import {createTheme, ThemeProvider} from '@material-ui/core/styles'


const style = {
  position : 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function loginUser(history){
    history.push("/login");
}
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
function genr(genres){
    if(genres=0){
        return("Feminin")
    }else{
        return("Masculin")
    }
}
function Actif(isActive){
    if(isActive=true){
        return("Disparu")
    }else{
        return("Retrouvé")
    }
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function Album(props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    var [givenname, setGivenNameValue] = useState("");
    var [surname, setSurenameValue] = useState("");
    var [dateofbirth, setDateofbirth] = useState("");
    var [genre, setGenre] = useState("");
    var [height,setHeight] = useState("");
    var [photo, setPhoto] = useState(null);
    var [reward, setReward] = useState("");
    var [identity_number,setIdentityNumber] = useState("")
    var [deliverance_date,setDeliveranceDate] = useState("");
    var [expired_date, setExpiredDate] = useState("");
    var [phone, setphone] = useState("");
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
          const response = await axios.get('http://127.0.0.1:8000/router/authorities/');
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

    const handleSearch = async (event) => {
      event.preventDefault();
      try {
          const response = await axios.get('http://127.0.0.1:8000/router/identity-cards/?search='+searchTerm);
          setCardValue(response.data);         
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    };
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
    const [isOpen, setIsOpen] = useState(false);

    const openPopup = () => {
      setIsOpen(true);
    };
    const closePopup = () => {
      setIsOpen(false);
    };
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [cardValue, setCardValue] = useState("");
    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/router/identity-cards/');
            setCardValue(response.data);        
        } catch (error) {
          console.error('Erreur lors du chargement des données :', error);
        }
      };
      useEffect(() => {
        fetchData();
      }, []);
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
        {/* <img src={logo} alt="logo" className={classes.logotypeImage} /> */}
          <Button variant="text" color="primary" className={classes.identitybuttton} onClick={()=>{props.history.push("")}}><Icons.ArrowBackIosSharp/> Voir les Avis de recherche</Button>
          
          <Typography variant="h6" align="center" className={classes.listepara} justifyContent="center">
            Liste des cartes d'identités égarées
          </Typography>
          <div className={classes.addbutton}>            
            <Grid
            spacing={2}
            direction="row"
            justifyContent="center"
            container>
              <Grid item>
                <Button type="submit" variant="text" className={classes.ajouterbutton} onClick={openPopup}>Ajouter{" "}<Icons.Add/></Button>
                <Dialog open={isOpen} onClose={closePopup}>
                  <DialogTitle>
                    <Button onClick={closePopup} aria-label="close" edge="end" color="inherit"><Icons.Close/></Button>
                  </DialogTitle>
                  <DialogContent>
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
                        <OutlinedInput type="text" InputProps={{}} margin="normal" placeholder="Identity_number" value={identity_number} onChange={e => setIdentityNumber(e.target.value)} fullWidth required/><br/><br/>
                        <OutlinedInput type="date" InputProps={{}} margin="normal" placeholder="Deliverance date" value={deliverance_date} onChange={e => setDeliveranceDate(e.target.value)} fullWidth required/><br/><br/>
                        <OutlinedInput type="date" InputProps={{}} margin="normal" placeholder="Expire date" value={expired_date} onChange={e => setExpiredDate(e.target.value)} fullWidth required/><br/><br/>
                        <OutlinedInput type="phone" InputProps={{}} margin="normal" placeholder="Poster phone number" value={phone} onChange={e => setphone(e.target.value)} fullWidth required/><br/><br/>
                        <OutlinedInput type="file" margin="normal" onChange={handleFileChange} fullWidth required/><br/><br/>
                        <Select value={selectedOption} onChange={handleSelectOptionChange} fullWidth required input={
                            <OutlinedInput/>
                          }>
                            {options.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}</MenuItem>
                            ))}
                        </Select><br/><br/>
                        <OutlinedInput type="text" InputProps={{}} margin="normal" placeholder="Reward" value={reward} onChange={e => setReward(e.target.value)} fullWidth required/><br/><br/>
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
                            
                                newfrontCard(
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
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={closePopup}>Fermer</Button>
                  </DialogActions>
                </Dialog>
              </Grid>
              <Grid item>
                <form onSubmit={handleSearch}>
                  <OutlinedInput
                    type="text"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Rechercher"
                  />
                  <Button type="submit" variant="text" className={classes.searchbutton}><Icons.SearchTwoTone/></Button>
                </form>
              </Grid>
            </Grid>
          </div>          
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.logotypeContainer}>
        <Box
          sx={{
            // bgcolor: 'background.paper',
            pt: 15,
          }}
        >
          <Container maxWidth="md">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              gutterBottom
              className={classes.paraa}
            >
              National Research System
            </Typography>
            <Typography variant="h5" align="center" className={classes.para} paragraph>
              La plateforme est là pour vous aider à retrouver des personnes recherchées, ou des cartes d'identités égarées.
              Il vous suffit de poster, et si une personne la retrouve, elle nous la fera parvenir, et nous vous contacterons.
            </Typography>
            <Grid
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
              container
            >
            <Grid item>
              <Button variant="contained" className={classes.loginbutton} onClick={()=>props.history.push("/login")}>Login<Icons.ArrowForward/></Button>
              </Grid>
            </Grid><br/>
          </Container>

        </Box>
        </div><br/><br/>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cardValue && cardValue.map(({ id, given_name, surname, date_of_birth, gender,Height, reward, photos, isActive, PostedDate }) => (
              <Grid item key={id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '60%',
                    }}
                    // image="http://localhost:8000/None/back_et_front.png"
                  />
                  {/* <img src="http://localhost:8000/None/back_et_front.png" width='100%' height='50%'/> */}
                  <img src={photos} width='100%' height='160'/>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {reward}{" "} FCFA
                    </Typography>
                    <Typography>
                      <b>Nom:</b> {given_name}{" "}{surname}
                    </Typography>
                    <Typography>
                      <b>Sexe:</b> {genr(gender)}
                    </Typography>
                    <Typography>
                      <b>Taille:</b> {Height} m
                    </Typography>
                    <Typography>
                      <b>Née le:</b> {date_of_birth}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" className={classes.success} onClick={handleOpen}><Icons.RemoveRedEyeSharp /></Button>
                    <Button size="small" className={classes.warning}><Icons.Update/></Button>
                  </CardActions>
                </Card>
                <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description">
                    <Box sx={{...style, width:400}}>
                            <h2>Avis de recherche</h2>
                            <p>
                                <img src={photos} width='100%' height='200'/>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {reward}{" "} FCFA
                                </Typography>
                                <Typography>
                                    <b>Nom:</b> {given_name}{" "}{surname}
                                </Typography>
                                <Typography>
                                    <b>Sexe:</b> {genr(gender)}
                                </Typography>
                                <Typography>
                                    <b>Taille:</b> {Height} m
                                </Typography>
                                <Typography>
                                    <b>Née le:</b> {date_of_birth}
                                </Typography>
                                <Typography>
                                    <b>Posté le:</b> {PostedDate}
                                </Typography><br/>
                                <Typography>
                                    <Chip label={Actif(isActive)} style={{background:"#009160"}}></Chip>
                                </Typography><br/>
                                <Typography variant="h6">
                                    Si vous avez des informations, contactez nous au 6XX.XX.XX.XX.
                                </Typography>                     
                            </p>
                    </Box>
                </Modal>
              </Grid>
            )
            )
            }
          </Grid>
        </Container>
      </main>
      <br/><br/>
      {/* Footer */}
      <Box 
        sx={{ bgcolor: 'background.paper', p: 6 }} className={classes.footer}
        component="footer">
        <Typography variant="h6" align="center" gutterBottom>
        NRS<br/>
        National Research System
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Plateforme réalisée à PSE-Consulting, dans le cadre d'un stage professionnel, en vue d'un diplôme d'ingenieur.
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
export default withRouter(Album);