import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ThesisModel} from "../../shared/models/thesis.model";
import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {LoginRequest} from "../model/login-request";



@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private readonly USER_API = `${environment.baseApi}/api`;

  constructor(private http: HttpClient) {
  }


  login(logiRequest: LoginRequest): Observable<any> {
    console.log(`${environment.baseApi}/api`);
    return this.http.post(this.USER_API + '/login', logiRequest);
  }
}