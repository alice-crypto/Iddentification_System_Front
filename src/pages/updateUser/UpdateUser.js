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
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import useStyles from "./styles";
import { createUser, updateUser } from "../../context/AvisContext";
import axios from "axios";
import { useLocation } from "react-router-dom";



export default function UpdateUser(props) {
  var [username, setUsername] = useState("");
  var [password, setPassword] = useState("");
  var [firstname, setFirstname] = useState("");
  var [lastname, setLastname] = useState("");
  var [email,setEmail] = useState("");
  var [phone, setPhone] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [user, setUser] = useState(null)


  // global
  var classes = useStyles();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);

  useEffect(() => {
    loadUserById()
  },[])

  const loadUserById = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/router/Users/register/'+searchParams.get('id')+'/');
      setEmail(response.data.email)
      setUsername(response.data.username)
      setFirstname(response.data.first_name)
      setPhone(response.data.phone)
      setLastname(response.data.last_name)
      setUser(response.data)
      // setEmail(response.data.email)
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
  }

  return (
    <>
      <PageTitle title="Editer un utilisateur" button={<Button
        variant="contained"
        size="medium"
        color="secondary"
        onClick={() => props.history.push("/app/user/listuser")}
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
                  <OutlinedInput type="text" InputProps={{}} margin="normal" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} fullWidth required/><br/><br/>
                  {/*<OutlinedInput type="text" InputProps={{}} margin="normal" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} fullWidth required/><br/><br/>*/}
                  <OutlinedInput type="text" InputProps={{}} margin="normal" placeholder="First Name" value={firstname} onChange={e => setFirstname(e.target.value)} fullWidth required/><br/><br/>
                  <OutlinedInput type="text" InputProps={{}} margin="normal" placeholder="Last Name" value={lastname} onChange={e => setLastname(e.target.value)} fullWidth required/><br/><br/>
                  <OutlinedInput type="text" InputProps={{}} margin="normal" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} fullWidth required/><br/><br/>
                  <OutlinedInput type="text" InputProps={{}} margin="normal" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} fullWidth required/><br/><br/>
                  <br/><br/><br/>
                  <div>
                    {isLoading ? (
                      <CircularProgress size={26} />
                    ) : (
                      <Button
                        disabled={
                          username.length === 0 ||firstname.length === 0||lastname.length ===0||email.length===0||phone.length===0
                        }
                        onClick={()  => {

                          updateUser(
                            user.id,
                            username,
                            firstname,
                            lastname,
                            email,
                            phone,
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
