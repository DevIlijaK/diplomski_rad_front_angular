import {InjectionToken} from "@angular/core";
import {AuthState} from "./store/state";
import {StoreConfig} from "@ngrx/store";
import {AppState} from "../root-store/state";
import {AuthActions} from "./store/actions";

export const AUTH_STORAGE_KEYS = new InjectionToken<keyof AuthState[]>(
  'AuthStorageKeys',
);
export const AUTH_LOCAL_STORAGE_KEY = new InjectionToken<string[]>(
  'AuthStorage',
);
export const AUTH_CONFIG_TOKEN = new InjectionToken<
  StoreConfig<AppState, AuthActions>
  >('AuthConfigToken');
export class AuthModuleConfig {
  baseUrl: string;
  loginCompanyLogoName?: string;
}
