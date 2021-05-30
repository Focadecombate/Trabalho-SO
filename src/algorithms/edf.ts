import { Process } from "../@types";

const edf = (processes: Process[]) => {
  const sortedProcess = processes
    .map((value, index) => ({
      ...value,
      nProcesso: index,
    }))
    .sort((esquerda, direita) => esquerda.deadLine - direita.deadLine);

  let partialExecution = sortedProcess.map((process) => process.tempoExecucao);
  let id = 0;
  let clock = 0;

  const executedProcess: any[] = [];

  /* Loop enquanto tiver algum processo sem estar completo */
  while (partialExecution.some((value) => value > 0)) {
    /* Loop pelos processo */
    for (let index = 0; index < sortedProcess.length; index++) {
      const element = sortedProcess[index];
      /* Checa se o processo já chegou e se ainda falta executar */
      if (clock >= element.tempoChegada && partialExecution[index] > 0) {
        if (index === 0) {
          executedProcess.push([
            `${id} Processo ${element.nProcesso} `,
            `${id} Processo ${element.nProcesso} `,
            new Date(2020, 1, 1, 1, 0, clock),
            new Date(2020, 1, 1, 1, 0, clock + element.tempoExecucao),
            null,
            100,
            null,
          ]);
          id++;
          clock += element.tempoExecucao;
          partialExecution[index] -= element.tempoExecucao;
        } else if (id === 0) {
          const possibleExecutionTime =
            element.tempoExecucao - sortedProcess[0].tempoChegada;
          executedProcess.push([
            `${id} Processo ${element.nProcesso} `,
            `${id} Processo ${element.nProcesso} `,
            new Date(2020, 1, 1, 1, 0, clock),
            new Date(2020, 1, 1, 1, 0, clock + possibleExecutionTime),
            null,
            100,
            null,
          ]);
          id++;
          clock += possibleExecutionTime;
          partialExecution[index] -= possibleExecutionTime;
        } else {
          const possibleExecutionTime = element.tempoExecucao;
          executedProcess.push([
            `${id} Processo ${element.nProcesso} `,
            `${id} Processo ${element.nProcesso} `,
            new Date(2020, 1, 1, 1, 0, clock),
            new Date(2020, 1, 1, 1, 0, clock + possibleExecutionTime),
            null,
            100,
            null,
          ]);
          id++;
          clock += possibleExecutionTime;
          partialExecution[index] -= possibleExecutionTime;
        }
      }
    }
  }
  return { process: executedProcess, turnround: clock };
};
export { edf };
