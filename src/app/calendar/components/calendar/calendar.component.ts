import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Observable, zip} from "rxjs";
import {Dayjs} from "dayjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../../root-store/state";
import * as SharedActions from '../../../shared/store/actions';
import {selectCurrentMonth, selectCurrentMonthNumber, selectYearMonthNumber} from "../../../shared/store/selectors";
import * as dayjs from "dayjs";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, AfterViewInit {

  currentMonth$: Observable<Dayjs[][]>;


  constructor(
    private store$: Store<AppState>,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.store$.dispatch(SharedActions.getCurrentMonth({currentMonthNumber: dayjs().month(), currentYearNumber: dayjs().year()}));
    this.store$.dispatch(SharedActions.getAllThesis());
  }
  ngAfterViewInit() {
    this.currentMonth$ = this.store$.select(selectCurrentMonth);
    this.cdr.detectChanges();
  }

}
