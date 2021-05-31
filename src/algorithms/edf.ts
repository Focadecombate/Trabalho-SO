import { Gantt, Process, Result } from "../@types";
import { createData, createGantt, toGanttArray } from "../utils";
import { addSobrecargaQuantumEDF } from "../utils/addSobrecargaQuantumEdf";
import { arrived } from "../utils/arrived";

interface ProcessWithIdAndPartial extends Process {
  faltam: number;
  nProcesso: number;
}

export const checkPartialExecution = (processes: ProcessWithIdAndPartial[]) =>
  processes.some((value) => value.faltam > 0);

const findSmallestDeadline = (
  allProcess: ProcessWithIdAndPartial[],
  nProcesso: number,
  clock: number
) => {
  const filtered = allProcess
    .filter((value) => value.faltam > 0)
    .filter((value) => arrived(value.tempoChegada, clock))
    .sort((esquerda, direira) => esquerda.deadLine - direira.deadLine);

  const isSmallest = filtered.reduce((acc, loc) =>
    acc.deadLine < loc.deadLine ? acc : loc
  );

  return isSmallest.nProcesso === nProcesso;
};

interface Run {
  aditionalTime: number;
  currentPartial: number;
  clock: number;
  element: ProcessWithIdAndPartial;
  counter: number;
  executedProcess: Gantt[];
}

const run = ({
  aditionalTime,
  clock,
  element,
  counter,
  executedProcess,
}: Run) => {
  executedProcess.push(
    createGantt({
      TaskName: `Processo ${element.nProcesso}`,
      TaskID: `${counter} Processo ${element.nProcesso}`,
      StartDate: createData(clock),
      EndDate: createData(clock + aditionalTime),
    })
  );
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

  let counter = 0;
  let clock = 0;
  let sobrecargaFinal = 0;

  const executedProcess: Gantt[] = [];

  /* Loop enquanto tiver algum processo sem estar completo */
  while (checkPartialExecution(sortedProcess)) {
    /* Loop pelos processo */
    for (let index = 0; index < sortedProcess.length; index++) {
      const element = sortedProcess[index];
      const currentPartial = element.faltam;

      const smallestDeadLine = findSmallestDeadline(
        sortedProcess,
        element.nProcesso,
        clock
      );

      const canRun =
        arrived(element.tempoChegada, clock) &&
        element.faltam > 0 &&
        smallestDeadLine;

      /* Checa se o processo já chegou e se ainda falta executar */
      if (canRun) {
        /* Tempo adicional que pode ser o quantum ou o tempo que falta no processo */
        const aditionalTime =
          quantum > currentPartial ? currentPartial : quantum;
        run({
          aditionalTime,
          currentPartial,
          clock,
          element,
          counter,
          executedProcess,
        });
        element.faltam = currentPartial - aditionalTime;
        clock += aditionalTime;
        counter++;
        continue;
      }
    }
  }

  const ganttArray: Gantt[] = [];

  addSobrecargaQuantumEDF(executedProcess, sobrecarga, ganttArray);

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
};
export { edf };
