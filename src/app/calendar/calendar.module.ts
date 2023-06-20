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
import {MonthComponent} from './components/month/month.component';
import {DayComponent} from './components/day/day.component';
import {INIT_CALENDAR_STATE} from "./store/state";
import {EDatatableCalendarAction} from "./constants/constants";
import {CalendarRoutingModule} from "./calendar-routing.module";
import {BigScreenCalendarComponent} from './components/big-screen-calendar/big-screen-calendar.component';
import {SmallScreenCalendarComponent} from './components/small-screen-calendar/small-screen-calendar.component';
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {DaysOfTheWeekGridComponent} from './components/days-of-the-week-grid/days-of-the-week-grid.component';
import {ResponsiveGridComponent} from "./components/responsive-grid/responsive-grid.component";
import {AngularMaterialModule} from "../angular-material/angular-material.module";
import {FormsModule} from "@angular/forms";
import { ResponsiveDayCardComponent } from './components/responsive-day-card/responsive-day-card.component';
import { ResponsiveThesisModalComponent } from './modals/responsive-thesis-modal/responsive-thesis-modal.component';
import {TranslateMonthPipe} from "./pipes/tranlsate-mont-pipe";


const grantedActions = [
  EDatatableCalendarAction.CHANGE_SELECTED_DAY,
  EDatatableCalendarAction.CHANGE_SELECTED_DAY_SUCESS,
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
  declarations: [CalendarComponent, MonthComponent, TranslateMonthPipe, DayComponent, BigScreenCalendarComponent, SmallScreenCalendarComponent, DaysOfTheWeekGridComponent, ResponsiveGridComponent, ResponsiveDayCardComponent, ResponsiveThesisModalComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('calendar', calendarReducers, CALENDAR_CONFIG_TOKEN),
    EffectsModule.forFeature([CalendarEffects]),
    SharedModule,
    CalendarRoutingModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    AngularMaterialModule,
    FormsModule
  ],
  exports: [
    CalendarComponent,
    ResponsiveGridComponent
  ],
  providers: [
    CalendarEffects,
    {provide: CALENDAR_LOCAL_STORAGE_KEY, useValue: '__calendar_storage__'},
    {provide: CALENDAR_STORAGE_KEYS, useValue: Object.keys(INIT_CALENDAR_STATE)},
    {
      provide: CALENDAR_CONFIG_TOKEN,
      deps: [CALENDAR_STORAGE_KEYS, CALENDAR_LOCAL_STORAGE_KEY, LocalStorageService],
      useFactory: getCalendarConfig,
    },
  ]
})
export class CalendarModule {
}
