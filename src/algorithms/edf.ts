import { Gantt, Process, Result } from "../@types";
import {
  addSobrecargaQuantum,
  createData,
  createGantt,
  toGanttArray,
} from "../utils";
import { arrived } from "../utils/arrived";

interface ProcessWithIdAndPartial extends Process {
  faltam: number;
  nProcesso: number;
}

export const checkPartialExecution = (processes: ProcessWithIdAndPartial[]) =>
  processes.some((value) => value.faltam > 0);

const findSmallestDeadline = (
  allProcess: ProcessWithIdAndPartial[],
  nProcesso: number
) => {
  const sorted = allProcess
    .filter((value) => value.faltam > 0)
    .sort((esquerda, direira) => esquerda.deadLine - direira.deadLine);

  let isSmallest = sorted[0] ?? allProcess[allProcess.length - 1];
  for (let index = 0; index < sorted.length; index++) {
    const element = sorted[index];
    if (element.deadLine < isSmallest.deadLine) {
      console.log(element, "newSmallest");

      isSmallest = element;
    }
  }
  return isSmallest.nProcesso === nProcesso;
};

const edf = (
  quantum: number,
  processes: Process[],
  sobrecarga: number
): Result => {
  const sortedProcess = processes
    .map((value, index) => ({
      ...value,
      faltam: value.tempoExecucao,
      nProcesso: index,
    }))
    .sort((esquerda, direita) => esquerda.deadLine - direita.deadLine);

  let id = 0;
  let clock = 0;
  let sobrecargaFinal = 0;
  let counter = 0;

  const executedProcess: Gantt[] = [];

  /* Loop enquanto tiver algum processo sem estar completo */
  while (checkPartialExecution(sortedProcess)) {
    /* Loop pelos processo */
    for (let index = 0; index < sortedProcess.length; index++) {
      const element = sortedProcess[index];
      const currentPartial = element.faltam;

      const hasSmallestDeadLine = findSmallestDeadline(
        sortedProcess,
        element.nProcesso
      );

      const canRun = arrived(element.tempoChegada, clock) && element.faltam > 0;
      /* Checa se o processo já chegou e se ainda falta executar */
      if (canRun) {
        if (!hasSmallestDeadLine) {
          counter++;
        }
        if (counter + 1) {
          counter--;
          continue;
        }
        /* Tempo adicional que pode ser o quantum ou o tempo que falta no processo */
        const aditionalTime =
          quantum > currentPartial ? currentPartial : quantum;
        executedProcess.push(
          createGantt({
            TaskName: `Processo ${element.nProcesso}`,
            TaskID: `${id} Processo ${index}`,
            StartDate: createData(clock),
            EndDate: createData(clock + aditionalTime),
          })
        );
        id++;
        clock = clock + aditionalTime;

        element.faltam = currentPartial - aditionalTime;
      }

      continue;

      /*  else {
        if (element.faltam <= 0) {
          continue;
        }
        const next = sortedProcess[index + 1];
        if (!next) {
          continue;
        }
        Quando o menor deadline não chegou
        const aditionalTime =
          quantum > element.tempoChegada ? element.tempoChegada : quantum;
        executedProcess.push(
          createGantt({
            TaskName: `Processo ${next.nProcesso} `,
            TaskID: `${id} Processo ${next.nProcesso}`,
            StartDate: createData(clock),
            EndDate: createData(clock + aditionalTime),
          })
        );
        id++;
        clock += aditionalTime;

        next.faltam = currentPartial - aditionalTime;
      } */
    }
  }
  const ganttArray: Gantt[] = [];

  addSobrecargaQuantum(executedProcess, sobrecarga, ganttArray);

  console.log(ganttArray);

  for (const process of ganttArray) {
    if (process.TaskName.includes("Sobrecarga")) {
      sobrecargaFinal += 2;
    }
  }
  return {
    process: toGanttArray(ganttArray),
    turnround: clock + sobrecargaFinal,
  };
};
export { edf };
