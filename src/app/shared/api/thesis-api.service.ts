import {HttpClient} from "@angular/common/http";
import {Inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ThesisModel} from "../models/thesis.model";
import {getThesisByEmailAndDateRange} from "../store/actions";
import {GetThesisByEmailAndDateRangeRequest} from "../models/requests/get-thesis-by-email-and-date-range-request";

@Injectable()
export class ThesisApiService {

  readonly THESIS_API = `http://localhost:8080`;

  constructor(private http: HttpClient,) {
  }


  getThesis(): Observable<ThesisModel[]> {
    return this.http.get<ThesisModel[]>(this.THESIS_API + '/get');
  }
  getThesisByEmailAndDateRange(getThesisByEmailAndDateRangeRequest: GetThesisByEmailAndDateRangeRequest): Observable<ThesisModel[]> {


    let url = `${this.THESIS_API}/find/thesis/by/professor/and/date/range`;

    return this.http.post<ThesisModel[]>(url, getThesisByEmailAndDateRangeRequest);
  }
}
