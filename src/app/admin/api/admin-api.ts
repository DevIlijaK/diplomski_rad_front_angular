import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {GetAppUsersRequest} from "../model/get-app-users-request";
import {GetAppUsersResponse} from "../model/get-app-users-response";


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
}
