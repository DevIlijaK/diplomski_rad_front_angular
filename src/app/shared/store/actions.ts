import {Action, createAction, props, union} from '@ngrx/store';

import {MatDialogRef} from '@angular/material/dialog';
import {ESharedAction} from "../constants/constants";
import {Dayjs} from "dayjs";
import {ThesisModel} from "../models/thesis.model";
import {DatatableConfigurationModel} from "../models/datatable-configuration.model";
import {ActionModel} from "../models/action.model";
import {GetThesisByEmailAndDateRangeRequest} from "../models/requests/get-thesis-by-email-and-date-range-request";


export const navigate = createAction(ESharedAction.NAVIGATE, props<{ url: string[] }>());

export const successMessages = createAction(ESharedAction.SUCCESS_MESSAGES, props<{ messagesKey: string, extraMessage?: string }>());

export const errorMessages = createAction(ESharedAction.ERROR_MESSAGES, props<{ messagesKey: string, extraMessage?: string }>());


export const openModal = createAction(ESharedAction.OPEN_DIALOG, props<{ component: any, config?: any, afterClosed?: any }>());

export const openModalSuccess = createAction(ESharedAction.OPEN_DIALOG_SUCCESS);

export const closeModal = createAction(ESharedAction.CLOSE_DIALOG);

export const closeModalSuccess = createAction(ESharedAction.CLOSE_DIALOG_SUCCESS);


export const openSpinner = createAction(ESharedAction.OPEN_SPINNER);

export const closeSpinner = createAction(ESharedAction.CLOSE_SPINNER);

export const setActiveRouteSuccess = createAction(ESharedAction.SET_ACTIVE_ROUTE_SUCCESS, props<{ route: string }>());

export const getCurrentMonth = createAction(ESharedAction.GET_CURRENT_MONTH, props<{currentMonthNumber: number, currentYearNumber: number}>());
export const getCurrentMonthSucess = createAction(ESharedAction.GET_CURRENT_MONTH_SUCESS, props<{ currentMonth: Dayjs[][] }>());

export const getCurrentMonthNumber = createAction(ESharedAction.GET_CURRENT_MONTH_NUMBER);
export const getCurrentMonthNumberSucess = createAction(ESharedAction.GET_CURRENT_MONTH_NUMBER_SUCESS, props<{ currentMonthNumber: number }>());

export const getCurrentYearNumber = createAction(ESharedAction.GET_CURRENT_YEAR_NUMBER);
export const getCurrentYearNumberSucess = createAction(ESharedAction.GET_CURRENT_YEAR_NUMBER_SUCESS, props<{ currentYearNumber: number }>());

export const changeCurrentMonth = createAction(ESharedAction.CHANGE_CURRENT_MONTH_NUMBER, props<{ monthNumber: number, yearNumber: number}>());
// export const changeCurrentMonthSucess = createAction(ESharedAction.CHANGE_CURRENT_MONTH_NUMBER_SUCESS, props<{ currentMonthNumber: number }>());


export const getSmallCalendarCurrentMonth = createAction(ESharedAction.GET_SMALL_CALENDAR_CURRENT_MONTH, props<{currentSmallCalendarMonthNumber: number, currentSmallCalendarYearNumber: number}>());
export const getSmallCalendarCurrentMonthSucess = createAction(ESharedAction.GET_SMALL_CALENDAR_CURRENT_MONTH_SUCESS, props<{ smallCalendarCurrentMonth: Dayjs[][] }>());
export const getSmallCalendarCurrentYearSucess = createAction(ESharedAction.GET_SMALL_CALENDAR_CURRENT_YEAR_SUCESS, props<{ smallCalendarCurrentYearNumber: number }>());

export const getSmallCalendarCurrentMonthNumber = createAction(ESharedAction.GET_SMALL_CALENDAR_CURRENT_MONTH_NUMBER);
export const getSmallCalendarCurrentMonthNumberSucess = createAction(ESharedAction.GET_SMALL_CALENDAR_CURRENT_MONTH_NUMBER_SUCESS, props<{ smallCalendarCurrentMonthNumber: number }>());

export const changeSmallCalendarCurrentMonth = createAction(ESharedAction.CHANGE_SMALL_CALENDAR_CURRENT_MONTH_NUMBER, props<{ monthNumber: number, yearNumber: number}>());


/**
 * @param Thesis actions
 */
export const getAllThesis = createAction(ESharedAction.GET_THESIS);
export const getAllThesisSuccess = createAction(ESharedAction.GET_THESIS_SUCCESS, props<{thesis: ThesisModel[]}>());

export const getThesisByEmailAndDateRange = createAction(
  ESharedAction.GET_THESIS_BY_EMAIL_AND_DATE_RANGE,
  props<{getThesisByEmailAndDateRangeRequest: GetThesisByEmailAndDateRangeRequest}>());
export const getThesisByEmailAndDateRangeSuccess = createAction(
  ESharedAction.GET_THESIS_BY_EMAIL_AND_DATE_RANGE_SUCCESS, props<{thesis: ThesisModel[]}>());

/**
 * Datatable config actions
 */
export const saveDatatableConfig = createAction(ESharedAction.SAVE_DATABLE_CONFIG, props<{ datatableConfigurationModel: DatatableConfigurationModel }>());
export const resetDatatablesConfig = createAction(ESharedAction.RESET_DATATABLES_CONFIG);
/**
 * Save actions actions
 */
export const saveLastDispatchedAction = createAction(ESharedAction.SAVE_LAST_DISPATCHED_ACTION, props<{ lastDispatchedActionData: any}>());

const all = union({
  navigate,
  successMessages,
  errorMessages,
  openModal,
  openModalSuccess,
  closeModal,
  closeModalSuccess,
  openSpinner,
  closeSpinner,
  setActiveRouteSuccess,
  getCurrentMonth,
  getCurrentMonthSucess,
  changeCurrentMonth,
  getSmallCalendarCurrentMonth,
  getSmallCalendarCurrentMonthSucess,
  getSmallCalendarCurrentMonthNumber,
  getSmallCalendarCurrentMonthNumberSucess,
  changeSmallCalendarCurrentMonth,

});

export type SharedActions = typeof all;
