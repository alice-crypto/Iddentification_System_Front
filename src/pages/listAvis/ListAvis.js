import React, {useState, useEffect} from "react";
import useStyles from "./styles";
import axios from "axios";
import Widget from "../../components/Widget";
import {Grid, Button} from "@material-ui/core";
import PageTitle from "../../components/PageTitle";
//import {Table} from "@material-ui/core";
import Table from "./component/Table/Table"
import {deleteAvis} from "./component/Table/ListAvisContext";

export default function ListAvis(props) {
    var [tablevalue, setTableValue] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response =await axios.get('http://127.0.0.1:8000/router/wanted-poster/');
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
    <PageTitle title="Liste de tous les Avis de Recherche" button={<Button
      variant="contained"
      size="medium"
      color="secondary"
      onClick={() => props.history.push("/app/avis/createavis")}
    >
        Créer un nouvel Avis
    </Button>} />
    <Grid item xs={12}>
          <Widget
            title="Support Requests"
            upperTitle
            noBodyPadding
            bodyClass={classes.tableWidget}
          >
            <Table data={tablevalue}  deleteAvis={deleteAvis} props={props}/>
          </Widget>
        </Grid>
    </>
  );
}
