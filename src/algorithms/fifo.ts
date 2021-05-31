import { Process, Result } from "../@types";
import { Gantt } from "../@types/gantt";
import { createData, createGantt, toGanttArray } from "../utils/";
import { addSobrecarga } from "../utils/addSobrecarga";

export const fifo = (processes: Process[], sobrecarga: number): Result => {
  /* Ordena os processos por tempo de entrada */
  const processosEmOrdem = processes
    .map((value, index) => ({
      ...value,
      nProcesso: index,
    }))
    .sort((esquerda, direita) => esquerda.tempoChegada - direita.tempoChegada);

  /* Array com tempo de espera */
  const awaitTime: number[] = [];
  /* Array com o tempo total de execução */
  const executionTime: number[] = [];

  /* Loop que passa pelos processos ordenados e preenche os arrays */

  for (let index = 0; index < processosEmOrdem.length; index++) {
    awaitTime.push(
      processosEmOrdem
        .slice(0, index)
        .reduce((prev, curr) => prev + curr.tempoExecucao, 0) -
        processosEmOrdem[index].tempoChegada
    );

    executionTime.push(
      processosEmOrdem[index].tempoExecucao +
        awaitTime[index] +
        processosEmOrdem[index].tempoChegada
    );
  }

  /* Prepara o processo pro grafico gant */
  const handledProcess = processosEmOrdem.map(
    (process, index): Gantt =>
      createGantt({
        TaskName: `Processo ${process.nProcesso}`,
        StartDate: createData(process.tempoChegada + awaitTime[index]),
        EndDate: createData(executionTime[index]),
      })
  );

  const ganttProcess: Gantt[] = [];

  if (sobrecarga > 0) {
    addSobrecarga(handledProcess, sobrecarga, ganttProcess);

    return {
      process: toGanttArray(ganttProcess),
      turnround: executionTime[executionTime.length - 1],
    };
  }

  return {
    process: toGanttArray(handledProcess),
    turnround: executionTime[executionTime.length - 1],
  };
};
