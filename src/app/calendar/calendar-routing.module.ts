import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ResponsiveGridComponent } from "./components/responsive-grid/responsive-grid.component";

const routes: Routes = [
  {path: 'calendar', component: ResponsiveGridComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
