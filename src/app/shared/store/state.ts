import {MatDialogRef} from "@angular/material/dialog";
import * as dayjs from "dayjs";
import {Dayjs} from "dayjs";
import {ThesisModel} from "../models/thesis.model";
import {Action} from "@ngrx/store";
import {getLastDispatchedAction} from "./selectors";


export interface SharedState {
  modals: MatDialogRef<any>[];
  activeRoute: string;
  currentMonthNumber: number;
  currentYearNumber: number;
  currentMonth: Dayjs[][];
  smallCalendarCurrentMonthNumber: number;
  smallCalendarCurrentYearNumber: number;
  smallCalendarCurrentMonth: Dayjs[][];
  openModal: boolean;
  modalData: any;
  thesis: ThesisModel[];
  lastDispatchedAction: Action;
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
  openModal: false,
  modalData: null,
  thesis: null,
  lastDispatchedAction: null
 };
