import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree} from "@angular/router";
import {AppState} from "../../root-store/state";
import {Store} from "@ngrx/store";
import {selectUserTicket} from "../../auth/store/selectors";
import {first, map} from "rxjs/operators";
import * as SharedActions from '../store/actions';
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class MainPanelGuard implements CanActivate, CanActivateChild {
  constructor(private store$: Store<AppState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.store$.select(selectUserTicket).pipe(
      first(),
      map(ticket => {
        console.log(ticket);
        if (!ticket) {
          this.store$.dispatch(SharedActions.navigate({url: ['/login']}));
        }
        return !!ticket;
      })
    );
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }
}
