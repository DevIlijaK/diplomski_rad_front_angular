import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {getAllAppUserRoles, getAllAppUserRolesSuccess, getAppUsers, getAppUsersSuccess, updateAppUser} from "./actions";
import {of, switchMap, tap} from "rxjs";
import {AadminApiService} from "../api/admin-api";
import {closeSpinner, openSpinner, saveLastDispatchedAction, successMessages} from "../../shared/store/actions";
import {withLatestFrom} from "rxjs/operators";
import {selectLastAppUsersSearchRequest} from "./selectors";


@Injectable()
export class AdminEffects {
  constructor(private action$: Actions, private navigator: Router,
              private store$: Store,
              private adminApi: AadminApiService
  ) {
  }

  getAppUsers$ = createEffect(() => this.action$.pipe(
    ofType(getAppUsers),
    switchMap(data => {
      return this.adminApi.getAppUsers(data.getAppUsersRequest).pipe(
      switchMap(response => {
        return of(
          saveLastDispatchedAction({lastDispatchedActionData: data}),
          getAppUsersSuccess({getAppUsersResponse: response, lastAppUsersSearchRequest: data.getAppUsersRequest}),
        )
      })
    )})
  ))
  updateAppUser$ = createEffect(() => this.action$.pipe(
    ofType(updateAppUser),
    tap(() => {
      this.store$.dispatch(openSpinner());
    }),
    switchMap((data) => this.adminApi.updateAppUser(data.appUser).pipe(
      withLatestFrom(this.store$.select(selectLastAppUsersSearchRequest)),
      switchMap(([response, lastAppUsersSearchRequest]) => {
        return of(
          saveLastDispatchedAction({lastDispatchedActionData: data}),
          getAppUsers({getAppUsersRequest: lastAppUsersSearchRequest}),
          closeSpinner(),
          successMessages({messagesKey: 'Uspešno izmenjen korisnik!'}),
        );
      })
    ))
  ));
  getAllAppUserRoles$ = createEffect(() => this.action$.pipe(
    ofType(getAllAppUserRoles),
    switchMap(data => this.adminApi.getAllAppUserRoles().pipe(
      switchMap(response => of(
        saveLastDispatchedAction({lastDispatchedActionData: data}),
        getAllAppUserRolesSuccess({appUserRoles: response}),
      ))
    ))
  ))

}
