import {RouterModule, Routes} from "@angular/router";
import {MainPageComponent} from "./main-page/main-page.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      // {path: '', component: MainPageComponent},
      {path: 'auth', loadChildren: () => import('../auth/auth.module').then(module => module.AuthModule)},
      {path: 'shared', loadChildren: () => import('../shared/shared.module').then(module => module.SharedModule)},
      {path: 'calendar', loadChildren: () => import('../calendar/calendar.module').then(module => module.CalendarModule)},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {
}
