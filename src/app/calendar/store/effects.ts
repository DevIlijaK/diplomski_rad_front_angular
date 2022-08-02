import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../root-store/state";
import {NgxSpinnerService} from "ngx-spinner";
import {switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {changeSelectedDay} from "./actions";
import * as CalendarActions from '../store/actions';


@Injectable()
export class CalendarEffects {
  constructor(private action$: Actions, private navigator: Router,
              private store$: Store<AppState>,
              private spinnerService: NgxSpinnerService,
  ) {
  }
  changeSelectedDay$ = createEffect(() => this.action$.pipe(
    ofType(changeSelectedDay),
    switchMap((data) => {
      const selectedDay = data.selectedDay
      return of(
        CalendarActions.changeSelectedDaySucess({selectedDay})
      )})
  ))

}
