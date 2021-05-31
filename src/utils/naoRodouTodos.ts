import { ProcessWithExecutedAndNumber } from "../@types";

export const naoRodouTodos = (processes: ProcessWithExecutedAndNumber[]) =>
  processes.some((value) => value.executado === false);
