import { Container, TextField, Button, makeStyles } from "@material-ui/core";
import React, { FormEvent } from "react";
import { Selector } from "./selector";

interface Props {
  onSubmit(e: FormEvent): void;
  tempoChegada: [string, (value: string) => void];
  sobrecargaDoSistema: [string, (value: string) => void];
  deadline: [string, (value: string) => void];
  tempoExecucao: [string, (value: string) => void];
  callFifo: () => void;
}

const useStyles = makeStyles(() => ({
  flex: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    padding: "2%",
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Algoritimos = ["SJF", "FIFO", "EDF", "Round-Robin"];

export const AlgorithmSelector = ({
  onSubmit,
  deadline,
  sobrecargaDoSistema,
  tempoChegada,
  callFifo,
  tempoExecucao,
}: Props) => {
  const [algorithm, setAlgorithm] = React.useState("");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAlgorithm(event.target.value as string);
  };
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <form className={classes.flex} onSubmit={onSubmit}>
        <TextField
          name="Tempo de Chegada"
          label="Tempo de Chegada"
          variant="filled"
          value={tempoChegada[0]}
          onChange={(event) => tempoChegada[1](event.target.value)}
        />
        <TextField
          name="Tempo de Execução"
          label="Tempo de Execução"
          variant="filled"
          value={tempoExecucao[0]}
          onChange={(event) => tempoExecucao[1](event.target.value)}
        />
        <TextField
          name="DeadLine"
          label="DeadLine"
          variant="filled"
          value={deadline[0]}
          onChange={(event) => deadline[1](event.target.value)}
        />
        <TextField
          name="Sobrecarga do sistema"
          label="Sobrecarga do sistema"
          variant="filled"
          value={sobrecargaDoSistema[0]}
          onChange={(event) => sobrecargaDoSistema[1](event.target.value)}
        />
        <Button type="submit">Criar processo</Button>
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={callFifo}
        >
          Executar
        </Button>
      </form>
      <Selector
        handleChange={handleChange}
        state={algorithm}
        label="Algoritimos"
        values={Algoritimos}
      />
    </Container>
  );
};
