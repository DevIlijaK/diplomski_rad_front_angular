import {CalendarState, INIT_CALENDAR_STATE} from "../calendar/store/state";


export interface AppState {
  calendar: CalendarState;
}
export const INIT_APP_STATE: AppState = {
  calendar: INIT_CALENDAR_STATE,
}

export function getInitAppState(): AppState {
  return INIT_APP_STATE;
}
