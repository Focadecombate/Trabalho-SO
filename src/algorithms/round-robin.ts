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
  let id = 0;
  let sobrecargaFinal = 0;

  /* While que executa enquanto há processos que não foram executados por completo */
  while (checkPartialExecution(partialExecution)) {
    /* loop que executa a logica */
    for (let index = 0; index < processWithId.length; index++) {
      /* Checa se ainda há tempo faltando e se o processo já chegou na fila */
      const currentPartial = partialExecution[index];
      if (
        currentPartial > 0 &&
        arrived(processWithId[index].tempoChegada, clock)
      ) {
        /* Tempo adicional que pode ser o quantum ou o tempo que falta no processo */
        const aditionalTime =
          quantum > currentPartial ? currentPartial : quantum;
        executedProcess.push(
          createGantt({
            TaskName: `Processo ${processWithId[index].index} `,
            TaskID: `${id} Processo ${index}`,
            StartDate: createData(clock),
            EndDate: createData(clock + aditionalTime),
          })
        );
        id++;
        clock = clock + aditionalTime;
        partialExecution[index] = currentPartial - aditionalTime;
      }
    }
  }

  const ganttArray: Gantt[] = [];

  addSobrecargaQuantum(executedProcess, sobrecarga, ganttArray);

  for (const process of ganttArray) {
    if (process.TaskName.includes("Sobrecarga")) {
      sobrecargaFinal += 2;
    }
  }

  console.log(ganttArray);

  return {
    process: toGanttArray(ganttArray),
    turnround: clock + sobrecargaFinal,
  };
};

export { roundRobin };
