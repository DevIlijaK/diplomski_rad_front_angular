import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {GetAppUsersRequest} from "../model/get-app-users-request";
import {GetAppUsersResponse} from "../model/get-app-users-response";
import {AppUser} from "../constants/appUser";
import {AppUserRole} from "../constants/appUserRole";


@Injectable({
  providedIn: 'root'
})
export class AadminApiService {
  private readonly USER_API = `${environment.baseApi}/api/user`;

  constructor(private http: HttpClient) {
  }


  getAppUsers(getAppUsersRequest: GetAppUsersRequest): Observable<GetAppUsersResponse> {
    return this.http.post<GetAppUsersResponse>(this.USER_API + '/get-users', getAppUsersRequest);
  }
  updateAppUser(appUser: AppUser): Observable<string> {
    console.log('uslo');
    return this.http.put<string>(this.USER_API + '/update-user', appUser);
  }
  createAppUser(appUser: AppUser): Observable<HttpResponse<string>> {
    return this.http.post<HttpResponse<string>>(this.USER_API + '/save', appUser);
  }
  getAllAppUserRoles(): Observable<AppUserRole[]> {
    return this.http.get<AppUserRole[]>(this.USER_API + '/get-roles');
  }
}
