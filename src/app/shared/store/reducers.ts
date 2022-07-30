import {INIT_SHARED_STATE, SharedState} from "./state";
import {createReducer} from "@ngrx/store";
import {SharedActions} from "./actions";


const reducer = createReducer(
  INIT_SHARED_STATE,

);

export function sharedReducers(state: SharedState, action: SharedActions): SharedState {
  return reducer(state, action);

}
