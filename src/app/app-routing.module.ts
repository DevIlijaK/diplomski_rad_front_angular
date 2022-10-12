import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPanelGuard} from "./shared/guards/main-panel.guard";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./auth/components/login/login.component";
import {AuthGuard} from "./shared/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivate: [MainPanelGuard],
    canActivateChild: [MainPanelGuard]
  },
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
