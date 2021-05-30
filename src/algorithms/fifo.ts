import { Process } from "../@types";

export const fifo = (processes: Process[]): any[] => {
  /* Ordena os processos por tempo de entrada */
  const sortedProcess = processes
    .map((value, index) => ({
      ...value,
      nProcesso: index,
    }))
    .sort((esquerda, direita) => esquerda.tempoChegada - direita.tempoChegada);

  const awaitTime: number[] = [];
  const executionTime: number[] = [];

  for (let index = 0; index < sortedProcess.length; index++) {
    awaitTime.push(
      sortedProcess
        .slice(0, index)
        .reduce((prev, curr) => prev + curr.tempoExecucao, 0) -
        processes[index].tempoChegada
    );
    executionTime.push(
      sortedProcess[index].tempoExecucao +
        awaitTime[index] +
        sortedProcess[index].tempoChegada
    );
  }

  const handledProcess = sortedProcess.map((process, index) => [
    `Processo ${process.nProcesso}`,
    `Processo ${process.nProcesso}`,
    new Date(2020, 1, 1, 1, 0, process.tempoChegada + awaitTime[index]),
    new Date(2020, 1, 1, 1, 0, executionTime[index]),
    null,
    100,
    null,
  ]);

  return handledProcess;
};
