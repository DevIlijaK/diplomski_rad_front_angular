import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../root-store/state";
import {getCurrentMonth} from "../../store/actions";
import {Dayjs} from "dayjs";
import {Observable} from "rxjs";
import {selectCurrentMonth, selectCurrentMonthNumber} from "../../store/selectors";
import * as SharedActions from '../../store/actions';
import * as dayjs from "dayjs";


@Component({
  selector: 'app-small-calendar',
  templateUrl: './small-calendar.component.html',
  styleUrls: ['./small-calendar.component.scss']
})
export class SmallCalendarComponent implements OnInit, AfterViewInit {

  dayOfTHeWeek: string[] = ['pon', 'uto', 'sre', 'čet', 'pet', 'sub', 'ned'];
  currentMonth$: Observable<Dayjs[][]>;
  currentMontsNumber$: Observable<number>;
  currentMontsNumber: string;

  constructor(
    private store$: Store<AppState>,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.store$.dispatch(SharedActions.getCurrentMonthNumber());
    this.store$.dispatch(SharedActions.getCurrentMonth());
  }
  ngAfterViewInit() {
    this.currentMonth$ = this.store$.select(selectCurrentMonth);
    this.currentMontsNumber$ = this.store$.select(selectCurrentMonthNumber);
    this.currentMontsNumber$.subscribe(currentMontsNumber => this.currentMontsNumber = dayjs(new Date(dayjs().year(),currentMontsNumber)).format("MMMM YYYY"))
    this.cdr.detectChanges();
  }

}
