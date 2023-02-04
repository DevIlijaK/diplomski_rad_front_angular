import {StoreConfig} from '@ngrx/store';
import {InjectionToken} from '@angular/core';
import {AdminState} from './store/state';
import {AppState} from '../root-store/state';
import {AdminActions} from "./store/actions";


export const ADMIN_STORAGE_KEYS = new InjectionToken<keyof AdminState[]>(
  'AdminStorageKeys',
);
export const ADMIN_LOCAL_STORAGE_KEY = new InjectionToken<string[]>(
  'AdminStorage',
);
export const ADMIN_CONFIG_TOKEN = new InjectionToken<
  StoreConfig<AppState, AdminActions>
  >('AdminConfigToken');
