import {INIT_SHARED_STATE, SharedState} from "./state";
import {createReducer, on} from "@ngrx/store";
import {
  getAllThesisSuccess,
  getCurrentMonthNumberSucess,
  getCurrentMonthSucess,
  getCurrentYearNumberSucess,
  getSmallCalendarCurrentMonthNumberSucess,
  getSmallCalendarCurrentMonthSucess,
  getSmallCalendarCurrentYearSucess,
  openModalSuccess,
  resetDatatablesConfig,
  saveDatatableConfig,
  saveLastDispatchedAction,
  setActiveRouteSuccess,
  SharedActions
} from "./actions";
import {addDatatableConfig} from "../services/datatable-config.service";


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
  on(getCurrentYearNumberSucess, (state, {currentYearNumber}) => ({
    ...state,
    currentYearNumber
  })),
  on(getSmallCalendarCurrentMonthSucess, (state, {smallCalendarCurrentMonth}) => ({
    ...state,
    smallCalendarCurrentMonth
  })),
  on(getSmallCalendarCurrentMonthNumberSucess, (state, {smallCalendarCurrentMonthNumber}) => ({
    ...state,
    smallCalendarCurrentMonthNumber
  })),
  on(getSmallCalendarCurrentYearSucess, (state, {smallCalendarCurrentYearNumber}) => ({
    ...state,
    smallCalendarCurrentYearNumber
  })),
  on(getAllThesisSuccess, (state, {thesis}) => ({
    ...state,
    thesis
  })),
  on(saveLastDispatchedAction, (state, {lastDispatchedActionData}) => {
    return ({
      ...state,
      lastDispatchedActionData
    })
  }),
  on(saveDatatableConfig, ((state, {datatableConfigurationModel}) => {
    return ({
      ...state,
      datatablesConfiguration: addDatatableConfig(state.datatablesConfiguration, datatableConfigurationModel)
    })
  })),
  on(resetDatatablesConfig, (state) => ({
    ...state,
    datatablesConfiguration: []
  }))
);

export function sharedReducers(state: SharedState, action: SharedActions): SharedState {
  return reducer(state, action);
}
