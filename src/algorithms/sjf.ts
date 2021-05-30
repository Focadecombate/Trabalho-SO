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

  /* Loop que roda enquanto algum processo não tiver sido executado */
  while (sortedProcess.some((value) => value.executed === false)) {
    /* Loop pelos processos q executa a logica */
    for (let index = 0; index < sortedProcess.length; index++) {
      const element = sortedProcess[index];

      /* check se o processo foi executado e se ele já chegou na fila */
      if (!sortedProcess[index].executed && clock >= element.tempoChegada) {
        /* Marca como executado */
        sortedProcess[index] = { ...sortedProcess[index], executed: true };

        /* soma ao clock o valor do tempo de execução */
        clock += element.tempoExecucao;

        /* array para o grafico gantt */
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
