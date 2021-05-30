import { Process } from "../@types";

export const fifo = (processes: Process[]): any[] => {
  const processesWithOrder = processes.map((value, index) => ({
    ...value,
    nProcesso: index,
  }));
  /* Ordena os processos por tempo de entrada */
  const sortedProcess = processesWithOrder.sort(
    (esquerda, direita) => esquerda.tempoChegada - direita.tempoChegada
  );

  const handledProcess = sortedProcess.map((process) => {
    return [
      `Processo ${process.nProcesso}`,
      `Processo ${process.nProcesso}`,
      new Date(2020, 1, 1, 1, 0, process.tempoChegada),
      new Date(2020, 1, 1, 1, 0, process.tempoExecucao),
      null,
      100,
      null,
    ];
  });

  return handledProcess;
};
