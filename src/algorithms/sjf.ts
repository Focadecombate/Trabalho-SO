import { Result, Process } from "../@types";

const sjf = (processes: Process[]): Result => {
  /* Ordena os processos por tempo de execução */
  const sortedProcess = processes.sort(
    (esquerda, direita) => esquerda.tempoExecucao - direita.tempoExecucao
  );

  /* Tempo de execução do processo */
  let clock = 0;
  /* Tempo final de execução da pilha */
  let sum = 0;

  sortedProcess.forEach(() => {
    let executado: Process | null = null;
    for (const toExecute of sortedProcess) {
      if (toExecute.tempoChegada <= clock && toExecute.tempoChegada >= 0) {
        executado = toExecute;
        break;
      }
      continue;
    }
    if (executado) {
      clock += executado.tempoExecucao;
      sum += clock - executado.tempoChegada;
    }
  });

  return {
    ordemExec: sortedProcess,
    tempoTotal: sum / sortedProcess.length,
  };
};

export { sjf };
