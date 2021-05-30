import { Process } from "../@types";

export const fifo = (processes: Process[]): any[] => {
  /* Ordena os processos por tempo de entrada */
  const sortedProcess = processes
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
  for (let index = 0; index < sortedProcess.length; index++) {
    awaitTime.push(
      sortedProcess
        .slice(0, index)
        .reduce((prev, curr) => prev + curr.tempoExecucao, 0) -
        sortedProcess[index].tempoChegada
    );

    executionTime.push(
      sortedProcess[index].tempoExecucao +
        awaitTime[index] +
        sortedProcess[index].tempoChegada
    );
    console.log(awaitTime);
    console.log(executionTime);
  }

  /* Prepara o processo pro grafico gant */
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

fifo([
  {
    tempoChegada: 0,
    tempoExecucao: 3,
    deadLine: 0,
  },
  {
    tempoChegada: 3,
    tempoExecucao: 1,
    deadLine: 0,
  },
  {
    tempoChegada: 2,
    tempoExecucao: 2,
    deadLine: 0,
  },
]);
