import {Component, OnInit} from '@angular/core';
import {MatCalendarCellClassFunction} from "@angular/material/datepicker";
import {Store} from "@ngrx/store";
import * as LibSharedActions from '../../../shared/store/actions';
import {
  GetThesisByEmailAndDateRangeRequest
} from "../../../shared/models/requests/get-thesis-by-email-and-date-range-request";

@Component({
  selector: 'app-small-screen-calendar',
  templateUrl: './small-screen-calendar.component.html',
  styleUrls: ['./small-screen-calendar.component.scss']
})
export class SmallScreenCalendarComponent implements OnInit {
  date: Date;
  randomWords: string[];

  constructor(private store$: Store) {
  }

  /*Ovde mora da se mail zameni sa mailom ulogovanog korisnika*/
  ngOnInit(): void {
    this.date = new Date();
    this.randomWords = this.generateRandomWords(24);
    this.store$.dispatch(LibSharedActions.getThesisByEmailAndDateRange({
      getThesisByEmailAndDateRangeRequest:
        {
          email: 'test@test',
          startDate: new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), 0, 0, 0, 0),
          endDate: new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), 23, 59, 59, 999)
        }
    }))
  }

  changeCurrentDay(leftOrRight: number) {
    const newDate = new Date(this.date);

    if (leftOrRight === 0) {
      newDate.setDate(newDate.getDate() - 1);
    } else if (leftOrRight === 1) {
      newDate.setDate(newDate.getDate() + 1);
    }

    this.date = newDate;
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {

    const date = cellDate.getDate();

    if (view == 'month') {
      console.log('uslo ovdeeee');
      if (date == 1) {
        console.log('uslo ovde 2')
        return 'button-with-star';
      }
      return "";
    }

    return "";
  }

  generateRandomWords(count: number): string[] {
    const words = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit'];
    const randomWords: string[] = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * words.length);
      randomWords.push(words[randomIndex]);
    }
    return randomWords;
  }

}
