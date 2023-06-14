import {RouterModule, Routes} from "@angular/router";
import {MainPanelGuard} from "./guards/main-panel.guard";
import {LoginCustomComponent} from "../auth/components/login-custom/login-custom.component";
import {NgModule} from "@angular/core";
import {ResponsiveSidenavComponent} from "../core/responsive-sidenav/responsive-sidenav.component";

const routes: Routes = [
  {path: 'proba', component: ResponsiveSidenavComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
