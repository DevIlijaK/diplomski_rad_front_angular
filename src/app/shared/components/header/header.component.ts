import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {selectCurrentMonthNumber} from "../../store/selectors";
import * as dayjs from "dayjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../../root-store/state";
import {Observable} from "rxjs";
import * as CommonActions from '../../store/actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  currentMontsNumber$: Observable<number>;
  currentMontsNumberString: string;

  constructor(
    private store$: Store<AppState>,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.currentMontsNumber$ = this.store$.select(selectCurrentMonthNumber);
    this.currentMontsNumber$.subscribe(currentMontsNumber => this.currentMontsNumberString = dayjs(new Date(dayjs().year(),currentMontsNumber)).format("MMMM YYYY"))

    this.cdr.detectChanges();
  }
  changeCurrentMonth(leftOrRight: number){
    if(leftOrRight === 0){
    }
    this.store$.dispatch(CommonActions.changeCurrentMonth({monthNumber}));
  }

}
