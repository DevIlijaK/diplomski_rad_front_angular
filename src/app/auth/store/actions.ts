import {createAction, props, union} from "@ngrx/store";
import {EAuthActions} from "../constants/constants";
import {User} from "../model/user";

export const login = createAction(EAuthActions.LOGIN, props<{ username: string, password: string }>());
export const getUser = createAction(EAuthActions.GET_USER, props<{ userId: string }>());
export const getUserSuccess = createAction(EAuthActions.GET_USER_SUCCESS, props<{ user: User }>());
export const loginSuccess = createAction(EAuthActions.LOGIN_SUCCESS, props<{ ticket: string }>());
export const logout = createAction(EAuthActions.LOGOUT, props<{ onlyNavigate: boolean }>());
export const logoutSuccess = createAction(EAuthActions.LOGOUT_SUCCESS);

const all = union({
});

export type AuthActions = typeof all;
