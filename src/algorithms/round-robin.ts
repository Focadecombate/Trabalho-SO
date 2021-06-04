import { Gantt, Process, Result } from "../@types";
import { createGanttQuantum, toGanttArray } from "../utils";
import { arrived } from "../utils/arrived";
import { checkPartialExecution } from "../utils/partialExecution";

const roundRobin = (
  quantum: number,
  processes: Process[],
  sobrecarga: number
): Result => {
  /* Array com o que falta ser executado de cada processo */
  let partialExecution = processes.map((process) => process.tempoExecucao);

  const processWithId = processes.map((process, index) => ({
    ...process,
    index,
    executed: [[0, 0]],
  }));

  let clock = 0;
  let sobrecargaFinal = 0;
  const executedTimer: number[] = [];
  /* While que executa enquanto há processos que não foram executados por completo */
  while (checkPartialExecution(partialExecution)) {
    /* loop que executa a lógica */
    for (let index = 0; index < processWithId.length; index++) {
      /* Checa se ainda há tempo faltando e se o processo já chegou na fila */
      const currentPartial = partialExecution[index];
      const currentProcess = processWithId[index];
      if (currentPartial > 0 && arrived(currentProcess.tempoChegada, clock)) {
        /* Tempo adicional que pode ser o quantum ou o tempo que falta no processo */
        const additionalTime =
          quantum > currentPartial ? currentPartial : quantum;

        const updatedPartial = currentPartial - additionalTime;
        clock += additionalTime;
        currentProcess.executed.push([clock, additionalTime]);
        partialExecution[index] = updatedPartial;
      }
    }
  }

  const executedProcess = processWithId.map((process) => {
    const executedTime = process.executed.reduce(
      (prev, curr) => prev + curr[1],
      0
    );

    executedTimer.push(
      process.executed[process.executed.length - 1][0] - process.tempoChegada
    );

    const StartDate = process.tempoChegada;
    const EndDate = process.tempoChegada + executedTime;

    return createGanttQuantum({
      TaskName: `Processo ${process.index}`,
      StartDate,
      EndDate,
      Duration: quantum,
    });
  });

  const totalAwaitTime =
    executedTimer.reduce((prev, curr) => prev + curr, 0) - clock - 1;

  if (sobrecarga > 0) {
    const ganttArray = executedProcess
      .map((process, index, array) => {
        const { StartDate, EndDate } = process;

        const Duration = (EndDate - StartDate) * 1000;

        const sobrecargaBase = {
          TaskID: `Sobrecarga ${index}`,
          TaskName: `Sobrecarga ${index}`,
          StartDate: null,
          EndDate: null,
          Duration: sobrecarga * 1000,
          PercentComplete: 100,
        };

        if (index === array.length - 1) {
          return [
            {
              ...process,
              EndDate: null,
              StartDate: null,
              Duration: Duration,
              Dependencies: `Sobrecarga ${index - 1}`,
            },
          ];
        }
        if (index === 0) {
          return [
            {
              ...process,
              StartDate: null,
              EndDate: null,
              Duration: Duration,
            },
            {
              ...sobrecargaBase,
              Dependencies: process.TaskID,
            },
          ];
        }
        return [
          {
            ...process,
            StartDate: null,
            EndDate: null,
            Duration: Duration,
            Dependencies: `Sobrecarga ${index - 1}`,
          },
          {
            ...sobrecargaBase,
            Dependencies: array[index].TaskID,
          },
        ];
      })
      .flat();

    for (const process of ganttArray) {
      if (process.TaskName.includes("Sobrecarga")) {
        sobrecargaFinal += sobrecarga;
      }
    }

    return {
      process: toGanttArray(ganttArray as unknown as Gantt[]),
      turnround: clock + sobrecargaFinal + totalAwaitTime,
    };
  }

  return {
    process: toGanttArray(executedProcess as unknown as Gantt[]),
    turnround: clock + totalAwaitTime,
  };
};

export { roundRobin };
