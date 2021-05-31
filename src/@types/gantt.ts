export interface Gantt {
  TaskID: string;
  TaskName: string;
  StartDate: Date;
  EndDate: Date;
  Duration: number | null;
  PercentComplete: number;
  Dependencies: string | null;
}

export type GanttArray = (null | string | number | Date)[];
