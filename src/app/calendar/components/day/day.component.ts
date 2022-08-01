import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import * as dayjs from "dayjs";
import {Dayjs} from "dayjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../../root-store/state";
import * as CalendarActions from '../../store/actions';
import {Observable} from "rxjs";
import {selectSelectedDay} from "../../store/selectors";

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit, AfterViewInit {


  @Input() dayName: string;
  @Input() day: Dayjs;
  @Input() calendarRowIndex: number;

  selectedDay$: Observable<Dayjs>;

  constructor(
    private store$: Store<AppState>,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.selectedDay$ = this.store$.select(selectSelectedDay);
    this.selectedDay$.subscribe(value => console.log(value));
    this.cdr.detectChanges();
  }

  chackTodaysDate(): boolean {
    return this.day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
  }

  checkDayAfterOrBefore(): boolean {
    return this.day <= dayjs()
  }

  changeSelectedDate() {
    this.store$.dispatch(CalendarActions.changeSelectedDay({selectedDay: this.day}));
  }


}
