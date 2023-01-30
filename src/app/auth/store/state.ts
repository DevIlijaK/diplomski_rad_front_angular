import {User} from "../model/user";


export interface AuthState {
  loggedInUser: User;
}
export const INIT_AUTH_STATE: AuthState = {
  loggedInUser: null
}
