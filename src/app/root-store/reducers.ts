import {ActionReducerMap} from "@ngrx/store";
import {AppState} from "./state";
import {authReducers} from "../auth/store/reducers";
import {sharedReducers} from "../shared/store/reducers";
import {calendarReducers} from "../calendar/store/reducers";

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducers,
  shared: sharedReducers,
  calendar: calendarReducers,
};
