import {Component, Input, OnInit} from '@angular/core';
import * as dayjs from "dayjs";
import {Dayjs} from "dayjs";
import * as CommonActions from "../../../shared/store/actions";
import {MatCalendarCellClassFunction, MatCalendarCellCssClasses} from "@angular/material/datepicker";

@Component({
  selector: 'app-small-screen-calendar',
  templateUrl: './small-screen-calendar.component.html',
  styleUrls: ['./small-screen-calendar.component.scss']
})
export class SmallScreenCalendarComponent implements OnInit {
  date: Date;
  randomWords: string[];

  constructor() {
  }

  ngOnInit(): void {
    this.date = new Date();
    this.randomWords = this.generateRandomWords(24);
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
        return 'highlight-date';
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
