import {InjectionToken} from "@angular/core";
import {StoreConfig} from "@ngrx/store";
import {AppState} from "../root-store/state";
import {CalendarActions} from "./store/actions";

export const CALENDAR_CONFIG_TOKEN = new InjectionToken<
  StoreConfig<AppState, CalendarActions>
  >('CalendarConfigToken');
