import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPanelGuard} from "./shared/guards/main-panel.guard";
import {LoginCustomComponent} from "./auth/components/login-custom/login-custom.component";
import {
  PrimeriAngularMaterialComponent
} from "./auth/components/primeri-angular-material/primeri-angular-material.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', loadChildren: () => import('./shared/shared.module').then(module => module.SharedModule)},
      {path: '', loadChildren: () => import('./calendar/calendar.module').then(module => module.CalendarModule)},
      {path: '', loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule)},
      {path: '', loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule)},
    ],
    canActivate: [MainPanelGuard],
    canActivateChild: [MainPanelGuard]
  },
  // {path: 'primer-angular-material', component: PrimeriAngularMaterialComponent},
  {path: 'login', component: LoginCustomComponent},
  {path: 'primeri', component: PrimeriAngularMaterialComponent},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
