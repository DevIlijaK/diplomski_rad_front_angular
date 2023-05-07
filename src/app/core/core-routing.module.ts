import {RouterModule, Routes} from "@angular/router";
import {MainPanelGuard} from "../shared/guards/main-panel.guard";
import {LoginCustomComponent} from "../auth/components/login-custom/login-custom.component";
import {
  PrimeriAngularMaterialComponent
} from "../auth/components/primeri-angular-material/primeri-angular-material.component";
import {NgModule} from "@angular/core";
import {CoreViewComponent} from "./core-view/core-view.component";

const routes: Routes = [
  {
    path: '',
    component: CoreViewComponent,
    children: [
      {path: '', loadChildren: () => import('../shared/shared.module').then(module => module.SharedModule)},
      {path: '', loadChildren: () => import('../calendar/calendar.module').then(module => module.CalendarModule)},
      {path: '', loadChildren: () => import('../admin/admin.module').then(module => module.AdminModule)},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {
}
