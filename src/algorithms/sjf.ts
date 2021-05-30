import { Process } from "../@types";

export const sjf = (processes: Process[]): any[] => {
  /* Ordena os processos por tempo de execução */

  const processesWithOrder = processes.map((value, index) => ({
    ...value,
    nProcesso: index,
  }));

  const sortedProcess = processesWithOrder.sort(
    (esquerda, direita) => esquerda.tempoExecucao - direita.tempoExecucao
  );

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
