import { addSeconds, createGantt, createData } from ".";
import { Gantt } from "../@types/gantt";

export const addSobrecargaQuantum = (
  fromArray: Gantt[],
  sobrecarga: number,
  toArray: Gantt[]
) => {
  for (let index = 0; index < fromArray.length; index += 2) {
    const first = fromArray[index];
    const second = fromArray[index + 1];

    const prevWasSobre = fromArray[index - 1]?.TaskName ?? "";

    if (fromArray.length === 1) {
      toArray.push(first);
      break;
    }
    if (index % 2 === 0) {
      if (prevWasSobre) {
        first.StartDate = addSeconds(first.StartDate, index * sobrecarga);
        first.EndDate = addSeconds(first.EndDate, index * sobrecarga);
      }
      toArray.push(first);
    }

    if (first?.TaskName === second?.TaskName) {
      toArray.push(second);
      const seconds = second.EndDate.getSeconds() + sobrecarga;
      toArray.push(
        createGantt({
          TaskName: `Sobrecarga ${index}`,
          StartDate: second.EndDate,
          EndDate: createData(seconds),
          Duration: sobrecarga,
        })
      );
      continue;
    }

    if (index + 1 < fromArray.length && prevWasSobre) {
      const seconds = first.EndDate.getSeconds() + sobrecarga;
      toArray.push(
        createGantt({
          TaskName: `Sobrecarga ${index}`,
          StartDate: first.EndDate,
          EndDate: createData(seconds),
          Duration: sobrecarga,
        })
      );
      second.StartDate = addSeconds(second.StartDate, (index + 1) * sobrecarga);
      second.EndDate = addSeconds(second.EndDate, (index + 1) * sobrecarga);

      toArray.push(second);
    }
  }
};
