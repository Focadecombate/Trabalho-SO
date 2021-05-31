import { addSeconds, createGantt, createData } from ".";
import { Gantt } from "../@types/gantt";

export const addSobrecargaQuantum = (
  fromArray: Gantt[],
  sobrecarga: number,
  toArray: Gantt[]
) => {
  fromArray.forEach((process, index, array) => {
    const nextName = array[index + 1]?.TaskName ?? "";
    const prevName = array[index - 1]?.TaskName ?? "";

    if (index === 0) {
      toArray.push(process);
      if (nextName === process.TaskName) {
        toArray.push(process);
        return;
      }
    } else if (prevName === process.TaskName && index < 2) {
      toArray.push(process);
    } else {
      process.StartDate = addSeconds(process.StartDate, index * sobrecarga);
      process.EndDate = addSeconds(process.EndDate, index * sobrecarga);
      toArray.push(process);
    }

    if (index < fromArray.length - 1) {
      const seconds = process.EndDate.getSeconds() + sobrecarga;
      toArray.push(
        createGantt({
          TaskName: `Sobrecarga ${index}`,
          StartDate: process.EndDate,
          EndDate: createData(seconds),
          Duration: sobrecarga,
        })
      );
    }
  });
};
