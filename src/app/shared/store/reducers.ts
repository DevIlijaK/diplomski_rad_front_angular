import {INIT_SHARED_STATE, SharedState} from "./state";
import {createReducer, on} from "@ngrx/store";
import {getCurrentMonthNumberSucess, getCurrentMonthSucess, setActiveRouteSuccess, SharedActions} from "./actions";


const reducer = createReducer(
  INIT_SHARED_STATE,
  on(setActiveRouteSuccess, (state, {route}) => ({
    ...state,
    activeRoute: route
  })),
on(getCurrentMonthSucess, (state, {currentMonth}) => ({
  ...state,
  currentMonth
})),
  on(getCurrentMonthNumberSucess, (state, {currentMonthNumber}) => ({
    ...state,
    currentMonthNumber
  })),
);

export function sharedReducers(state: SharedState, action: SharedActions): SharedState {
  return reducer(state, action);
}
