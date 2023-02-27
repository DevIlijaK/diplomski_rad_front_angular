import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import * as dayjs from "dayjs";
import {Dayjs} from "dayjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../../root-store/state";
import * as CalendarActions from '../../store/actions';
import {Observable} from "rxjs";
import {selectSelectedDay} from "../../store/selectors";
import * as CommonActions from "../../../shared/store/actions";
import {selectCurrentMonthNumber, selectThesis} from "../../../shared/store/selectors";
import {ThesisModel} from "../../../shared/models/thesis.model";

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit, AfterViewInit {


  @Input() dayName: string;
  @Input() day: Dayjs;
  @Input() calendarRowIndex: number;

  selectedDay$: Observable<Dayjs>;
  checkedDay: boolean;
  currentMontsNumber$: Observable<number>;
  currentMontsNumber: Dayjs;
  thesis: ThesisModel;

  constructor(
    private store$: Store<AppState>,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.selectedDay$ = this.store$.select(selectSelectedDay);
    this.selectedDay$.subscribe((selectedDay) => {
      this.checkedDay = dayjs(selectedDay).format('DD-MM-YY') === this.day.format('DD-MM-YY')
    })
    this.currentMontsNumber$ = this.store$.select(selectCurrentMonthNumber);


    this.currentMontsNumber$.subscribe(currentMonthNumber => {

      this.currentMontsNumber = dayjs(new Date(dayjs().year(), currentMonthNumber))
    })
    this.store$.select(selectThesis).subscribe(value =>{
      this.thesis = value});
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  checkDayAfterOrBefore(): boolean {
    return this.day <= dayjs()
  }

  changeSelectedDate() {
    this.store$.dispatch(CalendarActions.changeSelectedDay({selectedDay: this.day}));
    this.store$.dispatch(CommonActions.changeSmallCalendarCurrentMonth({
      monthNumber: this.day.month(),
      yearNumber: this.day.year()
    }));
    this.store$.dispatch(CommonActions.changeCurrentMonth({
      monthNumber: this.day.month(),
      yearNumber: this.day.year()
    }));
  }

  openDetailsModel() {
  //   this.store$.dispatch(CommonActions.openModal({
  //     modalData: {
  //       day: this.day.format('DD-MM-YYYY'),
  //       dayName: this.dayName
  //     }
  //   }));
  }
}
