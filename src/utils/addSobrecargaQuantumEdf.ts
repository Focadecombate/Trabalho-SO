import { addSeconds, createGantt, createData } from ".";
import { Gantt } from "../@types/gantt";

export const addSobrecargaQuantumEDF = (
  fromArray: Gantt[],
  sobrecarga: number,
  toArray: Gantt[]
) => {
  const sobrecargaArray: boolean[] = Array(fromArray.length).fill(
    false,
    0,
    fromArray.length
  );

  for (let index = 0; index < fromArray.length; index++) {
    const first = fromArray[index];
    const second = fromArray[index + 1];

    const same = first?.TaskName === second?.TaskName;

    const hadSobrecarga = sobrecargaArray[index - 1];

    if (same) {
      if (hadSobrecarga) {
        if (index > 2) {
          const addTime = index * sobrecarga - 2;
          second.StartDate = addSeconds(second.StartDate, addTime);
          second.EndDate = addSeconds(second.EndDate, addTime);
          first.StartDate = addSeconds(first.StartDate, -1 * addTime + 2);
          first.EndDate = addSeconds(first.EndDate, -1 * addTime + 2);
          toArray.push(first);
          toArray.push(second);

          continue;
        }

        second.StartDate = addSeconds(second.StartDate, index * sobrecarga);
        second.EndDate = addSeconds(second.EndDate, index * sobrecarga);
        toArray.push(first);
        toArray.push(second);

        continue;
      }
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

    sobrecargaArray[index] = true;
  }
};
