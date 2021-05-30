import { Container, TextField, Button, makeStyles } from "@material-ui/core";
import { FormEvent, useState, ChangeEvent, useEffect } from "react";
import { Selector } from "./selector";

interface Props {
  onSubmit(e: FormEvent): void;
  tempoChegada: [string, (value: string) => void];
  quantum: [string, (value: string) => void];
  deadline: [string, (value: string) => void];
  tempoExecucao: [string, (value: string) => void];
  sobrescricaoDoSistema: [string, (value: string) => void];
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
}));

const Algoritimos = ["SJF", "FIFO", "EDF", "Round-Robin"];

export const AlgorithmSelector = ({
  onSubmit,
  deadline,
  quantum,
  tempoChegada,
  execute,
  tempoExecucao,
  sobrescricaoDoSistema,
  clear,
}: Props) => {
  const [algorithm, setAlgorithm] = useState("");
  const [showDeadline, setShowDeadline] = useState(false);
  const [showQuantum, setShowQuantum] = useState(false);

  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    setAlgorithm(event.target.value as string);
  };

  useEffect(() => {
    if (algorithm === "EDF") {
      setShowDeadline(true);
      setShowQuantum(false);
      return;
    }
    if (algorithm === "Round-Robin") {
      setShowQuantum(true);
      setShowDeadline(false);
      return;
    }
    setShowQuantum(false);
    setShowDeadline(false);
  }, [algorithm]);

  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Selector
        handleChange={handleChange}
        state={algorithm}
        label="Algoritimos"
        values={Algoritimos}
      />
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
          name="Tempo de Execução"
          label="Tempo de Execução"
          variant="filled"
          value={tempoExecucao[0]}
          onChange={(event) => tempoExecucao[1](event.target.value)}
        />
        <TextField
          name="Sobrescrição do Sistema"
          label="Sobrescrição do Sistema"
          variant="filled"
          value={sobrescricaoDoSistema[0]}
          onChange={(event) => sobrescricaoDoSistema[1](event.target.value)}
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

        <Button type="submit">Criar processo</Button>
      </form>
      <div>
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
