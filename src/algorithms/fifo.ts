import { Result, Process } from "../@types";

const fifo = (processes: Process[]): Result => {
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

  return {
    ordemExec: sortedProcess,
    tempoTotal: sum / sortedProcess.length,
  };
};

export { fifo };
