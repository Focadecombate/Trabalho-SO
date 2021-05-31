export const checkPartialExecution = (processes: number[]) =>
  processes.some((value) => value > 0);
