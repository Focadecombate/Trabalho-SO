import { Result, Process } from "../@types";

export const fifo = (processes: Process[]): any[] => {
  /* Ordena os processos por tempo de entrada */
  const sortedProcess = processes.sort(
    (esquerda, direita) => esquerda.tempoEntrada - direita.tempoEntrada
  );

  /* Tempo de execução do processo */
  let clock = 0;
  /* Tempo final de execução da pilha */
  let sum = 0;

  for (const process of sortedProcess) {
    clock += process.tempoExec;
    sum += clock - process.tempoEntrada;
  }

  const handledProcess = sortedProcess.map((process, index) => {
    clock += process.tempoExec;
    sum += clock - process.tempoEntrada;

    return [
      `task${index}`,
      `task${index}`,
      new Date(2020, 1, 1, 1, 0, process.tempoEntrada),
      new Date(2020, 1, 1, 1, 0, process.tempoExec),
      null,
      100,
      null,
    ];
  });

  return handledProcess;
};
