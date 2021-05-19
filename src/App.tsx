import { Button, Container, makeStyles, TextField } from "@material-ui/core";
import { useState, FormEvent } from "react";
import { Process } from "./@types";
import Chart from "react-google-charts";

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

  const [processos, setProcessos] = useState<Process[]>([]);

  const [tempoDeChegada, setTempoDeChegada] = useState(0);
  const [tempoDeExecucao, setTempoDeExecucao] = useState(0);
  const [deadLine, setDeadLine] = useState(0);
  const [prioridade, setPrioridade] = useState(0);
  const [sobrecargaDoSistema, setSobrecargaDoSistema] = useState(0);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setProcessos([
      ...processos,
      { tempoEntrada: tempoDeChegada, tempoExec: tempoDeExecucao },
    ]);

    console.log(processos);
  }

  return (
    <>
      <Container className={classes.flex} maxWidth="lg">
        <form onSubmit={onSubmit}>
          <TextField
            name="Tempo de Chegada"
            label="Tempo de Chegada"
            variant="filled"
            value={tempoDeChegada}
            onChange={(event) =>
              setTempoDeChegada(parseFloat(event.target.value))
            }
          />
          <TextField
            name="Tempo de Execução"
            label="Tempo de Execução"
            variant="filled"
            value={tempoDeExecucao}
            onChange={(event) =>
              setTempoDeExecucao(parseFloat(event.target.value))
            }
          />
          <TextField
            name="DeadLine"
            label="DeadLine"
            variant="filled"
            value={deadLine}
            onChange={(event) => setDeadLine(parseFloat(event.target.value))}
          />
          <TextField
            name="Prioridade"
            label="Prioridade"
            variant="filled"
            value={prioridade}
            onChange={(event) => setPrioridade(parseFloat(event.target.value))}
          />
          <TextField
            name="Sobrecarga do sistema"
            label="Sobrecarga do sistema"
            variant="filled"
            value={sobrecargaDoSistema}
            onChange={(event) =>
              setSobrecargaDoSistema(parseFloat(event.target.value))
            }
          />
          <Button type="submit">Criar processo</Button>
        </form>
      </Container>

      <Chart
        width={"100%"}
        height={"400px"}
        chartType="Gantt"
        loader={<div>Loading Chart</div>}
        data={[
          [
            { type: "string", label: "Task ID" },
            { type: "string", label: "Task Name" },
            { type: "date", label: "Start Date" },
            { type: "date", label: "End Date" },
            { type: "number", label: "Duration" },
            { type: "number", label: "Percent Complete" },
            { type: "string", label: "Dependencies" },
          ],
          [
            "task1",
            "task1",
            new Date(2014, 5, 20, 1, 1, 1, 1),
            new Date(2014, 5, 20, 1, 1, 1, 2),
            null,
            100,
            null,
          ],
          [
            "task2",
            "task2",
            new Date(2014, 5, 20, 1, 1, 1, 2),
            new Date(2014, 5, 20, 1, 1, 1, 3),
            null,
            100,
            null,
          ],
        ]}
        options={{
          height: 400,
          gantt: {
            trackHeight: 30,
          },
        }}
        rootProps={{ "data-testid": "2" }}
      />
    </>
  );
}

export default App;
