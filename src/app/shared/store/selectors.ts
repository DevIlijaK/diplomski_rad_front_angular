import {SharedState} from "./state";
import {createFeatureSelector, createSelector, MemoizedSelector} from "@ngrx/store";

export const getLastModalRef = (state: SharedState) => state.modals[state.modals.length - 1];
export const getActiveRoute = (state: SharedState) => state.activeRoute;


export const selectSharedState: MemoizedSelector<object, SharedState> = createFeatureSelector<SharedState>('shared');

export const selectLastModalRef: MemoizedSelector<object, any> = createSelector(selectSharedState, getLastModalRef);
export const selectActiveRoute: MemoizedSelector<object, any> = createSelector(selectSharedState, getActiveRoute);
