import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AppState} from '../../root-store/state';
import {Store} from '@ngrx/store';
import {first, map} from 'rxjs/operators';
import * as SharedActions from '../store/actions';
import {selectLoggedInUser} from "../../auth/store/selectors";
import {LoggedInUser} from "../../auth/model/loggedInUser";

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   constructor(private store$: Store<AppState>) {
//   }
//
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
//     return this.store$.select(selectLoggedInUser).pipe(
//       first(),
//       map((loggedInUser: LoggedInUser) => {
//         if (loggedInUser) {
//           this.store$.dispatch(SharedActions.navigate({url: ['/']}));
//         }
//         return !ticket;
//       })
//     );
//   }
//
// }
