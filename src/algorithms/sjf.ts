import { Process } from "../@types";

const sjf = (processes: Process[]): any[] => {
  /* Ordena os processos por tempo de execução */

  const sortedProcess = processes
    .map((value, index) => ({
      ...value,
      nProcesso: index,
      executed: false,
    }))
    .sort(
      (esquerda, direita) => esquerda.tempoExecucao - direita.tempoExecucao
    );

  let clock = 0;
  const handledProcess: any[] = [];

  while (sortedProcess.some((value) => value.executed === false)) {
    for (let index = 0; index < sortedProcess.length; index++) {
      const element = sortedProcess[index];

      if (!sortedProcess[index].executed && clock >= element.tempoChegada) {
        sortedProcess[index] = { ...sortedProcess[index], executed: true };
        console.log(element.nProcesso);

        clock += element.tempoExecucao;

        handledProcess.push([
          `Processo ${element.nProcesso}`,
          `Processo ${element.nProcesso}`,
          new Date(2020, 1, 1, 1, 0, clock - element.tempoExecucao),
          new Date(2020, 1, 1, 1, 0, clock),
          null,
          100,
          null,
        ]);
      }
    }
  }

  return handledProcess;
};

export { sjf };
