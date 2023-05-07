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
      {path: '', loadChildren: () => import('./core/core.module').then(module => module.CoreModule)},
      {path: '', loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule)},
    ],
    canActivate: [MainPanelGuard],
    canActivateChild: [MainPanelGuard]
  },
  {path: 'login', component: LoginCustomComponent},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
