import {AuthState} from "./state";
import {createFeatureSelector, createSelector, MemoizedSelector} from "@ngrx/store";


export const getLoggedInUser = (state: AuthState) => state.loggedInUser

export const selectAuthState: MemoizedSelector<object, AuthState> = createFeatureSelector<AuthState>('auth');

export const selectLoggedInUser: MemoizedSelector<object, any> = createSelector(selectAuthState, getLoggedInUser);
