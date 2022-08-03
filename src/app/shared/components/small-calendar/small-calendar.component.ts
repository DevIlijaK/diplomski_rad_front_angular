import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../root-store/state";
import {changeSmallCalendarCurrentMonth, getCurrentMonth, getSmallCalendarCurrentMonth} from "../../store/actions";
import {Dayjs} from "dayjs";
import {Observable} from "rxjs";
import {
  selectCurrentMonth,
  selectCurrentMonthNumber,
  selectSmallCalendarCurrentMonth,
  selectSmallCalendarCurrentMonthNumber
} from "../../store/selectors";
import * as SharedActions from '../../store/actions';
import * as dayjs from "dayjs";
import {selectSelectedDay} from "../../../calendar/store/selectors";
import * as CalendarActions from '../../../calendar/store/actions';
import * as CommonActions from "../../store/actions";


@Component({
  selector: 'app-small-calendar',
  templateUrl: './small-calendar.component.html',
  styleUrls: ['./small-calendar.component.scss']
})
export class SmallCalendarComponent implements OnInit, AfterViewInit {

  dayOfTHeWeek: string[] = ['pon', 'uto', 'sre', 'čet', 'pet', 'sub', 'ned'];
  currentMonth$: Observable<Dayjs[][]>;
  currentMontsNumber$: Observable<number>;
  currentMontsNumber: Dayjs;
  selectedDay$: Observable<Dayjs>;
  checkedDay: boolean;

  constructor(
    private store$: Store<AppState>,
    private cdr: ChangeDetectorRef
  ) {
    this.store$.dispatch(SharedActions.getSmallCalendarCurrentMonth());
    this.store$.dispatch(SharedActions.getCurrentMonth());
  }

  ngOnInit(): void {
    this.currentMonth$ = this.store$.select(selectSmallCalendarCurrentMonth);
    this.currentMontsNumber$ = this.store$.select(selectSmallCalendarCurrentMonthNumber);
    this.selectedDay$ = this.store$.select(selectSelectedDay);


    this.currentMontsNumber$.subscribe(currentMontsNumber => {

      this.currentMontsNumber = dayjs(new Date(dayjs().year(),currentMontsNumber))
    })

  }
  ngAfterViewInit() {

    this.cdr.detectChanges();
  }
  changeSelectedDate(day: Dayjs) {
    this.store$.dispatch(CalendarActions.changeSelectedDay({selectedDay: day}));
    if(!(day.format('MM') === dayjs().format('MM'))){
      this.store$.dispatch(CommonActions.changeCurrentMonth({monthNumber:
          day.month() }));
      this.store$.dispatch(CommonActions.changeSmallCalendarCurrentMonth({monthNumber:
          day.month() }));
    }
  }
  changeCurrentMonth(leftOrRight: number){
    if(leftOrRight === 0){
      this.store$.dispatch(CommonActions.changeSmallCalendarCurrentMonth({monthNumber: this.currentMontsNumber.month() -1}));
    }else if(leftOrRight === 1){
      this.store$.dispatch(CommonActions.changeSmallCalendarCurrentMonth({monthNumber: this.currentMontsNumber.month() + 1}));
    }else {
      this.store$.dispatch(CalendarActions.changeSelectedDay({selectedDay: dayjs()}));
      this.store$.dispatch(CommonActions.changeSmallCalendarCurrentMonth({monthNumber: dayjs().month()}));
    }
  }

}
