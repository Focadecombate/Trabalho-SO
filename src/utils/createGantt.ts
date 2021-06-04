import { Gantt, GanttArray } from "../@types/gantt";

interface createGanttProps {
  TaskName: string;
  StartDate: Date;
  EndDate: Date;
  TaskID?: string;
  Duration?: number;
}

export const createGantt = ({
  TaskName,
  StartDate,
  EndDate,
  Duration,
  TaskID,
}: createGanttProps): Gantt => ({
  TaskID: TaskID ?? TaskName,
  TaskName,
  StartDate,
  EndDate,
  Duration: Duration ?? null,
  PercentComplete: 100,
  Dependencies: null,
});

export interface QuantumGantt extends Omit<Gantt, "StartDate" | "EndDate"> {
  StartDate: number;
  EndDate: number;
  Duration: number;
}

export const createGanttQuantum = ({
  TaskName,
  Duration,
  TaskID,
  StartDate,
  EndDate,
}: {
  TaskName: string;
  StartDate: number;
  EndDate: number;
  TaskID?: string;
  Duration: number;
}): QuantumGantt => ({
  TaskID: TaskID ?? TaskName,
  TaskName,
  StartDate,
  EndDate,
  Duration: Duration,
  PercentComplete: 100,
  Dependencies: null,
});

export const toGanttArray = (ganttArray: Gantt[]) =>
  ganttArray.map(Object.values) as GanttArray[];
