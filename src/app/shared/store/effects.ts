import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import * as SharedActions from './actions';
import {
  changeCurrentMonth,
  changeSmallCalendarCurrentMonth,
  closeSpinner,
  errorMessages,
  getCurrentMonth,
  getCurrentMonthNumber, getCurrentYearNumberSucess,
  getSmallCalendarCurrentMonth, getSmallCalendarCurrentMonthNumber, getSmallCalendarCurrentMonthNumberSucess,
  getSmallCalendarCurrentMonthSucess, getSmallCalendarCurrentYearSucess,
  navigate,
  openModal,
  openModalSuccess,
  openSpinner,
  successMessages
} from './actions';
import {AppState} from '../../root-store/state';
import {select, Store} from '@ngrx/store';
import {
  selectCurrentMonthNumber,
  selectLastModalRef,
  selectSmallCalendarCurrentMonth,
  selectSmallCalendarCurrentMonthNumber, selectYearMonthNumber
} from './selectors';
import {NgxSpinnerService} from 'ngx-spinner';
import {ROUTER_NAVIGATION, RouterNavigationAction} from '@ngrx/router-store';
import {getMonth} from "../services/utils";
import * as dayjs from "dayjs";


@Injectable()
export class SharedEffects {
  constructor(private action$: Actions, private navigator: Router,
              private store$: Store<AppState>,
              private spinnerService: NgxSpinnerService,
  ) {
  }

  nagivate = createEffect(
    () => this.action$.pipe(
      ofType(navigate),
      map((data) => {
        this.navigator.navigate(data.url);
      })
    ), {dispatch: false}
  );

  // openSuccessDialog = createEffect(
  //   () => this.action$.pipe(
  //     ofType(successMessages),
  //     map((data) => {
  //       let messages = this.translateService.instant(data.messagesKey);
  //       messages = data.extraMessage ? messages + ' - ' + data.extraMessage : messages;
  //       this.notificationMessages.success(messages);
  //     }),
  //   ), {dispatch: false},
  // );

  // openErrorDialog = createEffect(
  //   () => this.action$.pipe(
  //     ofType(errorMessages),
  //     map((data) => {
  //       let messages = this.translateService.instant(data.messagesKey);
  //       messages = data.extraMessage ? messages + ' - ' + data.extraMessage : messages;
  //       this.notificationMessages.error(messages);
  //     }),
  //   ), {dispatch: false},
  // );

  // openDialog$ = createEffect(
  //   () => this.action$.pipe(
  //     ofType(openModal),
  //     map((data) => {
  //       this.dialog.open(data.component, data.config);
  //       // return of(SharedActions.openModalSuccess({dialogRef}));
  //     }),
  //   ),
  //   {dispatch: false});

  closeDialog$ = createEffect(
    () => this.action$.pipe(
      ofType(openModalSuccess),
      withLatestFrom(this.store$.select(selectLastModalRef)),
      switchMap(([, lastDialogRef]) => {
        if (lastDialogRef) {
          lastDialogRef.close();
        }
        return of(SharedActions.closeModalSuccess());
      }),
    ),
  );


  openSpinner$ = createEffect(
    () => this.action$.pipe(
      ofType(openSpinner),
      map(() => {
        this.spinnerService.show();
      }),
    ), {dispatch: false},
  );

  closeSpinner$ = createEffect(
    () => this.action$.pipe(
      ofType(closeSpinner),
      map(() => {
        this.spinnerService.hide();
      }),
    ), {dispatch: false},
  );

  getActiveRoute$ = createEffect(() => this.action$.pipe(
      ofType(ROUTER_NAVIGATION),
      switchMap((data: RouterNavigationAction) => of(
        SharedActions.setActiveRouteSuccess({route: data.payload.routerState.url})
      )),
    ),
  );
  getCurrentMonth$ = createEffect(() => this.action$.pipe(
    ofType(getCurrentMonth),
    switchMap((data) => {
      const currentMonth = getMonth(data.currentMonthNumber, data.currentYearNumber);
      return of(
      SharedActions.getCurrentMonthSucess({currentMonth}),
      SharedActions.getCurrentYearNumberSucess({currentYearNumber: data.currentYearNumber}),
      SharedActions.getCurrentMonthNumberSucess({currentMonthNumber: data.currentMonthNumber})
    )})
  ))
  getCurrentMonthNumber$ = createEffect(() => this.action$.pipe(
    ofType(getCurrentMonthNumber),
    switchMap(() => {
      const currentMonthNumber =  dayjs().month();
      return of(
        SharedActions.getCurrentMonthNumberSucess({currentMonthNumber})
      )})
  ))
  changeCurrentMonth$ = createEffect(() => {
    SharedActions.openSpinner();
    return this.action$.pipe(
    ofType(changeCurrentMonth),
    switchMap((data) => {
      const currentMonth = getMonth(data.monthNumber, data.yearNumber);
      return of(
        SharedActions.closeSpinner(),
        SharedActions.getCurrentMonthNumberSucess({currentMonthNumber: data.monthNumber}),
        SharedActions.getCurrentYearNumberSucess({currentYearNumber: data.yearNumber}),
        SharedActions.getCurrentMonthSucess({currentMonth})
      )})
  )})


  getSmallCalendarCurrentMonth$ = createEffect(() => this.action$.pipe(
    ofType(getSmallCalendarCurrentMonth),
    switchMap((data) => {
      const smallCalendarCurrentMonth = getMonth(data.currentSmallCalendarMonthNumber, data.currentSmallCalendarYearNumber);
      const currentMonthNumber = data.currentSmallCalendarMonthNumber;
      const currentYearNumber = data.currentSmallCalendarYearNumber;
      return of(
        SharedActions.getSmallCalendarCurrentMonthSucess({smallCalendarCurrentMonth}),
        SharedActions.getSmallCalendarCurrentMonthNumberSucess({smallCalendarCurrentMonthNumber: currentMonthNumber}),
        SharedActions.getSmallCalendarCurrentYearSucess({smallCalendarCurrentYearNumber: currentYearNumber})
      )})
  ))
  getSmallCalendarCurrentMonthNumber$ = createEffect(() => this.action$.pipe(
    ofType(getSmallCalendarCurrentMonthNumber),
    switchMap(() => {
      const smallCalendarCurrentMonthNumber =  dayjs().month();
      return of(
        SharedActions.getSmallCalendarCurrentMonthNumberSucess({smallCalendarCurrentMonthNumber})
      )})
  ))
  changeSmallCalendarCurrentMonth$ = createEffect(() => {
    SharedActions.openSpinner();
    return this.action$.pipe(
      ofType(changeSmallCalendarCurrentMonth),
      switchMap((data) => {
        const smallCalendarCurrentMonth = getMonth(data.monthNumber, data.yearNumber);
        console.log(data.monthNumber);
        return of(
          SharedActions.closeSpinner(),
          SharedActions.getSmallCalendarCurrentMonthNumberSucess({smallCalendarCurrentMonthNumber: data.monthNumber}),
          SharedActions.getSmallCalendarCurrentYearSucess({smallCalendarCurrentYearNumber: data.yearNumber}),
          SharedActions.getSmallCalendarCurrentMonthSucess({smallCalendarCurrentMonth})
        )})
    )})

}
