import {createAction, props, union} from "@ngrx/store";
import {EAuthActions} from "../constants/constants";
import {LoggedInUser} from "../model/loggedInUser";
import {LoginRequest} from "../model/login-request";

export const login = createAction(EAuthActions.LOGIN, props<{ loginRequest: LoginRequest }>());
export const loginSuccess = createAction(EAuthActions.LOGIN_SUCCESS, props<{ loggedInUser: LoggedInUser }>());
export const loginFailure = createAction(EAuthActions.LOGIN_FAIL, props<{ ticket: any }>());
export const logout = createAction(EAuthActions.LOGOUT);
export const logoutSuccess = createAction(EAuthActions.LOGOUT_SUCCESS, props<{ loggedInUser: LoggedInUser }>());
export const refreshAccessToken = createAction(EAuthActions.REFRESH_ACCESS_TOKEN, props<{ refreshToken: string }>())
export const refreshAccessTokenSuccess = createAction(EAuthActions.REFRESH_ACCESS_TOKEN_SUCCESS, props<{ accessToken: string }>())
export const getUser = createAction(EAuthActions.GET_USER, props<{ userId: string }>());
export const getUserSuccess = createAction(EAuthActions.GET_USER_SUCCESS, props<{ user: LoggedInUser }>());

const all = union({
});

export type AuthActions = typeof all;
