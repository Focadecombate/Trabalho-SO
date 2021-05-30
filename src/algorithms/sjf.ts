import { Process } from "../@types";

const sjf = (processes: Process[]): any[] => {
  /* Ordena os processos por tempo de execução */

  const processesWithOrder = processes.map((value, index) => ({
    ...value,
    nProcesso: index,
  }));

  const sortedProcess = processesWithOrder.sort(
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

  return sortedProcess.map((process) => [
    `Processo ${process.nProcesso}`,
    `Processo ${process.nProcesso}`,
    new Date(2020, 1, 1, 1, 0, process.tempoChegada),
    new Date(2020, 1, 1, 1, 0, process.tempoExecucao),
    null,
    100,
    null,
  ]);
};

export { sjf };
