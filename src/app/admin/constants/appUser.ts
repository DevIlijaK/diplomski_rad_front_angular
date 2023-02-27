import {AppUserRole} from "./appUserRole";

export interface AppUser {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  roles: AppUserRole[];
}
