import { Gantt, Process, Result } from "../@types";
import {
  addSobrecargaQuantum,
  createData,
  createGantt,
  toGanttArray,
} from "../utils";
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
  }));

  const executedProcess: Gantt[] = [];

  let clock = 0;
  let counter = 0;
  let sobrecargaFinal = 0;

  /* While que executa enquanto há processos que não foram executados por completo */
  while (checkPartialExecution(partialExecution)) {
    /* loop que executa a logica */
    for (let index = 0; index < processWithId.length; index++) {
      /* Checa se ainda há tempo faltando e se o processo já chegou na fila */
      const currentPartial = partialExecution[index];
      const currentProcess = processWithId[index];
      if (currentPartial > 0 && arrived(currentProcess.tempoChegada, clock)) {
        /* Tempo adicional que pode ser o quantum ou o tempo que falta no processo */
        const aditionalTime =
          quantum > currentPartial ? currentPartial : quantum;

        const StartDate = createData(clock);
        const EndDate = createData(clock + aditionalTime);

        executedProcess.push(
          createGantt({
            TaskName: `Processo ${currentProcess.index}`,
            TaskID: `${counter} Processo ${currentProcess.index}`,
            StartDate,
            EndDate,
            Duration: quantum,
          })
        );
        const updatedPartial = currentPartial - aditionalTime;

        counter++;
        clock += aditionalTime;
        partialExecution[index] = updatedPartial;
      }
    }
  }

  if (sobrecarga > 0) {
    const ganttArray: Gantt[] = [];

    addSobrecargaQuantum(executedProcess, sobrecarga, ganttArray);

    const removeDuplications = Array.from(new Set(ganttArray));

    for (const process of removeDuplications) {
      if (process.TaskName.includes("Sobrecarga")) {
        sobrecargaFinal += 2;
      }
    }

    return {
      process: toGanttArray(removeDuplications),
      turnround: clock + sobrecargaFinal,
    };
  }

  return {
    process: toGanttArray(executedProcess),
    turnround: clock,
  };
};

export { roundRobin };
