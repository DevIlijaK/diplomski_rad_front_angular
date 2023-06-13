import {Component, HostListener, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";


interface CalendarDay {
  date: Date;
  day: number;
}

@Component({
  selector: 'app-responsive-grid',
  templateUrl: './responsive-grid.component.html',
  styleUrls: ['./responsive-grid.component.scss']
})
export class ResponsiveGridComponent implements OnInit {

  calendarDays: CalendarDay[] = [];
  isSmallScreen = false;
  daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


  constructor(private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit() {
    this.generateCalendar();
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((result) => {
        console.log(result);
        this.isSmallScreen = result.matches;
      });
  }

  generateCalendar() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const numDaysInMonth = lastDayOfMonth.getDate();

    const firstDayOfWeek = firstDayOfMonth.getDay();
    const numWeeks = Math.ceil((numDaysInMonth + firstDayOfWeek) / 7);

    let dayCounter = 1;

    for (let week = 0; week < numWeeks; week++) {
      for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
        const date = new Date(year, month, dayCounter);
        const calendarDay: CalendarDay = {
          date,
          day: dayCounter
        };
        this.calendarDays.push(calendarDay);

        dayCounter++;

        if (dayCounter > numDaysInMonth) {
          break;
        }
      }
    }
  }
}
