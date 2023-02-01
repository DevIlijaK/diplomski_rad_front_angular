import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree} from "@angular/router";
import {AppState} from "../../root-store/state";
import {Store} from "@ngrx/store";
import {first, map} from "rxjs/operators";
import * as SharedActions from '../store/actions';
import {Observable} from "rxjs";
import {selectLoggedInUser} from "../../auth/store/selectors";


@Injectable({
  providedIn: 'root'
})
export class MainPanelGuard implements CanActivate, CanActivateChild {
  constructor(private store$: Store<AppState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.store$.select(selectLoggedInUser).pipe(
      first(),
      map(loggedInUser => {
        console.log(loggedInUser);
        if (!loggedInUser) {
          console.log(loggedInUser);
          console.log('Uslo u if');
          this.store$.dispatch(SharedActions.navigate({url: ['/login']}));
        }
        console.log('Nije uslo u if');
        return !!loggedInUser;
      })
    );
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }
}
