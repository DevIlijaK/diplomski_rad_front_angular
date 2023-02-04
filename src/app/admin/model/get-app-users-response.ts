import {AppUser} from "../constants/appUser";

export interface GetAppUsersResponse{
  appUsers: AppUser[];
  total: number;
}
