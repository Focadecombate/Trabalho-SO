import { Process } from "../@types";

const roundRobin = (quantum: number, processes: Process[]) => {
  /* Array com o que falta ser executado de cada processo */
  let partialExecution = processes.map((process) => process.tempoExecucao);

  /* Array final */
  const executedProcess: any[] = [];

  let clock = 0;
  let id = 0;

  /* While que executa enquanto há processos que não foram executados por completo */
  while (partialExecution.some((value) => value > 0)) {
    /* loop que executa a logica */
    for (let index = 0; index < processes.length; index++) {
      /* Checa se ainda há tempo faltando e se o processo já chegou na fila */
      if (
        partialExecution[index] > 0 &&
        clock >= processes[index].tempoChegada
      ) {
        /* Tempo adicional que pode ser o quantum ou o tempo que falta no processo */
        const aditionalTime =
          quantum > partialExecution[index] ? partialExecution[index] : quantum;
        executedProcess.push([
          `${id} Processo ${index} `,
          `${id} Processo ${index} `,
          new Date(2020, 1, 1, 1, 0, clock),
          new Date(2020, 1, 1, 1, 0, clock + aditionalTime),
          null,
          100,
          null,
        ]);
        id++;
        clock = clock + aditionalTime;
        partialExecution[index] = partialExecution[index] - aditionalTime;
      }
    }
  }

  return { process: executedProcess, turnround: clock };
};

export { roundRobin };
