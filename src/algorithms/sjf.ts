import { Result, Process } from "../@types";

const sjf = (processes: Process[]): Result => {
  /* Ordena os processos por tempo de execução */
  const sortedProcess = processes.sort(
    (esquerda, direita) => esquerda.tempoExec - direita.tempoExec
  );

  /* Tempo de execução do processo */
  let clock = 0;
  /* Tempo final de execução da pilha */
  let sum = 0;

  sortedProcess.forEach(() => {
    let executado: Process | null = null;
    for (const toExecute of sortedProcess) {
      if (toExecute.tempoEntrada <= clock && toExecute.tempoEntrada >= 0) {
        executado = toExecute;
        break;
      }
      continue;
    }
    if (executado) {
      clock += executado.tempoExec;
      sum += clock - executado.tempoEntrada;
    }
  });

  return {
    ordemExec: sortedProcess,
    tempoTotal: sum / sortedProcess.length,
  };
};

export { sjf };
