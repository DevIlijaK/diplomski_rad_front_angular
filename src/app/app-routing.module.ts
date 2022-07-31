import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPanelGuard} from "./shared/guards/main-panel.guard";
import {AuthGuard} from "./shared/guards/auth.guard";
import {CalendarComponent} from "./calendar/components/calendar/calendar.component";
import {AppComponent} from "./app.component";

const routes: Routes = [
  {
    path: '',
    component: CalendarComponent,
    canActivate: [MainPanelGuard],
    canActivateChild: [MainPanelGuard]
  },
  {path: 'login', component: CalendarComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
