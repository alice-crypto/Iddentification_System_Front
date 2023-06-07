import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Chip
} from "@material-ui/core";
import useStyles from "../../styles";

const states = {
  sent: "success",
  pending: "warning",
  declined: "secondary",
};

export default function TableComponent({ data }) {
  const classes = useStyles();
  var keys = Object.keys(data && data[0]).map(i => i.toUpperCase());
  keys.shift(); // delete "id" key

  return (
    <Table className="mb-0">
      <TableHead>
        <TableRow>
          {keys.map(key => (
            <TableCell key={key}>{key}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data && data.map(({ id, given_name, surname, date_of_birth, gender,Height, reward }) => (
          <TableRow key={id}>
            <TableCell className="pl-3 fw-normal">{given_name}</TableCell>
            <TableCell>{surname}</TableCell>
            <TableCell>{date_of_birth}</TableCell>
            <TableCell>{gender}</TableCell>
            <TableCell>{Height}</TableCell>
            <TableCell>{reward}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
