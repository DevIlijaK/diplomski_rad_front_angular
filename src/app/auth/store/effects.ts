import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {switchMap, tap} from "rxjs/operators";
import {AuthApiService} from "../api/auth-api";
import {of} from "rxjs";
import * as AuthActions from './actions';

@Injectable()
export class AuthEffects {
  constructor(private action$: Actions,
              private authApi: AuthApiService
  ) {
  }

  login$ = createEffect(() => this.action$.pipe(
    ofType(AuthActions.login),
    switchMap((data) => {
      return this.authApi.login(data.loginRequest).pipe(
        switchMap(response => of(AuthActions.loginSuccess({loggedInUser: response}))),
        // catchError(error => of(loginFailure({ticket: error})))
      )
    })
  ));
}
