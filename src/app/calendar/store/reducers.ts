import {createReducer} from "@ngrx/store";
import {CalendarState, INIT_CALENDAR_STATE} from "./state";
import {CalendarActions} from "./actions";


const reducer = createReducer(
  INIT_CALENDAR_STATE,
);
export function calendarReducers(state: CalendarState | undefined, action: CalendarActions): CalendarState {
  return reducer(state, action);
}
