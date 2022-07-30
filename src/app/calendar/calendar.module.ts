import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from "@ngrx/store";
import {calendarReducers} from "./store/reducers";
import {CalendarEffects} from "./store/effects";
import {EffectsModule} from "@ngrx/effects";
import {CALENDAR_CONFIG_TOKEN} from "./calendar.token";
import { CalendarComponent } from './components/calendar/calendar.component';


@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('calendar', calendarReducers, CALENDAR_CONFIG_TOKEN),
    EffectsModule.forFeature([CalendarEffects]),
  ],
  providers: [
    CalendarEffects,
     ]
})
export class CalendarModule { }
