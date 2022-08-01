import {createAction, props, union} from "@ngrx/store";
import {ESharedAction} from "../../shared/constants/constants";
import {Dayjs} from "dayjs";
import {EDatatableCalendarAction} from "../constants/constants";

export const changeSelectedDay = createAction(EDatatableCalendarAction.CHANGE_SELECTED_DAY, props<{ selectedDay: Dayjs }>());
export const getCurrentMonthSucess = createAction(EDatatableCalendarAction.CHANGE_SELECTED_DAY_SUCESS, props<{ selectedDay: Dayjs }>());

const all = union({

})
export type CalendarActions = typeof all;
