import {Injectable} from "@angular/core";
import {Actions, ofType} from "@ngrx/effects";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {getAppUsers, getAppUsersSuccess} from "./actions";
import {of, switchMap} from "rxjs";
import {AadminApiService} from "../api/admin-api";


@Injectable()
export class AdminEffects {
  constructor(private action$: Actions, private navigator: Router,
              private store$: Store,
              private adminApi: AadminApiService
  ) {
  }
  getAppUsers$ = this.action$.pipe(
    ofType(getAppUsers),
    switchMap(data => this.adminApi.getAppUsers(data.getAppUsersRequest).pipe(
      switchMap(data => {
        return of(
          getAppUsersSuccess({getAppUsersResponse: data})
        )
      })
    ))
  )

}
