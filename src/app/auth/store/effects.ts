import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {switchMap, withLatestFrom} from "rxjs/operators";
import {AuthApiService} from "../api/auth-api";
import {of} from "rxjs";
import * as AuthActions from './actions';
import {closeSpinner, navigate} from "../../shared/store/actions";
import {Store} from "@ngrx/store";
import {selectLastDispatchedActionData} from "../../shared/store/selectors";
import {Action} from "rxjs/internal/scheduler/Action";

@Injectable()
export class AuthEffects {
  constructor(private action$: Actions,
              private authApi: AuthApiService,
              private store$: Store
  ) {
  }

  login$ = createEffect(() => this.action$.pipe(
    ofType(AuthActions.login),
    switchMap((data) => {
      return this.authApi.login(data.loginRequest).pipe(
        switchMap(response => of(
          AuthActions.loginSuccess({loggedInUser: response['appUser']}),
          closeSpinner(),
          navigate({url: ['']})
        )),
        // catchError(error => of(loginFailure({ticket: error})))
      )
    })
  ));
  logout$ = createEffect(() => this.action$.pipe(
    ofType(AuthActions.logout),
    switchMap((data) => {
      return this.authApi.logout().pipe(
        switchMap(response => of(
          AuthActions.logoutSuccess({loggedInUser: null}),
          closeSpinner(),
          navigate({url: ['/login']})
        )),
        // catchError(error => of(loginFailure({ticket: error})))
      )
    })
  ));
  refreshAccessToken$ = createEffect(() => this.action$.pipe(
    ofType(AuthActions.refreshAccessToken),
    switchMap((data) => {
      return this.authApi.refreshAccessToken(data.refreshToken).pipe(
        withLatestFrom(this.store$.select(selectLastDispatchedActionData)),
        switchMap(([response, lastDispatchedActionData]) => {

          return of(
            AuthActions.refreshAccessTokenSuccess({ accessToken: response['access_token'] }),
            closeSpinner(),
          {...lastDispatchedActionData}
          );
        })
        // catchError(error => of(loginFailure({ticket: error})))
      );
    })
  ));
}
