import {MatDialogRef} from "@angular/material/dialog";
import * as dayjs from "dayjs";
import {Dayjs} from "dayjs";


export interface SharedState {
  modals: MatDialogRef<any>[];
  activeRoute: string;
  currentMonthNumber: number;
  currentYearNumber: number;
  currentMonth: Dayjs[][];
  smallCalendarCurrentMonthNumber: number;
  smallCalendarCurrentYearNumber: number;
  smallCalendarCurrentMonth: Dayjs[][];
}

export const INIT_SHARED_STATE: SharedState = {
  modals: [],
  activeRoute: '',
  currentMonthNumber: dayjs().month(),
  currentYearNumber: dayjs().year(),
  currentMonth: null,
  smallCalendarCurrentMonthNumber: dayjs().month(),
  smallCalendarCurrentYearNumber: dayjs().year(),
  smallCalendarCurrentMonth: null,
 };
