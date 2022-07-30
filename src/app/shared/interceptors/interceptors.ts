import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';

import {Injectable} from '@angular/core';
import {catchError, first, switchMap} from 'rxjs/operators';
import * as AuthActions from '../../auth/store/actions';
import * as SharedActions from '../store/actions';
import {AppState} from "../../root-store/state";
import {selectUserTicket} from "../../auth/store/selectors";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store$: Store<AppState>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store$.pipe(select(selectUserTicket)).pipe(
      first(),
      switchMap((ticket) => {
        const authRequest = ticket ? req.clone({
          setHeaders: {
            Authorization: `Basic ${btoa(ticket)}`,
          },
        }) : req;
        return next.handle(authRequest).pipe(
          catchError((err => {
            const error = err.error ? err.error.message : '';
            if (err.status === 401) {
              this.store$.dispatch(AuthActions.logoutSuccess());
              this.store$.dispatch(SharedActions.navigate({url: ['/login']}));
              this.store$.dispatch(SharedActions.errorMessages({messagesKey: 'error-401'}));
            } else if (err.status === 403) {
              this.store$.dispatch(SharedActions.errorMessages({messagesKey: err.error.error.errorKey}));
            } else {
              this.store$.dispatch(SharedActions.closeSpinner());
              this.store$.dispatch(SharedActions.errorMessages({messagesKey: error}));
            }
            return EMPTY;
          }))
        );
      }));
  }

}
