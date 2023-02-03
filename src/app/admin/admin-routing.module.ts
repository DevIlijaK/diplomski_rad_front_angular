import {RouterModule, Routes} from "@angular/router";
import {MainPanelGuard} from "./guards/main-panel.guard";
import {LoginCustomComponent} from "../auth/components/login-custom/login-custom.component";
import {NgModule} from "@angular/core";

// const routes: Routes = [
//   {
//     path: '',
//
//     loadChildren: () => import('./shared/shared.module').then(module => module.SharedModule),
//     canActivate: [MainPanelGuard],
//     canActivateChild: [MainPanelGuard]
//   },
//   // {path: 'primer-angular-material', component: PrimeriAngularMaterialComponent},
//   {path: 'login', component: LoginCustomComponent},
//   {path: '**', redirectTo: ''},
// ];
//
// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class SharedRoutingModule { }
