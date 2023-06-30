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
import { createUser } from "../../context/AvisContext";



export default function CreateUser(props) {
  var [username, setUsername] = useState("");
  var [password, setPassword] = useState("");
  var [firstname, setFirstname] = useState("");
  var [lastname, setLastname] = useState("");
  var [email,setEmail] = useState("");
  var [phone, setPhone] = useState("");


  // global
  var classes = useStyles();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);

  return (
    <>
    <PageTitle title="Créer un nouvel utilisateur" button={<Button
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
                <OutlinedInput type="text" InputProps={{}} margin="normal" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} fullWidth required/><br/><br/>
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
                        username.length === 0||password.length === 0 ||firstname.length === 0||lastname.length ===0||email.length===0||phone.length===0
                      }
                      onClick={()  => {
                    
                        createUser(
                            username,
                            password,
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
