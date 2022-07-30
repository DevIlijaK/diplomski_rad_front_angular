import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPanelGuard} from "./shared/guards/main-panel.guard";
import {AuthGuard} from "./shared/guards/auth.guard";
import {CalendarComponent} from "./calendar/components/calendar/calendar.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./calendar/calendar.module').then(module => module.CalendarModule),
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
