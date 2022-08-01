import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Dayjs} from "dayjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../../root-store/state";
import * as SharedActions from '../../../shared/store/actions';
import {selectCurrentMonth} from "../../../shared/store/selectors";

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
    this.store$.dispatch(SharedActions.getCurrentMonth());
  }
  ngAfterViewInit() {
    this.currentMonth$ = this.store$.select(selectCurrentMonth);
    this.cdr.detectChanges();
  }

}
