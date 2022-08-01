import {Dayjs} from "dayjs";
import * as dayjs from "dayjs";

export interface CalendarState {
  selectedDay: Dayjs;
}
export const INIT_CALENDAR_STATE: CalendarState = {
  selectedDay: dayjs(),
}
