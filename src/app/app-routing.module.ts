import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPanelGuard} from "./shared/guards/main-panel.guard";
import {AppComponent} from "./app.component";
import {AuthGuard} from "./shared/guards/auth.guard";
import {ProbaComponent} from "./proba/proba.component";
import {NavigationComponent} from "./navigation/navigation.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {TreeComponent} from "./tree/tree.component";
import {DragDropComponent} from "./drag-drop/drag-drop.component";
import {TableComponent} from "./table/table.component";

const routes: Routes = [
  // {
  //   path: '',
  //   component: AppComponent,
  //   canActivate: [MainPanelGuard],
  //   canActivateChild: [MainPanelGuard]
  // },
  // {path: 'login', component: LoginComponent},
  {path: 'proba', component: ProbaComponent},
  {path: 'navigation', component: NavigationComponent},
  {path: 'table', component: TableComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'tree', component: TreeComponent},
  {path: 'drag-drop', component: DragDropComponent},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
