import { StoreConfig } from '@ngrx/store';
import { InjectionToken } from '@angular/core';
import {SharedState} from './store/state';
import {AppState} from '../root-store/state';
import {SharedActions} from './store/actions';

export const SHARED_STORAGE_KEYS = new InjectionToken<keyof SharedState[]>(
  'SharedStorageKeys',
);
export const SHARED_LOCAL_STORAGE_KEY = new InjectionToken<string[]>(
  'SharedStorage',
);
export const SHARED_CONFIG_TOKEN = new InjectionToken<
  StoreConfig<AppState, SharedActions>
>('SharedConfigToken');
