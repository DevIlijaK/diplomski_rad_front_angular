import {User} from "../model/user";


export interface AuthState {
  ticket: string;
  user: User;
}
export const INIT_AUTH_STATE: AuthState = {
  ticket: 'nesto',
  user: null,
}
