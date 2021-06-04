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

interface ProcessInOrder {
  nProcesso: number;
  executado: boolean;
  tempoExecucao: number;
  priority: number;
  deadLine: number;
  tempoChegada: number;
}

const sjf = (processes: Process[]): Result => {
  /* Ordena os processos por tempo de execução */
  const processosEmOrdem = processes
    .map((value, index) => ({
      ...value,
      nProcesso: index,
      executado: false,
    }))
    .sort(function (a, b) {
      if (a.tempoExecucao > b.tempoExecucao) return 1;
      if (a.tempoExecucao < b.tempoExecucao) return -1;
      return 0;
    });

  let clock = 0;
  const handledProcess: Gantt[] = [];
  const awaitTime: number[] = [];

  /* Loop que roda enquanto algum processo não tiver sido executado */
  while (naoRodouTodos(processosEmOrdem)) {
    /* Loop pelos processos q executa a lógica */
    for (const [index, process] of Object.entries(processosEmOrdem)) {
      const { executado, tempoChegada, tempoExecucao, nProcesso } = process;

      const numberIndex = parseInt(index);

      /* check se o processo foi executado e se ele já chegou na fila */
      if (!executado && arrived(tempoChegada, clock)) {
        /* Marca como executado */
        processosEmOrdem[numberIndex] = {
          ...processosEmOrdem[numberIndex],
          executado: true,
        };

        /* soma ao relógio o valor do tempo de execução */
        clock += tempoExecucao;
        awaitTime.push(clock - tempoChegada - tempoExecucao);

        /* array para o gráfico gantt */
        handledProcess.push(
          createGantt({
            TaskName: `Processo ${nProcesso}`,
            StartDate: createData(tempoChegada),
            EndDate: createData(clock),
          })
        );
      }
      if (comecaForaDoZero(processosEmOrdem) || !arrived(tempoChegada, clock)) {
        const deepCopy = JSON.parse(
          JSON.stringify(processosEmOrdem)
        ) as ProcessInOrder[];

        const fifo = deepCopy
          .sort(
            (esquerda, direita) => esquerda.tempoChegada - direita.tempoChegada
          )
          .filter((value) => !value.executado);

        const primeiro = fifo[0];

        const indexPrimeiro = processosEmOrdem.findIndex(
          (value) => value.nProcesso === primeiro.nProcesso
        );

        processosEmOrdem[indexPrimeiro] = {
          ...primeiro,
          executado: true,
        };

        /* soma ao relogio o valor do tempo de execução */
        clock += primeiro.tempoExecucao;
        awaitTime.push(primeiro.tempoChegada);

        /* array para o grafico gantt */
        handledProcess.push(
          createGantt({
            TaskName: `Processo ${primeiro.nProcesso}`,
            StartDate: createData(primeiro.tempoChegada),
            EndDate: createData(clock),
          })
        );
        break;
      }
    }
  }
  console.log(awaitTime);

  const Turnround = clock + awaitTime.reduce((prev, curr) => prev + curr, 0);

  return { process: toGanttArray(handledProcess), turnround: Turnround };
};

export { sjf };
