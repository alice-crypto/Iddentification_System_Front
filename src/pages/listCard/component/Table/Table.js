import React, { useState, useEffect } from "react";
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
import { See, UpdateCard } from "./ListCardContext";
import axios from "axios";
import { Update } from "../../../listAvis/component/Table/ListAvisContext";


const states = {
  sent: "success",
  pending: "warning",
  declined: "secondary",
};
export default function TableComponent({ data , deleteCard, props }) {
  const classes = useStyles();
  var keys = Object.keys(data && data[0]).map(i => i.toUpperCase());
  keys.shift(); // delete "id" key
  const [tableValue, setTableValue] = useState(data);
  //delete
  const handleDelete = (id) => {
    deleteCard(id);
    setTableValue(tableValue.filter(item => item.id !== id));
  };
  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/router/identity-cards/');
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
            GIVEN_NAME
          </TableCell>
          <TableCell>
            SURNAME
          </TableCell>
          <TableCell>
            DATE 0F BIRTH
          </TableCell>
          <TableCell>
            GENDER
          </TableCell>
          <TableCell>
            HEIGHT
          </TableCell>
          <TableCell>
            REWARD
          </TableCell>
          <TableCell>
            Poster Phone number
          </TableCell>
          <TableCell>
            Identity number
          </TableCell>
          <TableCell>
            ACTION
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tableValue && tableValue.map(({ id, given_name, surname, date_of_birth, gender,Height, reward, posted_phone_number, identity_number}) => (
          <TableRow key={id}>
            <TableCell className="pl-3 fw-normal">{given_name}</TableCell>
            <TableCell>{surname}</TableCell>
            <TableCell>{date_of_birth}</TableCell>
            <TableCell>{gender}</TableCell>
            <TableCell>{Height}</TableCell>
            <TableCell>{reward}</TableCell>
            <TableCell>{posted_phone_number}</TableCell>
            <TableCell>{identity_number}</TableCell>
            <TableCell>
              <Button className={classes.success} onClick={() => See(id, props.history)}><Icons.RemoveRedEyeSharp/></Button>{" "}
              <Button className={classes.warning} onClick={() => UpdateCard(id, props.history)}><Icons.Update/></Button>{" "}
              <Button className={classes.secondary} 
                onClick={() =>handleDelete(id)}><Icons.Delete/></Button>{" "}
              <Button className={classes.success}><Icons.Check/></Button>{" "} 
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
