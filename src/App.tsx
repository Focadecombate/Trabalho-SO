import { Container, makeStyles } from "@material-ui/core";
import React, { useState, FormEvent } from "react";
import { Process } from "./@types";
import Chart from "react-google-charts";
import { fifo } from "./algorithms/fifo";
import { AlgorithmSelector } from "./components/select";
import ProcessTable from "./components/processTable";

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

  const tempoChegada = useState("");
  const tempoExecucao = useState("");
  const deadLine = useState("");
  const sobrecargaDoSistema = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setProcessos([
      ...processos,
      {
        tempoChegada: parseFloat(tempoChegada[0]),
        tempoExecucao: parseFloat(tempoExecucao[0]),
      },
    ]);

    console.log(processos);
  }

  function callFIFO() {
    setGanttProcess(fifo(processos));

    console.log(ganttProcess);
  }

  return (
    <div className={classes.flex}>
      <Container>
        <AlgorithmSelector
          callFifo={callFIFO}
          onSubmit={onSubmit}
          deadline={deadLine}
          sobrecargaDoSistema={sobrecargaDoSistema}
          tempoChegada={tempoChegada}
          tempoExecucao={tempoExecucao}
        />
        {processos.length > 0 && <ProcessTable process={processos} />}
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
    </div>
  );
}

export default App;
