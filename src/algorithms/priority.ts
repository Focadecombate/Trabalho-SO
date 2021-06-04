import {
  Process,
  Result,
  Gantt,
  ProcessWithExecutedAndNumber,
} from "../@types";
import { createData, createGantt, toGanttArray } from "../utils";
import { arrived } from "../utils/arrived";
import { naoRodouTodos } from "../utils/naoRodouTodos";

const comecaForaDoZero = (processes: ProcessWithExecutedAndNumber[]) =>
  processes.every(
    (value) => value.tempoChegada !== 0 && value.executado === false
  );

const priority = (processes: Process[], sobrecarga: number): Result => {
  /* Ordena os processos por tempo de execução */
  const processosEmOrdem = processes
    .map((value, index) => ({
      ...value,
      nProcesso: index,
      executado: false,
    }))
    .sort((esquerda, direita) => esquerda.priority - direita.priority);

  let relogio = 0;
  const handledProcess: Gantt[] = [];

  /* Loop que roda enquanto algum processo não tiver sido executado */
  while (naoRodouTodos(processosEmOrdem)) {
    /* Loop pelos processos q executa a logica */
    for (let index = 0; index < processosEmOrdem.length; index++) {
      const { executado, tempoChegada, tempoExecucao, nProcesso } =
        processosEmOrdem[index];

      /* check se o processo foi executado e se ele já chegou na fila */
      if (!executado && arrived(tempoChegada, relogio)) {
        /* Marca como executado */
        processosEmOrdem[index] = {
          ...processosEmOrdem[index],
          executado: true,
        };

        /* soma ao relogio o valor do tempo de execução */
        relogio += tempoExecucao;

        /* array para o grafico gantt */
        handledProcess.push(
          createGantt({
            TaskName: `Processo ${nProcesso}`,
            StartDate: createData(relogio - tempoExecucao),
            EndDate: createData(relogio),
          })
        );
      }
      if (comecaForaDoZero(processosEmOrdem)) {
        relogio += tempoChegada;
      }
    }
  }
  if (sobrecarga > 0) {
    const ganttProcess: Gantt[] = [];
    return { process: toGanttArray(ganttProcess), turnround: relogio };
  }

  return { process: toGanttArray(handledProcess), turnround: relogio };
};

export { priority };
