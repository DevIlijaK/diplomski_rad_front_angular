import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from "@ngrx/store";
import {calendarReducers} from "./store/reducers";
import {CalendarEffects} from "./store/effects";
import {EffectsModule} from "@ngrx/effects";
import {CALENDAR_CONFIG_TOKEN, CALENDAR_LOCAL_STORAGE_KEY, CALENDAR_STORAGE_KEYS} from "./calendar.token";
import {CalendarComponent} from './components/calendar/calendar.component';
import {LocalStorageService} from "../shared/services/local-storage.service";
import {MetaReducer} from "@ngrx/store/src/models";
import {storageMetaReducerFactory} from "../shared/services/storage.metareducer";
import {SharedModule} from "../shared/shared.module";
import { SmallCalendarComponent } from '../shared/components/small-calendar/small-calendar.component';


const grantedActions = [

];

export function getCalendarConfig(saveKeys: string[],
                                    localStorageKey: string,
                                    storageService: LocalStorageService): { metaReducers: MetaReducer<any>[] } {
  return {
    metaReducers: [
      storageMetaReducerFactory(saveKeys, localStorageKey, storageService, grantedActions)
    ]
  };
}
@NgModule({
    declarations: [CalendarComponent],
    imports: [
        CommonModule,
        StoreModule.forFeature('calendar', calendarReducers, CALENDAR_CONFIG_TOKEN),
        EffectsModule.forFeature([CalendarEffects]),
        SharedModule,
    ],
    exports: [
    ],
    providers: [
        CalendarEffects,
        {
            provide: CALENDAR_CONFIG_TOKEN,
            deps: [CALENDAR_STORAGE_KEYS, CALENDAR_LOCAL_STORAGE_KEY, LocalStorageService],
            useFactory: getCalendarConfig,
        },
    ]
})
export class CalendarModule { }
