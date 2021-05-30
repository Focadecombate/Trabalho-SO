import { Container, makeStyles, Typography } from "@material-ui/core";
import React, { useState, FormEvent } from "react";
import { Process } from "./@types";
import Chart from "react-google-charts";
import { fifo } from "./algorithms/fifo";
import { AlgorithmSelector } from "./components/select";
import ProcessTable from "./components/processTable";
import { sjf } from "./algorithms/sjf";
import { roundRobin } from "./algorithms/round-robin";
import { edf } from "./algorithms/edf";

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
  const [turnRound, setTurnRound] = useState(0);
  const tempoExecucao = useState("");
  const deadLine = useState("");
  const sobrescricaoDoSistema = useState("");
  const quantum = useState("");

  const execute = (algo: string) => {
    switch (algo) {
      case "FIFO":
        const { process: fifoProcess, turnround: fifoTurnRound } =
          fifo(processos);

        setGanttProcess(fifoProcess);
        setTurnRound(fifoTurnRound / fifoProcess.length);
        break;
      case "SJF":
        const { process: sjfProcessos, turnround: sjfTurnRound } =
          sjf(processos);
        setGanttProcess(sjfProcessos);
        setTurnRound(sjfTurnRound / sjfProcessos.length);
        break;
      case "EDF":
        const { process: EDFprocess, turnround: EDFturnround } = edf(processos);
        setGanttProcess(EDFprocess);
        setTurnRound(EDFturnround / EDFprocess.length);
        break;
      case "Round-Robin":
        const { process: RRProcess, turnround: RRTurnRound } = roundRobin(
          parseInt(quantum[0], 10),
          processos
        );
        setGanttProcess(RRProcess);
        setTurnRound(RRTurnRound / RRProcess.length);
        break;
      default:
        const { process: defaultProcess, turnround: defaultTurnRound } =
          fifo(processos);
        setGanttProcess(defaultProcess);
        setTurnRound(defaultTurnRound / defaultProcess.length);
        break;
    }
  };

  const clearProcess = () => {
    setProcessos([]);
    setGanttProcess([]);
  };

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const parsedDeadLine = parseInt(deadLine[0]);

    setProcessos([
      ...processos,
      {
        tempoChegada: parseInt(tempoChegada[0]),
        tempoExecucao: parseInt(tempoExecucao[0]),
        deadLine: !isNaN(parsedDeadLine) ? parsedDeadLine : 0,
      },
    ]);
  }

  return (
    <div className={classes.flex}>
      <Container>
        <AlgorithmSelector
          execute={execute}
          onSubmit={onSubmit}
          deadline={deadLine}
          quantum={quantum}
          tempoChegada={tempoChegada}
          tempoExecucao={tempoExecucao}
          sobrescricaoDoSistema={sobrescricaoDoSistema}
          clear={clearProcess}
        />
        <Typography variant="h5">Turnround:{turnRound}</Typography>
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
