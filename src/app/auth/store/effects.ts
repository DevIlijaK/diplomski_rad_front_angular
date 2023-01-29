import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {navigate} from "../../shared/store/actions";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {login, loginFailure, loginSuccess} from "./actions";
import {AuthApiService} from "../api/auth-api";
import {of} from "rxjs";

@Injectable()
export class AuthEffects {
  constructor(private action$: Actions,
              private authApi: AuthApiService
  ) {
  }

  login$ = createEffect(() => this.action$.pipe(
    ofType(login),
    switchMap((data) => {
      return this.authApi.login(data.loginRequest).pipe(
        switchMap(response => of(loginSuccess({ticket: response}))),
        // catchError(error => of(loginFailure({ticket: error})))
      )
    })
  ));
  loginSuccess$ = createEffect(() => this.action$.pipe(
    ofType(loginSuccess),
    tap((response) => {
      console.log('Login success:', response);
    })
  ));

  loginFailure$ = createEffect(() => this.action$.pipe(
    ofType(loginFailure),
    tap((error) => {
      console.log('Login failure:', error);
    })
  ));
}
