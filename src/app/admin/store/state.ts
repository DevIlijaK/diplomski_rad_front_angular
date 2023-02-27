import {AppUser} from "../constants/appUser";
import {GetAppUsersRequest} from "../model/get-app-users-request";
import {AppUserRole} from "../constants/appUserRole";

export interface AdminState {
  appUsers: AppUser[];
  lastAppUsersSearchRequest: GetAppUsersRequest;
  totalAppUsers: number;
  appUserRoles: AppUserRole[];
}

export const INIT_ADMIN_STATE: AdminState = {
  appUsers: null,
  lastAppUsersSearchRequest: null,
  totalAppUsers: null,
  appUserRoles: null
}
