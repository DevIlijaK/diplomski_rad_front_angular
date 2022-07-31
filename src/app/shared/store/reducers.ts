import {INIT_SHARED_STATE, SharedState} from "./state";
import {createReducer, on} from "@ngrx/store";
import {setActiveRouteSuccess, SharedActions} from "./actions";


const reducer = createReducer(
  INIT_SHARED_STATE,
  on(setActiveRouteSuccess, (state, {route}) => ({
    ...state,
    activeRoute: route
  }))
);

export function sharedReducers(state: SharedState, action: SharedActions): SharedState {
  return reducer(state, action);
}
