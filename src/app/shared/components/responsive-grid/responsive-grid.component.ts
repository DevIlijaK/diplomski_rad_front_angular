import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Store } from '@ngrx/store';
import { Dayjs } from "dayjs";
import { Observable } from 'rxjs';
import { selectCurrentMonth } from '../../store/selectors';
import * as dayjs from 'dayjs';
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
  daysOfWeek: string[] = ['Nedelja', 'Ponedeljak', 'Utorak', 'Sreda', 'četvrtak', 'Petak', 'Subota'];
  currentMonth$: Observable<Dayjs[][]>;


  constructor(
    private breakpointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef,
    private store$: Store) {
  }

  ngOnInit() {
    this.store$.dispatch(SharedActions.getCurrentMonth({ currentMonthNumber: dayjs().month(), currentYearNumber: dayjs().year() }));
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((result) => {
        console.log(result);
        this.isSmallScreen = result.matches;
      });

  }
  ngAfterViewInit() {
    this.currentMonth$ = this.store$.select(selectCurrentMonth);
    this.currentMonth$.subscribe((value) => console.log(value));
    this.cdr.detectChanges();
  }
}
