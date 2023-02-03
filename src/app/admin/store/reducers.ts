import {createReducer, on} from "@ngrx/store";
import {CalendarState, INIT_CALENDAR_STATE} from "./state";
import {CalendarActions, changeSelectedDaySucess} from "./actions";


const reducer = createReducer(
  INIT_CALENDAR_STATE,
  on(changeSelectedDaySucess, (state, {selectedDay}) => ({
    ...state,
    selectedDay
  })),
);
export function calendarReducers(state: CalendarState | undefined, action: CalendarActions): CalendarState {
  return reducer(state, action);
}
