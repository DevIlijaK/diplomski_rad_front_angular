import {createReducer} from "@ngrx/store";
import {AuthState, INIT_AUTH_STATE} from "./state";
import {AuthActions} from "./actions";

const reducer = createReducer(
  INIT_AUTH_STATE,
)
export function authReducers(state: AuthState | undefined, action: AuthActions): AuthState {
  return reducer(state, action);
}
