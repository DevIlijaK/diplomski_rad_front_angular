import {MatDialogRef} from "@angular/material/dialog";
import * as dayjs from "dayjs";
import {Dayjs} from "dayjs";


export interface SharedState {
  modals: MatDialogRef<any>[];
  activeRoute: string;
  currentMonthNumber: number;
  currentMonth: Dayjs[][];
  smallCalendarCurrentMonthNumber: number;
  smallCalendarCurrentMonth: Dayjs[][];
}

export const INIT_SHARED_STATE: SharedState = {
  modals: [],
  activeRoute: '',
  currentMonthNumber: dayjs().month(),
  currentMonth: null,
  smallCalendarCurrentMonthNumber: dayjs().month(),
  smallCalendarCurrentMonth: null,
 };
