import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../root-store/state";
import * as SharedActions from "../../store/actions";
import * as CommonActions from "../../store/actions";
import * as dayjs from "dayjs";
import {Dayjs} from "dayjs";
import {combineLatest, Observable} from "rxjs";
import {
  selectCurrentMonthNumber,
  selectSmallCalendarCurrentMonth,
  selectSmallCalendarCurrentMonthNumber,
  selectSmallCalendarCurrentYearNumber, selectYearMonthNumber
} from "../../store/selectors";
import {selectSelectedDay} from "../../../calendar/store/selectors";
import * as CalendarActions from '../../../calendar/store/actions';


@Component({
  selector: 'app-small-calendar',
  templateUrl: './small-calendar.component.html',
  styleUrls: ['./small-calendar.component.scss']
})
export class SmallCalendarComponent implements OnInit, AfterViewInit {

  dayOfTHeWeek: string[] = ['pon', 'uto', 'sre', 'čet', 'pet', 'sub', 'ned'];
  currentMonth$: Observable<Dayjs[][]>;
  currentMontsNumber$: Observable<number>;
  currentMontsNumber: number;
  currentYearNumber: number;
  selectedDay$: Observable<Dayjs>;
  displayDate: Dayjs;

  constructor(
    private store$: Store<AppState>,
    private cdr: ChangeDetectorRef
  ) {
    this.store$.dispatch(SharedActions.getSmallCalendarCurrentMonth({currentSmallCalendarMonthNumber: dayjs().month(), currentSmallCalendarYearNumber: dayjs().year()}));
  }

  ngOnInit(): void {
    this.currentMonth$ = this.store$.select(selectSmallCalendarCurrentMonth);
    this.selectedDay$ = this.store$.select(selectSelectedDay);

    combineLatest(this.store$.select(selectSmallCalendarCurrentMonthNumber), this.store$.select(selectSmallCalendarCurrentYearNumber)).subscribe((data) => {
        this.currentMontsNumber = data[0];
        this.currentYearNumber = data[1];
      this.displayDate = dayjs(new Date(this.currentYearNumber, this.currentMontsNumber))
      }
    )

  }

  ngAfterViewInit() {

    this.cdr.detectChanges();
  }

  changeSelectedDate(day: Dayjs) {
    this.store$.dispatch(CalendarActions.changeSelectedDay({selectedDay: day}));
    this.store$.dispatch(CommonActions.changeCurrentMonth({monthNumber: day.month(), yearNumber: day.year()}));
    this.store$.dispatch(CommonActions.changeSmallCalendarCurrentMonth({monthNumber: day.month(), yearNumber: day.year()}));

  }

  changeCurrentMonth(leftOrRight: number) {
    if (leftOrRight === 0) {
      this.store$.dispatch(CommonActions.changeSmallCalendarCurrentMonth({monthNumber: this.currentMontsNumber - 1, yearNumber: this.currentYearNumber}));
    } else if (leftOrRight === 1) {
      console.log(1);
      this.store$.dispatch(CommonActions.changeSmallCalendarCurrentMonth({monthNumber: this.currentMontsNumber + 1, yearNumber: this.currentYearNumber}));
    }
  }

}
