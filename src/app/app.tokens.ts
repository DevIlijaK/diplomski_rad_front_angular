// token for the state keys.
import {InjectionToken} from "@angular/core";

export const ROOT_STORAGE_KEYS = new InjectionToken<string[]>('StoreKeys');
// token for the localStorage key.
export const ROOT_LOCAL_STORAGE_KEY = new InjectionToken<string[]>(
  'appStorage',
);
