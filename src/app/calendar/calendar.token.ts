import {InjectionToken} from "@angular/core";
import {StoreConfig} from "@ngrx/store";
import {AppState} from "../root-store/state";
import {CalendarActions} from "./store/actions";
import {CalendarState} from "./store/state";


export const CALENDAR_STORAGE_KEYS = new InjectionToken<keyof CalendarState[]>('CalendarStorageKeys');

export const CALENDAR_LOCAL_STORAGE_KEY = new InjectionToken<string>('CalendarStorage');

export const CALENDAR_CONFIG_TOKEN = new InjectionToken<
  StoreConfig<AppState, CalendarActions>
  >('CalendarConfigToken');
