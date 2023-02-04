import {createReducer, on} from "@ngrx/store";
import {AdminState, INIT_ADMIN_STATE} from "./state";
import {AdminActions, getAppUsersSuccess} from "./actions";


const reducer = createReducer(
  INIT_ADMIN_STATE,
  on(getAppUsersSuccess, (state, {getAppUsersResponse}) => ({
    ...state,
    appUsers: getAppUsersResponse.appUsers,
    totalUsers: getAppUsersResponse.total
  })),
);
export function adminReducers(state: AdminState | undefined, action: AdminActions): AdminState {
  return reducer(state, action);
}
