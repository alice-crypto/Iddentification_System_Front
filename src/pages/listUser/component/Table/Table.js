import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Chip,
  Button
} from "@material-ui/core";
import * as Icons from "@material-ui/icons";
import useStyles from "../../styles";
import { See } from "./ListUserContext";

const states = {
  sent: "success",
  pending: "warning",
  declined: "secondary",
};
export default function TableComponent({ data, deleteUser, props}) {
  const classes = useStyles();  
  var keys = Object.keys(data && data[0]).map(i => i.toUpperCase());
  keys.shift(); // delete "id" key
  const [tableValue, setTableValue] = useState(data);
  //delete
  const handleDelete = (id) => {
    console.log('id :', id)
    deleteUser(id);
    console.log('tabValue :', tableValue)
    setTableValue(tableValue.filter(item => item.id !== id));
  };
  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/router/Users/register/');
      setTableValue(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Table className="mb-0">
      <TableHead>
        <TableRow>       
          <TableCell>
            USERNAME
          </TableCell>
          <TableCell>
            FIRSTNAME
          </TableCell>
          <TableCell>
            LASTNAME
          </TableCell>
          <TableCell>
            EMAIL
          </TableCell>
          <TableCell>
            PHONE
          </TableCell>
          <TableCell>
            ACTION
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tableValue && tableValue.map(({ id, username, first_name, last_name,email, phone }) => (
          <TableRow key={id}>
            <TableCell className="pl-3 fw-normal">{username}</TableCell>
            <TableCell>{first_name}</TableCell>
            <TableCell>{last_name}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>{phone}</TableCell>
            <TableCell>
              <Button className={classes.success} onClick={() => See(id, props.history)}><Icons.RemoveRedEyeSharp/></Button>{" "}
              <Button className={classes.warning}><Icons.Update/></Button>{" "} 
              <Button id="delete-button" className={classes.secondary} 
                onClick={() =>handleDelete(id)}><Icons.Delete/>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
