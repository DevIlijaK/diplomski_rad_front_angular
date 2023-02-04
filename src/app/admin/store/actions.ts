import {createAction, props, union} from "@ngrx/store";
import {EAdminActions} from "../constants/constants";
import {AppUser} from "../constants/appUser";
import {GetAppUsersRequest} from "../model/get-app-users-request";
import {GetAppUsersResponse} from "../model/get-app-users-response";

export const getAppUsers = createAction(EAdminActions.GET_APP_USERS, props<{getAppUsersRequest: GetAppUsersRequest}>());
export const getAppUsersSuccess = createAction(EAdminActions.GET_APP_USERS_SUCCESS, props<{ getAppUsersResponse: GetAppUsersResponse }>());

const all = union({

})
export type AdminActions = typeof all;
