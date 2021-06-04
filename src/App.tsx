import { Container, makeStyles, Typography } from "@material-ui/core";
import React, { useState, FormEvent } from "react";
import { GanttArray, Process } from "./@types";
import Chart from "react-google-charts";
import { fifo } from "./algorithms/fifo";
import { AlgorithmSelector } from "./components/AlgorithmSelector";
import ProcessTable from "./components/ProcessTable";
import { sjf } from "./algorithms/sjf";
import { roundRobin } from "./algorithms/round-robin";
import { edf } from "./algorithms/edf";
import { priority as priorityAlgo } from "./algorithms/priority";

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
  const [ganttProcess, setGanttProcess] = useState<GanttArray[]>([]);

  const tempoChegada = useState("0");
  const [turnRound, setTurnRound] = useState(0);

  const tempoExecucao = useState("0");
  const priority = useState("");
  const deadLine = useState("");
  const sobrecargaDoSistema = useState("0");
  const quantum = useState("");

  const execute = (algo: string) => {
    const sobrecarga = parseInt(sobrecargaDoSistema[0], 10);
    setGanttProcess([]);
    switch (algo) {
      case "FIFO":
        const { process: fifoProcess, turnround: fifoTurnRound } =
          fifo(processos);

        setGanttProcess(fifoProcess);
        setTurnRound(fifoTurnRound / processos.length);
        break;
      case "SJF":
        const { process: sjfProcessos, turnround: sjfTurnRound } =
          sjf(processos);
        setGanttProcess(sjfProcessos);
        setTurnRound(sjfTurnRound / processos.length);
        break;
      case "Priority":
        const { process: priorityProcessos, turnround: priorityTurnRound } =
          priorityAlgo(processos, sobrecarga);
        setGanttProcess(priorityProcessos);
        setTurnRound(priorityTurnRound / processos.length);
        break;
      case "EDF":
        const { process: EDProcess, turnround: EDTurnround } = edf(
          parseInt(quantum[0]),
          processos,
          sobrecarga
        );
        setGanttProcess(EDProcess);
        setTurnRound(EDTurnround / processos.length);
        break;
      case "Round-Robin":
        const { process: RRProcess, turnround: RRTurnRound } = roundRobin(
          parseInt(quantum[0], 10),
          processos,
          sobrecarga
        );
        setGanttProcess(RRProcess);
        setTurnRound(RRTurnRound / processos.length);
        break;
      default:
        const { process: defaultProcess, turnround: defaultTurnRound } =
          fifo(processos);
        setGanttProcess(defaultProcess);
        setTurnRound(defaultTurnRound / processos.length);
        break;
    }
  };

  const clearProcess = () => {
    setProcessos([]);
    setGanttProcess([]);
    setTurnRound(0);
  };

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const parsedDeadLine = parseInt(deadLine[0]);
    const parsedPriority = parseInt(priority[0]);

    setProcessos([
      ...processos,
      {
        tempoChegada: parseInt(tempoChegada[0]),
        tempoExecucao: parseInt(tempoExecucao[0]),
        deadLine: !isNaN(parsedDeadLine) ? parsedDeadLine : 0,
        priority: !isNaN(parsedPriority) ? parsedPriority : 0,
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
          priority={priority}
          sobrecargaDoSistema={sobrecargaDoSistema}
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

            animation: {
              duration: 1000,
              startup: true,
              easing: "out",
            },
            gantt: {
              trackHeight: 30,
              criticalPathEnabled: false,
              arrow: {
                width: 0,
                color: "green",
              },
            },
          }}
          rootProps={{ "data-testid": "2" }}
        />
      )}
    </div>
  );
}

export default App;
