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

export const toGanttArray = (ganttArray: Gantt[]) =>
  ganttArray.map(Object.values) as GanttArray[];
