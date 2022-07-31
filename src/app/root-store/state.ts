import {CalendarState, INIT_CALENDAR_STATE} from "../calendar/store/state";
import {AuthState, INIT_AUTH_STATE} from "../auth/store/state";
import {INIT_SHARED_STATE, SharedState} from "../shared/store/state";


export interface AppState {
  calendar: CalendarState;
  auth: AuthState;
  shared: SharedState;
}
export const INIT_APP_STATE: AppState = {
  calendar: INIT_CALENDAR_STATE,
  auth: INIT_AUTH_STATE,
  shared: INIT_SHARED_STATE,
}

export function getInitAppState(): AppState {
  return INIT_APP_STATE;
}
