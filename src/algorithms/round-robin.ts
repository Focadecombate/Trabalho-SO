import { Process } from "../@types";

const roundRobin = (quantum: number, processes: Process[]) => {
  let partialExecution = processes.map((process) => process.tempoExecucao);

  const executedProcess: any[] = [];

  let clock = 0;
  let id = 0;

  while (partialExecution.some((value) => value > 0)) {
    for (let index = 0; index < processes.length; index++) {
      if (partialExecution[index] > 0) {
        executedProcess.push([
          `${id} Processo ${index} `,
          `${id} Processo ${index} `,
          new Date(2020, 1, 1, 1, 0, clock),
          new Date(2020, 1, 1, 1, 0, clock + quantum),
          null,
          100,
          null,
        ]);
        id++;
        clock = clock + quantum;
      }
    }
    partialExecution = partialExecution.map((value) => value - quantum);
  }
  console.log(executedProcess.length);
  console.log(clock);

  return executedProcess;
};

export { roundRobin };
