import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {combineLatest, Observable} from "rxjs";
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

export interface DataModel { date: Dayjs, matches: number }

@Component({
  selector: 'app-big-screen-calendar',
  templateUrl: './big-screen-calendar.component.html',
  styleUrls: ['./big-screen-calendar.component.scss']
})
export class BigScreenCalendarComponent implements OnInit, AfterViewInit {
  currentMonth$: Observable<Dayjs[][]>;
  currentMonthsNumberNumber: number;
  currentYearNumberNumber: number;
  currentMonthsNumberString: string;
  thesisData$: Observable<ThesisModel[]>;
  dataModel: DataModel[];


  constructor(
    private cdr: ChangeDetectorRef,
    private store$: Store
  ) {
  }

  ngOnInit(): void {
    this.dispatch();
  }

  dispatch(): void {
    this.store$.dispatch(SharedActions.getCurrentMonth({
      currentMonthNumber: dayjs().month(),
      currentYearNumber: dayjs().year()
    }));
  }

  ngAfterViewInit() {
    this.currentMonth$ = this.store$.select(selectCurrentMonth);
    this.currentMonth$.subscribe((value) => console.log(value));
    combineLatest(this.store$.select(selectCurrentMonthNumber), this.store$.select(selectYearMonthNumber)).subscribe((data) => {
      this.currentMonthsNumberNumber = data[0];
      this.currentYearNumberNumber = data[1];
      this.currentMonthsNumberString = dayjs(new Date(data[1], data[0])).format("MMMM YYYY");
    })
    this.dispatchGetThesisByEmailAndDateRange();
    this.thesisData$ = this.store$.select(selectThesis);
    this.dataModel = this.processThesisData();
    console.log('aaaaaaaaaaa', this.dataModel)

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
            email: 'test@test',
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

  processThesisData(): DataModel[] {
    const results: DataModel[] = [];

    this.currentMonth$.subscribe(currentMonth => {
      this.thesisData$.subscribe(thesisData => {
        for (const row of currentMonth) {
          for (const element of row) {
            const elementDate = element;
            let matchCount = 0;

            for (const thesis of thesisData) {
              const thesisDate = dayjs(thesis.thesisDateOfDefense);
              if (element.isSame(thesisDate, 'day')) {
                matchCount++;
              }
            }

            results.push({ date: elementDate, matches: matchCount });
          }
        }
      });
    });

    return results;
  }
}
