import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';

import {Injectable} from '@angular/core';
import {catchError, first, switchMap} from 'rxjs/operators';
import * as AuthActions from '../../auth/store/actions';
import * as SharedActions from '../store/actions';
import {AppState} from "../../root-store/state";
import {selectLoggedInUser} from "../../auth/store/selectors";
import {User} from "../../auth/model/user";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store$: Store) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store$.pipe(
      select(selectLoggedInUser),
      first(),
      switchMap((loggedInUser: User) => {
        console.log(loggedInUser?.accessToken);
        console.log(loggedInUser);
        const authRequest = loggedInUser
          ? req.clone({setHeaders: {Authorization: `Bearer ${loggedInUser.accessToken}`}})
          : req;

        return next.handle(authRequest).pipe(
          catchError((err) => {
            const error = err.error?.message || '';

            switch (err.status) {
              case 401:
                this.store$.dispatch(AuthActions.logoutSuccess());
                this.store$.dispatch(SharedActions.navigate({url: ['/login']}));
                this.store$.dispatch(SharedActions.errorMessages({messagesKey: 'error-401'}));
                break;
              case 403:
                this.store$.dispatch(SharedActions.errorMessages({messagesKey: err.error.error.errorKey}));
                break;
              default:
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
