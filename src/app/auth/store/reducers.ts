import {createReducer, on} from "@ngrx/store";
import {AuthState, INIT_AUTH_STATE} from "./state";
import {AuthActions, loginSuccess, logoutSuccess} from "./actions";

const reducer = createReducer(
  INIT_AUTH_STATE,
  on(loginSuccess, (state, {loggedInUser}) => ({
    ...state,
    loggedInUser
  })),
  on(logoutSuccess, (state, {loggedInUser}) => ({
    ...state,
    loggedInUser
  })),
)
export function authReducers(state: AuthState | undefined, action: AuthActions): AuthState {
  return reducer(state, action);
}
