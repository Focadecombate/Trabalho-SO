import { addSeconds, createGantt, createData } from ".";
import { Gantt } from "../@types/gantt";

export const addSobrecarga = (
  fromArray: Gantt[],
  sobrecarga: number,
  toArray: Gantt[]
) => {
  fromArray.forEach((process, index) => {
    if (index === 0) {
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
