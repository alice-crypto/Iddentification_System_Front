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
  Chip
} from "@material-ui/core";
import * as Icons from "@material-ui/icons";
import Imagess from "./image/luffy.jpg"
import CameraIcon from "@material-ui/icons/PhotoCamera"
import useStyles from "./styles";
import logo from "./logo.svg";
import { withRouter } from "react-router-dom";


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
function genre(genres){
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
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function Album(props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async (event) => {
      event.preventDefault();
      try {
          const response = await axios.get('http://127.0.0.1:8000/router/wanted-poster/?search='+searchTerm);
          setCardValue(response.data);         
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    };
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [cardValue, setCardValue] = useState("");
    const fetchData = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/router/wanted-poster/');
          setCardValue(response.data);
        } catch (error) {
          console.error('Erreur lors du chargement des données :', error);
        }
      };
      useEffect(() => {
        fetchData();
      }, []);
  var classes = useStyles();
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
        {/* <img src={logo} alt="logo" className={classes.logotypeImage} /> */}
        <Button variant="text" color="primary" className={classes.identitybuttton} onClick={()=>{props.history.push("/Icard")}}><Icons.ArrowBackIosSharp/>Voir les cartes d'identités</Button>
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
            </Grid><br/><br/>
            <Typography variant="h3" align="center" className={classes.para} paragraph>
                Liste des Avis de recherches
            </Typography>
          </Container><br/><br/>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Rechercher par nom ou prénom"
            />
            <button type="submit">Rechercher</button>
          </form>
          {searchResults.map((result) => (
        <div key={result.id}>
            <p>{result.given_name} {result.surname}</p>
          </div>
        ))}
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
                      <b>Sexe:</b> {genre(gender)}
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
                                    <b>Sexe:</b> {genre(gender)}
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