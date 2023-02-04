import {CalendarState, INIT_CALENDAR_STATE} from "../calendar/store/state";
import {AuthState, INIT_AUTH_STATE} from "../auth/store/state";
import {INIT_SHARED_STATE, SharedState} from "../shared/store/state";
import {AdminState, INIT_ADMIN_STATE} from "../admin/store/state";


export interface AppState {
  calendar: CalendarState;
  auth: AuthState;
  shared: SharedState;
  admin: AdminState;
}
export const INIT_APP_STATE: AppState = {
  calendar: INIT_CALENDAR_STATE,
  auth: INIT_AUTH_STATE,
  shared: INIT_SHARED_STATE,
  admin: INIT_ADMIN_STATE
}

export function getInitAppState(): AppState {
  return INIT_APP_STATE;
}
