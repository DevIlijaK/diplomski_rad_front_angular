import {createAction, props, union} from "@ngrx/store";
import {EAuthActions} from "../constants/constants";
import {User} from "../model/user";
import {LoginRequest} from "../model/login-request";

export const login = createAction(EAuthActions.LOGIN, props<{ loginRequest: LoginRequest }>());
export const loginSuccess = createAction(EAuthActions.LOGIN_SUCCESS, props<{ ticket: any }>());
export const loginFailure = createAction(EAuthActions.LOGIN_FAIL, props<{ ticket: any }>());
export const getUser = createAction(EAuthActions.GET_USER, props<{ userId: string }>());
export const getUserSuccess = createAction(EAuthActions.GET_USER_SUCCESS, props<{ user: User }>());
export const logout = createAction(EAuthActions.LOGOUT, props<{ onlyNavigate: boolean }>());
export const logoutSuccess = createAction(EAuthActions.LOGOUT_SUCCESS);

const all = union({
});

export type AuthActions = typeof all;
