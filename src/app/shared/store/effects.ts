import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import * as SharedActions from './actions';
import {
  closeSpinner,
  errorMessages, getCurrentMonth, getCurrentMonthNumber,
  navigate,
  openModal,
  openModalSuccess,
  openSpinner,
  successMessages
} from './actions';
import {AppState} from '../../root-store/state';
import {select, Store} from '@ngrx/store';
import {selectCurrentMonthNumber, selectLastModalRef} from './selectors';
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
        console.log('Close Glavni');
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
    withLatestFrom(this.store$.select(selectCurrentMonthNumber)),
    switchMap(([, currentMonthNumber]) => {
      const currentMonth = getMonth(currentMonthNumber);
      console.log(currentMonth);
      return of(
      SharedActions.getCurrentMonthSucess({currentMonth})
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

}
