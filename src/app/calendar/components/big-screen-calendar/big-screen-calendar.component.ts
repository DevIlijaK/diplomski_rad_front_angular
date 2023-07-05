import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Observable, Subject, takeUntil} from "rxjs";
import * as dayjs from "dayjs";
import {Dayjs} from "dayjs";
import {
  selectCurrentMonth,
  selectCurrentMonthNumber,
  selectThesis,
  selectYearMonthNumber
} from "../../../shared/store/selectors";
import {Store} from "@ngrx/store";
import * as CommonActions from "../../../shared/store/actions";
import * as SharedActions from "../../../shared/store/actions";
import * as LibSharedActions from "../../../shared/store/actions";
import * as CalendarActions from "../../store/actions";
import {first} from "rxjs/operators";
import {ThesisModel} from "../../../shared/models/thesis.model";
import {selectLoggedInUser} from "../../../auth/store/selectors";
import * as ics from "ics";
import {saveAs} from 'file-saver';


@Component({
  selector: 'app-big-screen-calendar',
  templateUrl: './big-screen-calendar.component.html',
  styleUrls: ['./big-screen-calendar.component.scss']
})
export class BigScreenCalendarComponent implements OnInit, AfterViewInit, OnDestroy {
  currentMonth$: Observable<Dayjs[][]>;
  currentMonthsNumberNumber: number;
  currentYearNumberNumber: number;
  currentMonthsNumberString: string;
  thesisData$: Observable<ThesisModel[]>;
  ngUnsubscribe: Subject<void> = new Subject<void>();
  logedInUser: any;


  constructor(
    private cdr: ChangeDetectorRef,
    private store$: Store
  ) {
  }

  ngOnInit(): void {
    this.dispatch();
    this.store$.select(selectLoggedInUser).subscribe(user => this.logedInUser = user);
  }

  dispatch(): void {
    this.store$.dispatch(SharedActions.getCurrentMonth({
      currentMonthNumber: dayjs().month(),
      currentYearNumber: dayjs().year()
    }));
  }

  ngAfterViewInit() {
    this.currentMonth$ = this.store$.select(selectCurrentMonth);
    combineLatest(this.store$.select(selectCurrentMonthNumber), this.store$.select(selectYearMonthNumber))
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe((data) => {
      this.currentMonthsNumberNumber = data[0];
      this.currentYearNumberNumber = data[1];
      this.currentMonthsNumberString = dayjs(new Date(data[1], data[0])).format("MMMM YYYY");
    })
    this.dispatchGetThesisByEmailAndDateRange();
    this.thesisData$ = this.store$.select(selectThesis);

    this.cdr.detectChanges();
  }

  changeCurrentMonth(leftOrRight: number) {
    if (leftOrRight === 0) {
      this.store$.dispatch(CommonActions.changeCurrentMonth({
        monthNumber: this.currentMonthsNumberNumber - 1,
        yearNumber: this.currentYearNumberNumber
      }));
    } else if (leftOrRight === 1) {
      this.store$.dispatch(CommonActions.changeCurrentMonth({
        monthNumber: this.currentMonthsNumberNumber + 1,
        yearNumber: this.currentYearNumberNumber
      }));
    } else {
      this.store$.dispatch(CalendarActions.changeSelectedDay({selectedDay: dayjs()}));
      this.store$.dispatch(CommonActions.changeCurrentMonth({
        monthNumber: dayjs().month(),
        yearNumber: dayjs().year()
      }));
    }
    this.dispatchGetThesisByEmailAndDateRange();
  }

  dispatchGetThesisByEmailAndDateRange() {
    this.getFirstAndLastDayHours(this.currentMonth$).then(r =>
      this.store$.dispatch(LibSharedActions.getThesisByEmailAndDateRange({
        getThesisByEmailAndDateRangeRequest:
          {
            email: this.logedInUser.email,
            ...r
          }
      }))
    );
  }

  async getFirstAndLastDayHours(currentMonth$: Observable<Dayjs[][]>): Promise<{ startDate: Date, endDate: Date }> {
    const currentMonth = await currentMonth$.pipe(first()).toPromise();
    const startDate = currentMonth[0][0].startOf('day').toDate();
    const endDate = currentMonth[currentMonth.length - 1][currentMonth[currentMonth.length - 1].length - 1].endOf('day').toDate();
    return {startDate, endDate};
  }

  protected readonly dayjs = dayjs;

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  generateICalendarFIle() {
    let events = []
    this.thesisData$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(thesisList => {
      thesisList.map(thesis => {
        let alarms = [];
        events.push({
          title: 'Odbrana diplomskog rada - ' + thesis.student.full_name,
          description: thesis.thesisTitle,
          // busyStatus: 'FREE',
          start: [
            thesis.thesisDateOfDefense.getFullYear(),
            thesis.thesisDateOfDefense.getMonth() + 1,
            thesis.thesisDateOfDefense.getDate(),
            thesis.thesisDateOfDefense.getHours(),
            thesis.thesisDateOfDefense.getMinutes()],
          duration: {minutes: 50},
          alarms: alarms,
        })
        alarms.push({
          action: 'display',
          trigger: {hours: 2, minutes: 0, before: true},
        })


      })
    })
    ics.createEvents(events
      , (error, value) => {
        if (error) {
          console.log(error)
        }

        const blob = new Blob([value], { type: 'text/calendar;charset=utf-8' });
        saveAs(blob, 'event.ics');
      })


  }
}
