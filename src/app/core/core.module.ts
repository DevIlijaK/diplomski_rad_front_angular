import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import {SharedModule} from "../shared/shared.module";
import {CalendarModule} from "../calendar/calendar.module";
import {CoreRoutingModule} from "./core-routing.module";



@NgModule({
  declarations: [
    MainPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CalendarModule,
    CoreRoutingModule
  ]
})
export class CoreModule { }