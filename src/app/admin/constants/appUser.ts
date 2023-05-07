import {AppUserRole} from "./appUserRole";

export interface AppUser {
  firstname: string;
  lastname: string;
  username: string;
  password?: any;
  email: string;
  roles: AppUserRole[];
}
