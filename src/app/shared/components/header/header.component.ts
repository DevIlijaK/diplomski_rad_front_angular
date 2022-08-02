import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {selectCurrentMonthNumber} from "../../store/selectors";
import * as dayjs from "dayjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../../root-store/state";
import {Observable} from "rxjs";
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

  constructor(
    private store$: Store<AppState>,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.currentMontsNumber$ = this.store$.select(selectCurrentMonthNumber);
    this.currentMontsNumber$.subscribe(currentMontsNumber => {
      this.currentMontsNumberString = dayjs(new Date(dayjs().year(),currentMontsNumber)).format("MMMM YYYY")
      this.currentMontsNumberNumber = currentMontsNumber;
      console.log(this.currentMontsNumberNumber);
    return null;
    })

    this.cdr.detectChanges();
  }
  changeCurrentMonth(leftOrRight: number){
    if(leftOrRight === 0){
      this.store$.dispatch(CommonActions.changeCurrentMonth({monthNumber:this.currentMontsNumberNumber -1}));
    }else if(leftOrRight === 1){
      this.store$.dispatch(CommonActions.changeCurrentMonth({monthNumber:this.currentMontsNumberNumber + 1}));

    }else {
      this.store$.dispatch(CalendarActions.changeSelectedDay({selectedDay: dayjs()}));
      this.store$.dispatch(CommonActions.changeCurrentMonth({monthNumber:dayjs().month()}));
    }
  }

}
