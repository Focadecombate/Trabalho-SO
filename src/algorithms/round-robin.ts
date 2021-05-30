import { Process } from "../@types";

const roundRobin = (quantum: number, processes: Process[]) => {
  let partialExecution = processes.map((process) => process.tempoExecucao);

  const executedProcess: any[] = [];

  let clock = 0;
  let id = 0;

  while (partialExecution.some((value) => value > 0)) {
    for (let index = 0; index < processes.length; index++) {
      if (partialExecution[index] > 0) {
        if (clock >= processes[index].tempoChegada) {
          const aditionalTime =
            quantum > partialExecution[index]
              ? partialExecution[index]
              : quantum;
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
  }

  return executedProcess;
};

export { roundRobin };
