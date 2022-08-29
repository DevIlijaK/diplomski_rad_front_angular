import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {selectCurrentMonthNumber, selectYearMonthNumber} from "../../store/selectors";
import * as dayjs from "dayjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../../root-store/state";
import {combineLatest, Observable, zip} from "rxjs";
import * as CommonActions from '../../store/actions';
import * as CalendarActions from '../../../calendar/store/actions';
import {Dayjs} from "dayjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  currentMontsNumber$: Observable<number>;
  currentMontsNumberString: string;
  currentMontsNumberNumber: number;
  currentYearNumberNumber: number;

  constructor(
    private store$: Store<AppState>,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    combineLatest(this.store$.select(selectCurrentMonthNumber), this.store$.select(selectYearMonthNumber)).subscribe((data) => {
      console.log(data[0])
      this.currentMontsNumberNumber = data[0];
      this.currentYearNumberNumber = data[1];
        this.currentMontsNumberString = dayjs(new Date(data[1], data[0])).format("MMMM YYYY")
      }
    )
    this.cdr.detectChanges();
  }
  changeCurrentMonth(leftOrRight: number){
    if(leftOrRight === 0){
      this.store$.dispatch(CommonActions.changeCurrentMonth({monthNumber:this.currentMontsNumberNumber -1, yearNumber: this.currentYearNumberNumber}));
    }else if(leftOrRight === 1){
      console.log(this.currentMontsNumberNumber)
      this.store$.dispatch(CommonActions.changeCurrentMonth({monthNumber:this.currentMontsNumberNumber + 1, yearNumber: this.currentYearNumberNumber}));

    }else {
      this.store$.dispatch(CalendarActions.changeSelectedDay({selectedDay: dayjs()}));
      this.store$.dispatch(CommonActions.changeCurrentMonth({monthNumber:dayjs().month(), yearNumber: dayjs().year()}));
    }
  }

}
