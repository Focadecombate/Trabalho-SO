import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Process } from "../@types";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  root: {
    margin: "2%",
  },
});

interface Props {
  process: Process[];
}

export default function ProcessTable({ process }: Props) {
  const classes = useStyles();

  return (
    <TableContainer className={classes.root} component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Ordem de Chegada</TableCell>
            <TableCell align="right">Tempo de Chegada</TableCell>
            <TableCell align="right">Tempo de Execução</TableCell>
            <TableCell align="right">Deadline</TableCell>
            <TableCell align="right">Sobrecarga do sistema</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {process.map((row, index) => (
            <TableRow key={row.tempoChegada}>
              <TableCell component="th" scope="row">
                {index}
              </TableCell>
              <TableCell align="right">{row.tempoChegada}</TableCell>
              <TableCell align="right">{row.tempoExecucao}</TableCell>
              <TableCell align="right">{row.deadLine ?? 0}</TableCell>
              <TableCell align="right">
                {row.sobrecargaDoSistema ?? 0}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
