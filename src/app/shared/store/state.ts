import {MatDialogRef} from "@angular/material/dialog";
import * as dayjs from "dayjs";
import {Dayjs} from "dayjs";
import {DatatableConfigurationModel} from "../models/datatable-configuration.model";
import {ThesisModel} from "../models/thesis.model";


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
  lastDispatchedActionData: any;
  datatablesConfiguration: DatatableConfigurationModel[];
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
  lastDispatchedActionData: null,
  datatablesConfiguration: [],
 };
