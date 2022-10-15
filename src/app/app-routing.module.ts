import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPanelGuard} from "./shared/guards/main-panel.guard";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./auth/components/login/login.component";
import {AuthGuard} from "./shared/guards/auth.guard";
import {
  PrimeriAngularMaterialComponent
} from "./auth/components/primeri-angular-material/primeri-angular-material.component";

const routes: Routes = [
  // {
  //   path: '',
  //   component: AppComponent,
  //   canActivate: [MainPanelGuard],
  //   canActivateChild: [MainPanelGuard]
  // },
  {path: 'primer-angular-material', component: PrimeriAngularMaterialComponent},
  {path: '**', redirectTo: 'primer-angular-material'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
