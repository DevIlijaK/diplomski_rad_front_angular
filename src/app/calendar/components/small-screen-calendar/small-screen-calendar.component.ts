import {Component, OnInit} from '@angular/core';
import {MatCalendarCellClassFunction} from "@angular/material/datepicker";
import {Store} from "@ngrx/store";
import * as LibSharedActions from '../../../shared/store/actions';
import {Subject} from "rxjs";
import {selectLoggedInUser} from "../../../auth/store/selectors";
import {LoggedInUser} from "../../../auth/model/loggedInUser";

/**Treba da se doradi da se u memoriji sacuva selektovani dan **/

@Component({
  selector: 'app-small-screen-calendar',
  templateUrl: './small-screen-calendar.component.html',
  styleUrls: ['./small-screen-calendar.component.scss']
})
export class SmallScreenCalendarComponent implements OnInit {
  date: Date;
  dateChanged$: Subject<Date> = new Subject<Date>();
  logedInUser: LoggedInUser;

  constructor(private store$: Store) {
  }


  ngOnInit(): void {
    this.date = new Date();

    this.dispatch();
    this.subscribeToDateChanges();
    this.store$.select(selectLoggedInUser).subscribe(user => this.logedInUser = user);
  }

  dispatch(): void {
    this.dispatchGetThesisByEmailAndDateRange();
  }

  subscribeToDateChanges(): void {
    this.dateChanged$.subscribe((newDate: Date) => {
      this.dispatchGetThesisByEmailAndDateRange();
    });
  }

  changeCurrentDay(leftOrRight: number) {
    const newDate = new Date(this.date);

    if (leftOrRight === 0) {
      newDate.setDate(newDate.getDate() - 1);
    } else if (leftOrRight === 1) {
      newDate.setDate(newDate.getDate() + 1);
    }
    this.date = newDate;
    this.dateChanged$.next(this.date);
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {

    const date = cellDate.getDate();

    if (view == 'month') {
      if (date == 1) {
        console.log('uslo ovde 2')
        return 'button-with-star';
      }
      return "";
    }
    return "";
  }

  onDateChange() {
    this.dispatchGetThesisByEmailAndDateRange();
  }

  /*Ovde mora da se mail zameni sa mailom ulogovanog korisnika*/
  dispatchGetThesisByEmailAndDateRange() {
    console.log('ulazi ovde');
    this.store$.dispatch(LibSharedActions.getThesisByEmailAndDateRange({
      getThesisByEmailAndDateRangeRequest:
        {
          email: this.logedInUser?.email,
          startDate: new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), 0, 0, 0, 0),
          endDate: new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), 23, 59, 59, 999)
        }
    }))
  }

}
