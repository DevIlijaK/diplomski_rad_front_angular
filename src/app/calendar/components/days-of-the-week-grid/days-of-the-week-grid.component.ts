import { Component, OnInit } from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-days-of-the-week-grid',
  templateUrl: './days-of-the-week-grid.component.html',
  styleUrls: ['./days-of-the-week-grid.component.scss']
})
export class DaysOfTheWeekGridComponent implements OnInit {
  daysOfWeek: string[] = ['Nedelja', 'Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota'];
  isSmallScreen = false;
  constructor( private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((result) => {
        this.isSmallScreen = result.matches;
      });
  }

}
