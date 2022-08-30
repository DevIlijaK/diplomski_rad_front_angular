import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {StoreModule} from "@ngrx/store";
import {sharedReducers} from "./store/reducers";
import {EffectsModule} from "@ngrx/effects";
import {SharedEffects} from "./store/effects";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {SHARED_CONFIG_TOKEN, SHARED_LOCAL_STORAGE_KEY, SHARED_STORAGE_KEYS} from "./shared.tokens";
import {LocalStorageService} from "./services/local-storage.service";
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {ToastrModule} from "ngx-toastr";
import {MetaReducer} from "@ngrx/store/src/models";
import {storageMetaReducerFactory} from "./services/storage.metareducer";
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SendMailButtonComponent } from './components/send-mail-button/send-mail-button.component';
import {SmallCalendarComponent} from "./components/small-calendar/small-calendar.component";
import {ESharedAction} from "./constants/constants";
import {INIT_SHARED_STATE} from "./store/state";
import {INIT_AUTH_STATE} from "../auth/store/state";
import { EventModalComponent } from './components/event-modal/event-modal.component';
import {ThesisApiService} from "./api/thesis-api.service";

const grantedActions = [
  ESharedAction.NAVIGATE,
  ESharedAction.SUCCESS_MESSAGES,
  ESharedAction.ERROR_MESSAGES,
  ESharedAction.OPEN_DIALOG,
  ESharedAction.OPEN_DIALOG_SUCCESS,
  ESharedAction.CLOSE_DIALOG,
  ESharedAction.CLOSE_DIALOG_SUCCESS,
  ESharedAction.OPEN_SPINNER,
  ESharedAction.CLOSE_SPINNER,
  ESharedAction.SET_ACTIVE_ROUTE_SUCCESS,
  ESharedAction.GET_CURRENT_MONTH,
  ESharedAction.GET_CURRENT_MONTH_SUCESS,
  ESharedAction.GET_CURRENT_MONTH_NUMBER,
  ESharedAction.GET_CURRENT_MONTH_NUMBER_SUCESS,
];

export function getSharedConfig(
  saveKeys: string[],
  localStorageKey: string,
  storageService: LocalStorageService,
): { metaReducers: MetaReducer<any>[] } {
  return {
    metaReducers: [
      storageMetaReducerFactory(saveKeys, localStorageKey, storageService, grantedActions),
    ],
  };
}

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    SendMailButtonComponent,
    SmallCalendarComponent,
    EventModalComponent,
  ]
  ,
  imports: [
    CommonModule,
    StoreModule.forFeature('shared', sharedReducers, SHARED_CONFIG_TOKEN),
    EffectsModule.forFeature([SharedEffects]),
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 3000,
      tapToDismiss: true,
      positionClass: 'toast-top-center',
      progressBar: true,
      progressAnimation: 'decreasing',
      preventDuplicates: true,
      enableHtml: true,
    }),
    ReactiveFormsModule,
    RouterModule,

  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    SmallCalendarComponent
  ],
  entryComponents: [],
  providers: [
    SharedEffects,
    EventModalComponent,
    ThesisApiService,
    {provide: SHARED_LOCAL_STORAGE_KEY, useValue: '__shared_storage__'},
    {provide: SHARED_STORAGE_KEYS, useValue: Object.keys(INIT_SHARED_STATE)},
    {
      provide: SHARED_CONFIG_TOKEN,
      deps: [SHARED_STORAGE_KEYS, SHARED_LOCAL_STORAGE_KEY, LocalStorageService],
      useFactory: getSharedConfig,
    },
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ],
})
export class SharedModule {
}
