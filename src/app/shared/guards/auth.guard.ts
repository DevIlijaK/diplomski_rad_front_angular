import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AppState} from '../../root-store/state';
import {Store} from '@ngrx/store';
import {selectUserTicket} from '../../auth/store/selectors';
import {first, map} from 'rxjs/operators';
import * as SharedActions from '../store/actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store$: Store<AppState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.store$.select(selectUserTicket).pipe(
      first(),
      map(ticket => {
        if (ticket) {
          this.store$.dispatch(SharedActions.navigate({url: ['/']}));
        }
        return !ticket;
      })
    );
  }

}
