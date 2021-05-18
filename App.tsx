import { Container, makeStyles, TextField } from "@material-ui/core";
import { useState } from "react";

const useStyles = makeStyles(() => ({
  flex: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    alignItems: "stretch",
  },
}));

function App() {
  const classes = useStyles();
  const [TempoDeChegada, setTempoDeChegada] = useState(0);
  const [TempoDeExecucao, setTempoDeExecucao] = useState(0);
  const [DeadLine, setDeadLine] = useState(0);
  const [Prioridade, setPrioridade] = useState(0);
  const [SobrecargaDoSistema, setSobrecargaDoSistema] = useState(0);
  return (
    <div>
      <Container className={classes.flex} maxWidth="lg">
        <TextField
          name="Tempo de Chegada"
          label="Tempo de Chegada"
          variant="filled"
          value={TempoDeChegada}
          onChange={(event) =>
            setTempoDeChegada(parseFloat(event.target.value))
          }
        />
        <TextField
          name="Tempo de Execução"
          label="Tempo de Execução"
          variant="filled"
          value={TempoDeExecucao}
          onChange={(event) =>
            setTempoDeExecucao(parseFloat(event.target.value))
          }
        />
        <TextField
          name="DeadLine"
          label="DeadLine"
          variant="filled"
          value={DeadLine}
          onChange={(event) => setDeadLine(parseFloat(event.target.value))}
        />
        <TextField
          name="Prioridade"
          label="Prioridade"
          variant="filled"
          value={Prioridade}
          onChange={(event) => setPrioridade(parseFloat(event.target.value))}
        />
        <TextField
          name="Sobrecarga do sistema"
          label="Sobrecarga do sistema"
          variant="filled"
          value={SobrecargaDoSistema}
          onChange={(event) =>
            setSobrecargaDoSistema(parseFloat(event.target.value))
          }
        />
      </Container>
    </div>
  );
}

export default App;
