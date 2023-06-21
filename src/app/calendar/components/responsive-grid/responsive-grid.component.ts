import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import * as dayjs from "dayjs";
import {Dayjs} from "dayjs";
import {Observable} from 'rxjs';
import * as SharedActions from '../../../shared/store/actions';


interface CalendarDay {
  date: Date;
  day: number;
}

@Component({
  selector: 'app-responsive-grid',
  templateUrl: './responsive-grid.component.html',
  styleUrls: ['./responsive-grid.component.scss']
})
export class ResponsiveGridComponent implements OnInit {

  isSmallScreen = false;


  constructor(
    private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((result) => {
        this.isSmallScreen = result.matches;
      });
  }

}
