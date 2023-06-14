import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {combineLatest, Observable} from "rxjs";
import {Dayjs} from "dayjs";
import {selectCurrentMonth, selectCurrentMonthNumber, selectYearMonthNumber} from "../../../shared/store/selectors";
import * as dayjs from "dayjs";
import {Store} from "@ngrx/store";
import * as CommonActions from "../../../shared/store/actions";
import * as CalendarActions from "../../store/actions";
import * as SharedActions from '../../../shared/store/actions';

@Component({
  selector: 'app-big-screen-calendar',
  templateUrl: './big-screen-calendar.component.html',
  styleUrls: ['./big-screen-calendar.component.scss']
})
export class BigScreenCalendarComponent implements OnInit, AfterViewInit {
  currentMonth$: Observable<Dayjs[][]>;
  currentMonthsNumberNumber: number;
  currentYearNumberNumber: number;
  currentMonthsNumberString: string;


  constructor(
    private cdr: ChangeDetectorRef,
    private store$: Store
  ) {
  }

  ngOnInit(): void {
    this.store$.dispatch(SharedActions.getCurrentMonth({
      currentMonthNumber: dayjs().month(),
      currentYearNumber: dayjs().year()
    }));
  }

  ngAfterViewInit() {
    this.currentMonth$ = this.store$.select(selectCurrentMonth);
    this.currentMonth$.subscribe((value) => console.log(value));
    combineLatest(this.store$.select(selectCurrentMonthNumber), this.store$.select(selectYearMonthNumber)).subscribe((data) => {
      this.currentMonthsNumberNumber = data[0];
      this.currentYearNumberNumber = data[1];
      this.currentMonthsNumberString = dayjs(new Date(data[1], data[0])).format("MMMM YYYY");
    })

    this.cdr.detectChanges();
  }

  changeCurrentMonth(leftOrRight: number) {
    if (leftOrRight === 0) {
      this.store$.dispatch(CommonActions.changeCurrentMonth({
        monthNumber: this.currentMonthsNumberNumber - 1,
        yearNumber: this.currentYearNumberNumber
      }));
    } else if (leftOrRight === 1) {
      this.store$.dispatch(CommonActions.changeCurrentMonth({
        monthNumber: this.currentMonthsNumberNumber + 1,
        yearNumber: this.currentYearNumberNumber
      }));
    } else {
      this.store$.dispatch(CalendarActions.changeSelectedDay({selectedDay: dayjs()}));
      this.store$.dispatch(CommonActions.changeCurrentMonth({
        monthNumber: dayjs().month(),
        yearNumber: dayjs().year()
      }));
    }
  }
}
