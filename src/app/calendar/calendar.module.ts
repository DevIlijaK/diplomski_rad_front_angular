import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from "@ngrx/store";
import {calendarReducers} from "./store/reducers";
import {CalendarEffects} from "./store/effects";
import {EffectsModule} from "@ngrx/effects";
import {CALENDAR_CONFIG_TOKEN} from "./calendar.token";
import { CalendarComponent } from './components/calendar/calendar.component';
import { SHARED_LOCAL_STORAGE_KEY, SHARED_STORAGE_KEYS} from "../shared/shared.tokens";
import {LocalStorageService} from "../shared/services/local-storage.service";
import {getSharedConfig} from "../app.module";


@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('calendar', calendarReducers, CALENDAR_CONFIG_TOKEN),
    EffectsModule.forFeature([CalendarEffects]),
  ],
  providers: [
    CalendarEffects,
    {
      provide: CALENDAR_CONFIG_TOKEN,
      deps: [SHARED_STORAGE_KEYS, SHARED_LOCAL_STORAGE_KEY, LocalStorageService],
      useFactory: getSharedConfig,
    },
     ]
})
export class CalendarModule { }
