import {AppUser} from "../constants/appUser";

export interface AdminState {
  appUsers: AppUser[];
  totalAppUsers: number;
}

export const INIT_ADMIN_STATE: AdminState = {
  appUsers: null,
  totalAppUsers: null
}
