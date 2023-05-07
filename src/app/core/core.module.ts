import {ESharedAction} from "../shared/constants/constants";
import {LocalStorageService} from "../shared/services/local-storage.service";
import {MetaReducer} from "@ngrx/store/src/models";
import {storageMetaReducerFactory} from "../shared/services/storage.metareducer";
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {HeaderComponent} from "../shared/components/header/header.component";
import {SidebarComponent} from "../shared/components/sidebar/sidebar.component";
import {SendMailButtonComponent} from "../shared/components/send-mail-button/send-mail-button.component";
import {SmallCalendarComponent} from "../shared/components/small-calendar/small-calendar.component";
import {EventModalComponent} from "../shared/components/event-modal/event-modal.component";
import {PanelComponent} from "../shared/components/panel/panel.component";
import {SearchInputComponent} from "../shared/components/search-input/search-input.component";
import {CommonModule} from "@angular/common";
import {StoreModule} from "@ngrx/store";
import {sharedReducers} from "../shared/store/reducers";
import {SHARED_CONFIG_TOKEN, SHARED_LOCAL_STORAGE_KEY, SHARED_STORAGE_KEYS} from "../shared/shared.tokens";
import {EffectsModule} from "@ngrx/effects";
import {SharedEffects} from "../shared/store/effects";
import {ToastrModule} from "ngx-toastr";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {AngularMaterialModule} from "../angular-material/angular-material.module";
import {ThesisApiService} from "../shared/api/thesis-api.service";
import {INIT_SHARED_STATE} from "../shared/store/state";
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {CoreViewComponent} from "./core-view/core-view.component";
import {CoreRoutingModule} from "./core-routing.module";
import {AuthModule} from "../auth/auth.module";
import {SharedModule} from "../shared/shared.module";
import {CalendarModule} from "../calendar/calendar.module";
import {NgxSpinnerModule} from "ngx-spinner";

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
  ESharedAction.RESET_DATATABLES_CONFIG,
  ESharedAction.SAVE_DATABLE_CONFIG,
  ESharedAction.SAVE_LAST_DISPATCHED_ACTION
];

// export function getSharedConfig(
//   saveKeys: string[],
//   localStorageKey: string,
//   storageService: LocalStorageService,
// ): { metaReducers: MetaReducer<any>[] } {
//   return {
//     metaReducers: [
//       storageMetaReducerFactory(saveKeys, localStorageKey, storageService, grantedActions),
//     ],
//   };
// }

@NgModule({
  declarations: [
    CoreViewComponent
  ]
  ,
  imports: [
    AngularMaterialModule,
    CoreRoutingModule,
    AuthModule,
    SharedModule,
    CalendarModule,
    NgxSpinnerModule,
  ],
  exports: [],
  entryComponents: [],
  providers: [
    SharedEffects,
    EventModalComponent,
    ThesisApiService,
    // {provide: SHARED_LOCAL_STORAGE_KEY, useValue: '__shared_storage__'},
    // {provide: SHARED_STORAGE_KEYS, useValue: Object.keys(INIT_SHARED_STATE)},
    // {
    //   provide: SHARED_CONFIG_TOKEN,
    //   deps: [SHARED_STORAGE_KEYS, SHARED_LOCAL_STORAGE_KEY, LocalStorageService],
    //   useFactory: getSharedConfig,
    // },
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class CoreModule {
}
