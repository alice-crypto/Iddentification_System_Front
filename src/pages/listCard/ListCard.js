import React, {useState, useEffect} from "react";
import useStyles from "./styles";
import axios from "axios";
import Widget from "../../components/Widget";
import {Grid, Button} from "@material-ui/core";
import PageTitle from "../../components/PageTitle";
//import {Table} from "@material-ui/core";
import Table from "./component/Table/Table"
import {deleteCard} from "./component/Table/ListCardContext";

export default function ListCard(props) {
    var [tablevalue, setTableValue] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response =await axios.get('http://127.0.0.1:8000/router/identity-cards/');
                setTableValue(response.data);
            } catch(error) {
                console.error('Erreur lors du chargement des données :', error)
            }
        };
        fetchData();
    }, []);
  const classes = useStyles();

  return (
    <>
    <PageTitle title="Liste de toutes les cartes égarées" button={<Button
      variant="contained"
      size="medium"
      color="secondary"
      onClick={() => props.history.push("/app/card/createcard")}
    >
        Poster une nouvelle Carte
    </Button>} />
    <Grid item xs={12}>
          <Widget
            title="Support Requests"
            upperTitle
            noBodyPadding
            bodyClass={classes.tableWidget}
          >
            <Table data={tablevalue}  deleteCard={deleteCard} props={props}/>
          </Widget>
        </Grid>
    </>
  );
}
