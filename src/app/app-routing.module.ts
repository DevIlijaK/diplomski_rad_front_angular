import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPanelGuard} from "./shared/guards/main-panel.guard";
import {LoginCustomComponent} from "./auth/components/login-custom/login-custom.component";

const routes: Routes = [
  {
    path: '',
    component: LoginCustomComponent,
    canActivate: [MainPanelGuard],
    canActivateChild: [MainPanelGuard]
  },
  // {path: 'primer-angular-material', component: PrimeriAngularMaterialComponent},
  {path: 'login', component: LoginCustomComponent},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
