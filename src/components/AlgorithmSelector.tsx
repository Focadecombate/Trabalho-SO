import { Container, TextField, Button, makeStyles } from "@material-ui/core";
import { FormEvent, useState, ChangeEvent, useEffect } from "react";
import { Selector } from "./Selector";

interface Props {
  onSubmit(e: FormEvent): void;
  tempoChegada: [string, (value: string) => void];
  quantum: [string, (value: string) => void];
  deadline: [string, (value: string) => void];
  tempoExecucao: [string, (value: string) => void];
  priority: [string, (value: string) => void];
  sobrecargaDoSistema: [string, (value: string) => void];
  execute: (algo: string) => void;
  clear: () => void;
}

const useStyles = makeStyles(() => ({
  flex: {
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    padding: "3%",
    flexDirection: "column",
  },
  container: {
    padding: "5%",
    flexDirection: "column",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    width: "33%",
  },
  marginTop: {
    marginTop: "30px",
  },
}));

const algoritmos = ["SJF", "FIFO", "EDF", "Round-Robin", "Priority"];

export const AlgorithmSelector = ({
  onSubmit,
  deadline,
  quantum,
  tempoChegada,
  execute,
  tempoExecucao,
  sobrecargaDoSistema,
  priority,
  clear,
}: Props) => {
  const [algorithm, setAlgorithm] = useState("");
  const [showDeadline, setShowDeadline] = useState(false);
  const [showQuantum, setShowQuantum] = useState(false);
  const [showSobrecarga, setShowSobrecarga] = useState(false);
  const [showPriority, setShowPriority] = useState(false);

  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    setAlgorithm(event.target.value as string);
  };

  useEffect(() => {
    if (algorithm === "EDF") {
      setShowDeadline(true);
      setShowPriority(false);
      setShowQuantum(true);
      setShowSobrecarga(true);
      return;
    }
    if (algorithm === "Round-Robin") {
      setShowQuantum(true);
      setShowSobrecarga(true);
      setShowPriority(false);
      setShowDeadline(false);
      return;
    }
    if (algorithm === "Priority") {
      setShowQuantum(false);
      setShowSobrecarga(true);
      setShowDeadline(false);
      setShowPriority(true);
      return;
    }
    setShowPriority(false);
    setShowQuantum(false);
    setShowDeadline(false);
    setShowSobrecarga(false);
  }, [algorithm]);

  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Selector
        handleChange={handleChange}
        state={algorithm}
        label="Algoritmos"
        values={algoritmos}
      />
      {showSobrecarga && (
        <TextField
          name="Sobrecarga do Sistema"
          label="Sobrecarga do Sistema"
          variant="filled"
          value={sobrecargaDoSistema[0]}
          onChange={(event) => sobrecargaDoSistema[1](event.target.value)}
        />
      )}
      {showQuantum && (
        <TextField
          name="Quantum"
          label="Quantum"
          variant="filled"
          value={quantum[0]}
          onChange={(event) => quantum[1](event.target.value)}
        />
      )}

      <form className={classes.flex} onSubmit={onSubmit}>
        <TextField
          name="Tempo de Chegada"
          label="Tempo de Chegada"
          variant="filled"
          value={tempoChegada[0]}
          onChange={(event) => tempoChegada[1](event.target.value)}
        />
        <TextField
          name="Tempo de Execu????o"
          label="Tempo de Execu????o"
          variant="filled"
          value={tempoExecucao[0]}
          onChange={(event) => tempoExecucao[1](event.target.value)}
        />
        {showDeadline && (
          <TextField
            name="DeadLine"
            label="DeadLine"
            variant="filled"
            value={deadline[0]}
            onChange={(event) => deadline[1](event.target.value)}
          />
        )}
        {showPriority && (
          <TextField
            name="Prioridade"
            label="Prioridade"
            variant="filled"
            value={priority[0]}
            onChange={(event) => priority[1](event.target.value)}
          />
        )}

        <Button
          className={classes.marginTop}
          variant="contained"
          color="primary"
          type="submit"
          disabled={!algorithm}
        >
          Criar processo
        </Button>
      </form>

      <div className={classes.buttonContainer}>
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={() => execute(algorithm)}
        >
          Executar
        </Button>
        <Button
          type="button"
          variant="contained"
          color="secondary"
          onClick={() => clear()}
        >
          Limpar
        </Button>
      </div>
    </Container>
  );
};
