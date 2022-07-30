import {AuthState} from "./state";
import {createFeatureSelector, createSelector, MemoizedSelector} from "@ngrx/store";
import {CalendarState} from "../../calendar/store/state";


export const getUser = (state: AuthState) => state.user
export const getUserTicket = (state: AuthState) => state.ticket

export const selectAuthState: MemoizedSelector<object, AuthState> = createFeatureSelector<AuthState>('auth');

export const selectUser: MemoizedSelector<object, any> = createSelector(selectAuthState, getUser);
export const selectUserTicket: MemoizedSelector<object, any> = createSelector(selectAuthState, getUserTicket);
