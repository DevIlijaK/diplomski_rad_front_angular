import {createReducer, on} from "@ngrx/store";
import {AdminState, INIT_ADMIN_STATE} from "./state";
import {AdminActions, getAllAppUserRolesSuccess, getAppUsersSuccess} from "./actions";


const reducer = createReducer(
  INIT_ADMIN_STATE,
  on(getAppUsersSuccess, (state, {getAppUsersResponse, lastAppUsersSearchRequest}) => ({
    ...state,
    appUsers: getAppUsersResponse.appUsers,
    totalAppUsers: getAppUsersResponse.total,
    lastAppUsersSearchRequest
  })),
  on(getAllAppUserRolesSuccess, (state, {appUserRoles}) => ({
    ...state,
    appUserRoles
  })),
);
export function adminReducers(state: AdminState | undefined, action: AdminActions): AdminState {
  return reducer(state, action);
}
