import {createFeatureSelector, createSelector, MemoizedSelector} from "@ngrx/store";
import {AdminState} from "./state";


export const getAppUsers = (state: AdminState) => state.appUsers;
export const getTotalAppUsers = (state: AdminState) => state.totalAppUsers;

export const selectAdminState: MemoizedSelector<object, AdminState> = createFeatureSelector<AdminState>('admin');

export const selectAppUsers: MemoizedSelector<object, any> = createSelector(selectAdminState, getAppUsers);
export const selectTotalAppUsers: MemoizedSelector<object, any> = createSelector(selectAdminState, getTotalAppUsers);

