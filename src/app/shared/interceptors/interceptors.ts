import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';

import {Injectable} from '@angular/core';
import {catchError, first, switchMap} from 'rxjs/operators';
import * as AuthActions from '../../auth/store/actions';
import * as SharedActions from '../store/actions';
import {AppState} from "../../root-store/state";
import {selectLoggedInUser} from "../../auth/store/selectors";
import {LoggedInUser} from "../../auth/model/loggedInUser";
import {refreshAccessToken} from "../../auth/store/actions";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store$: Store) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store$.pipe(
      select(selectLoggedInUser),
      first(),
      switchMap((loggedInUser: LoggedInUser) => {
        const authRequest = loggedInUser
          ? req.clone({setHeaders: {Authorization: `Bearer ${loggedInUser.accessToken}`}})
          : req;

        return next.handle(authRequest).pipe(
          catchError((err) => {
            const error = err.error?.message || '';

            switch (err.status) {
              case 401:
                console.log(3)
                this.store$.dispatch(AuthActions.logoutSuccess({loggedInUser: null}));
                this.store$.dispatch(SharedActions.navigate({url: ['/login']}));
                // this.store$.dispatch(SharedActions.errorMessages({messagesKey: 'error-401'}));
                break;
              case 403:
                if (err.error.error_message.startsWith('The Token has expired on') &&
                  err.error.token_type === 'Access Token' && !err.url.endsWith('/api/user/logout')
                ) {
                  this.store$.dispatch(refreshAccessToken({refreshToken: 'Bearer ' + loggedInUser.refreshToken}))
                  // this.store$.pipe(
                  //   select(selectLoggedInUser),
                  //   first(),
                  //   switchMap((user: LoggedInUser) => {
                  //     const authRequest = user
                  //       ? req.clone({setHeaders: {Authorization: `Bearer ${user.accessToken}`}})
                  //       : req;
                  //    return next.handle(authRequest);
                  //   }))
                  /**
                   * Mozda bude trebalo
                   */
                  // }else if (err.error.error_message.startsWith('The Token has expired on') &&
                  //   err.error.token_type === 'Refresh Token'){
                  //   this.store$.dispatch(AuthActions.logoutSuccess({loggedInUser: null}));
                  //   this.store$.dispatch(SharedActions.navigate({url: ['/login']}));
                } else {
                  console.log(1);
                  this.store$.dispatch(AuthActions.logoutSuccess({loggedInUser: null}));
                  this.store$.dispatch(SharedActions.navigate({url: ['/login']}));
                }
                break;
              default:
                /**
                 * Treba da se implementira
                 */
                this.store$.dispatch(SharedActions.errorMessages({messagesKey: error}));
                break;
            }

            return EMPTY;
          })
        );
      })
    );
  }

}
