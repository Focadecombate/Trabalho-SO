import { Process } from "../@types";

export const fifo = (processes: Process[]): any[] => {
  /* Ordena os processos por tempo de entrada */
  const sortedProcess = processes.sort(
    (esquerda, direita) => esquerda.tempoChegada - direita.tempoChegada
  );

  /* Tempo de execução do processo */
  let clock = 0;
  /* Tempo final de execução da pilha */
  let sum = 0;

  for (const process of sortedProcess) {
    clock += process.tempoExecucao;
    sum += clock - process.tempoChegada;
  }

  const handledProcess = sortedProcess.map((process, index) => {
    clock += process.tempoExecucao;
    sum += clock - process.tempoChegada;

    return [
      `task${index}`,
      `task${index}`,
      new Date(2020, 1, 1, 1, 0, process.tempoChegada),
      new Date(2020, 1, 1, 1, 0, process.tempoExecucao),
      null,
      100,
      null,
    ];
  });

  return handledProcess;
};
