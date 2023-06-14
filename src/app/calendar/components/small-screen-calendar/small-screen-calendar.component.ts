import {Component, OnInit} from '@angular/core';
import * as dayjs from "dayjs";
import {Dayjs} from "dayjs";
import * as CommonActions from "../../../shared/store/actions";

@Component({
  selector: 'app-small-screen-calendar',
  templateUrl: './small-screen-calendar.component.html',
  styleUrls: ['./small-screen-calendar.component.scss']
})
export class SmallScreenCalendarComponent implements OnInit {
  currentDay: Dayjs;

  constructor() {
  }

  ngOnInit(): void {
    this.currentDay = dayjs(new Date());
  }
  changeCurrentMonth(leftOrRight: number) {
    if (leftOrRight === 0) {
      this.currentDay = dayjs(this.currentDay).subtract(1, 'day');
    } else if (leftOrRight === 1) {
      this.currentDay = dayjs(this.currentDay).add(1, 'day');
    }
    // else {
    //   this.store$.dispatch(CalendarActions.changeSelectedDay({selectedDay: dayjs()}));
    //   this.store$.dispatch(CommonActions.changeCurrentMonth({
    //     monthNumber: dayjs().month(),
    //     yearNumber: dayjs().year()
    //   }));
    // }
  }

}
