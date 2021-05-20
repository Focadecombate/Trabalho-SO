import { Button, Container, makeStyles, TextField } from "@material-ui/core";
import { useState, FormEvent } from "react";
import { Process } from "./@types";
import Chart from "react-google-charts";
import { fifo } from "./algorithms/fifo";

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
  const [ganttProcess, setGanttProcess] = useState<any[]>([]);

  const [tempoDeChegada, setTempoDeChegada] = useState("");
  const [tempoDeExecucao, setTempoDeExecucao] = useState("");
  const [deadLine, setDeadLine] = useState("");
  const [prioridade, setPrioridade] = useState("");
  const [sobrecargaDoSistema, setSobrecargaDoSistema] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setProcessos([
      ...processos,
      {
        tempoEntrada: parseFloat(tempoDeChegada),
        tempoExec: parseFloat(tempoDeExecucao),
      },
    ]);

    console.log(processos);
  }

  function callFIFO() {
    setGanttProcess(fifo(processos));

    console.log(ganttProcess);
  }

  return (
    <>
      <Container>
        <form onSubmit={onSubmit}>
          <TextField
            name="Tempo de Chegada"
            label="Tempo de Chegada"
            variant="filled"
            value={tempoDeChegada}
            onChange={(event) => setTempoDeChegada(event.target.value)}
          />
          <TextField
            name="Tempo de Execução"
            label="Tempo de Execução"
            variant="filled"
            value={tempoDeExecucao}
            onChange={(event) => setTempoDeExecucao(event.target.value)}
          />
          <TextField
            name="DeadLine"
            label="DeadLine"
            variant="filled"
            value={deadLine}
            onChange={(event) => setDeadLine(event.target.value)}
          />
          <TextField
            name="Prioridade"
            label="Prioridade"
            variant="filled"
            value={prioridade}
            onChange={(event) => setPrioridade(event.target.value)}
          />
          <TextField
            name="Sobrecarga do sistema"
            label="Sobrecarga do sistema"
            variant="filled"
            value={sobrecargaDoSistema}
            onChange={(event) => setSobrecargaDoSistema(event.target.value)}
          />
          <Button type="submit">Criar processo</Button>
        </form>

        <Button type="button" onClick={callFIFO}>
          Executar fifo
        </Button>
      </Container>

      {!!ganttProcess.length && (
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
            ...ganttProcess,
          ]}
          options={{
            height: 400,
            gantt: {
              trackHeight: 30,
            },
          }}
          rootProps={{ "data-testid": "2" }}
        />
      )}
    </>
  );
}

export default App;
