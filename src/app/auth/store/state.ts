import {LoggedInUser} from "../model/loggedInUser";


export interface AuthState {
  loggedInUser: LoggedInUser;
}
export const INIT_AUTH_STATE: AuthState = {
  loggedInUser: null
}
