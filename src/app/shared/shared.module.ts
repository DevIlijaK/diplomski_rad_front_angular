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
import {getSharedConfig} from "../app.module";
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {ToastrModule} from "ngx-toastr";


@NgModule({
  declarations: []
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
  exports: [ ],
  entryComponents: [],
  providers: [
    SharedEffects,
    {provide: SHARED_LOCAL_STORAGE_KEY, useValue: '__shared_storage__'},
    {provide: SHARED_STORAGE_KEYS, useValue: ['language', 'activeRoute']},
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
