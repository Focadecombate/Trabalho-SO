import { Process } from ".";

export interface ProcessWithExecutedAndNumber extends Process {
  nProcesso: number;
  executado: boolean;
}
