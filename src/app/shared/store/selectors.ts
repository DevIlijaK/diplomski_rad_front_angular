import {SharedState} from "./state";
import {createFeatureSelector, createSelector, MemoizedSelector} from "@ngrx/store";

export const getLastModalRef = (state: SharedState) => state.modals[state.modals.length - 1];
export const getActiveRoute = (state: SharedState) => state.activeRoute;
export const getCurrentMonthNumber = (state: SharedState) => state.currentMonthNumber;
export const getYearMonthNumber = (state: SharedState) => state.currentYearNumber;
export const getCurrentMonth = (state: SharedState) => state.currentMonth;
export const getSmallCalendarCurrentMonthNumber = (state: SharedState) => state.smallCalendarCurrentMonthNumber;
export const getSmallCalendarCurrentYearNumber = (state: SharedState) => state.smallCalendarCurrentYearNumber;
export const getSmallCalendarCurrentMonth = (state: SharedState) => state.smallCalendarCurrentMonth;
export const getOpenModalh = (state: SharedState) => state.openModal;
export const getModalData = (state: SharedState) => state.modalData;
export const getThesis = (state: SharedState) => state.thesis;
export const getLastDispatchedAction = (state: SharedState) => state.lastDispatchedAction;
export const getDatatableConfiguration = (state: SharedState) => state.datatablesConfiguration;


export const selectSharedState: MemoizedSelector<object, SharedState> = createFeatureSelector<SharedState>('shared');

export const selectLastModalRef: MemoizedSelector<object, any> = createSelector(selectSharedState, getLastModalRef);
export const selectActiveRoute: MemoizedSelector<object, any> = createSelector(selectSharedState, getActiveRoute);
export const selectCurrentMonthNumber: MemoizedSelector<object, any> = createSelector(selectSharedState, getCurrentMonthNumber);
export const selectYearMonthNumber: MemoizedSelector<object, any> = createSelector(selectSharedState, getYearMonthNumber);
export const selectCurrentMonth: MemoizedSelector<object, any> = createSelector(selectSharedState, getCurrentMonth);
export const selectSmallCalendarCurrentMonthNumber: MemoizedSelector<object, any> = createSelector(selectSharedState, getSmallCalendarCurrentMonthNumber);
export const selectSmallCalendarCurrentYearNumber: MemoizedSelector<object, any> = createSelector(selectSharedState, getSmallCalendarCurrentYearNumber);
export const selectSmallCalendarCurrentMonth: MemoizedSelector<object, any> = createSelector(selectSharedState, getSmallCalendarCurrentMonth);
export const selectOpenModal: MemoizedSelector<object, any> = createSelector(selectSharedState, getOpenModalh);
export const selectModalData: MemoizedSelector<object, any> = createSelector(selectSharedState, getModalData);
export const selectThesis: MemoizedSelector<object, any> = createSelector(selectSharedState, getThesis);
export const selectLastDispatchedAction: MemoizedSelector<object, any> = createSelector(selectSharedState, getLastDispatchedAction);
export const selectDatatableConfiguration: MemoizedSelector<object, any> = createSelector(selectSharedState, getDatatableConfiguration);
