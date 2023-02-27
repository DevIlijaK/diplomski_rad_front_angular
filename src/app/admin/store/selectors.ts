import {createFeatureSelector, createSelector, MemoizedSelector} from "@ngrx/store";
import {AdminState} from "./state";


export const getAppUsers = (state: AdminState) => state.appUsers;
export const getLastAppUsersSearchRequest = (state: AdminState) => state.lastAppUsersSearchRequest;
export const getTotalAppUsers = (state: AdminState) => state.totalAppUsers;
export const getAppUserRoles = (state: AdminState) => state.appUserRoles;

export const selectAdminState: MemoizedSelector<object, AdminState> = createFeatureSelector<AdminState>('admin');

export const selectAppUsers: MemoizedSelector<object, any> = createSelector(selectAdminState, getAppUsers);
export const selectLastAppUsersSearchRequest: MemoizedSelector<object, any> = createSelector(selectAdminState, getLastAppUsersSearchRequest);
export const selectTotalAppUsers: MemoizedSelector<object, any> = createSelector(selectAdminState, getTotalAppUsers);
export const selectAppUserRoles: MemoizedSelector<object, any> = createSelector(selectAdminState, getAppUserRoles);

