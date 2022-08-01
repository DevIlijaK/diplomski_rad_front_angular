import {createReducer, on} from "@ngrx/store";
import {CalendarState, INIT_CALENDAR_STATE} from "./state";
import {CalendarActions, getCurrentMonthSucess} from "./actions";
import {getCurrentMonthNumberSucess} from "../../shared/store/actions";


const reducer = createReducer(
  INIT_CALENDAR_STATE,
  on(getCurrentMonthSucess, (state, {selectedDay}) => ({
    ...state,
    selectedDay
  })),
);
export function calendarReducers(state: CalendarState | undefined, action: CalendarActions): CalendarState {
  return reducer(state, action);
}
