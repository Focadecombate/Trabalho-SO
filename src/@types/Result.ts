import { GanttArray } from "./gantt";

export interface Result {
  process: GanttArray[];
  turnround: number;
}
