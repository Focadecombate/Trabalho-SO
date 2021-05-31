import { addSeconds, createGantt, createData } from ".";
import { Gantt } from "../@types/gantt";

export const addSobrecargaQuantum = (
  fromArray: Gantt[],
  sobrecarga: number,
  toArray: Gantt[]
) => {
  for (let index = 0; index < fromArray.length; index++) {
    const first = fromArray[index];
    const second = fromArray[index + 1];

    const same = first?.TaskName === second?.TaskName;

    if (same) {
      toArray.push(first);
      toArray.push(second);
      continue;
    }

    toArray.push(first);

    if (!second) {
      break;
    }

    const seconds = first.EndDate.getSeconds() + sobrecarga;

    const endsobrecarga = createData(seconds);

    const sobrecargaObj: Gantt = createGantt({
      TaskName: `Sobrecarga ${index}`,
      StartDate: first.EndDate,
      EndDate: endsobrecarga,
      Duration: sobrecarga,
    });

    toArray.push(sobrecargaObj);

    second.StartDate = addSeconds(second.StartDate, (index + 1) * sobrecarga);
    second.EndDate = addSeconds(second.EndDate, (index + 1) * sobrecarga);

    toArray.push(second);
  }
};
