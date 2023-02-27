import {createAction, props, union} from "@ngrx/store";
import {EAdminActions} from "../constants/constants";
import {GetAppUsersRequest} from "../model/get-app-users-request";
import {GetAppUsersResponse} from "../model/get-app-users-response";
import {AppUser} from "../constants/appUser";
import {AppUserRole} from "../constants/appUserRole";

export const getAppUsers = createAction(EAdminActions.GET_APP_USERS, props<{getAppUsersRequest: GetAppUsersRequest}>());
export const getAppUsersSuccess = createAction(EAdminActions.GET_APP_USERS_SUCCESS,
  props<{ getAppUsersResponse: GetAppUsersResponse, lastAppUsersSearchRequest: GetAppUsersRequest }>());
export const updateAppUser = createAction(EAdminActions.UPDATE_APP_USER, props<{ appUser: AppUser }>());
export const getAllAppUserRoles = createAction(EAdminActions.GET_ALL_APP_USER_ROLES);
export const getAllAppUserRolesSuccess = createAction(EAdminActions.GET_ALL_APP_USER_ROLES_SUCCESS, props<{ appUserRoles: AppUserRole[] }>());

const all = union({
  getAppUsers,
  getAppUsersSuccess
})
export type AdminActions = typeof all;
