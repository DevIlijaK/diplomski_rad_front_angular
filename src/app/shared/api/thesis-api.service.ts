import {HttpClient} from "@angular/common/http";
import {Inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ThesisModel} from "../models/thesis.model";

@Injectable()
export class ThesisApiService {

  readonly THESIS_API = `http://localhost:8080`;

  constructor(private http: HttpClient,) {
  }


  getThesis(): Observable<ThesisModel[]> {
    return this.http.get<ThesisModel[]>(this.THESIS_API + '/get');
  }
  //
  //
  // updateDocumentTask(task: Task, taskId: number): Observable<Task> {
  //   const url = `${this.TASK_API}/${TaskType.DOCUMENT}/${taskId}`;
  //   return this.http.put<Task>(url, task);
  // }
  //
  // updateShipmentTask(task: Task, taskId: number): Observable<Task> {
  //   const url = `${this.TASK_API}/${TaskType.SHIPMENT}/${taskId}`;
  //   return this.http.put<Task>(url, task);
  // }
  //
  // updateExternalShipmentTask(task: Task, taskId: number): Observable<Task> {
  //   const url = `${this.TASK_API}/${TaskType.EXTERNAL_SHIPMENT}/${taskId}`;
  //   return this.http.put<Task>(url, task);
  // }
  // // searchInputTask(searchRequest: SearchRequest) {
  // //   return this.http.post<SearchResponse<TaskStatus>>(this.TASK_API + '/search-status', searchRequest);
  // // }
  //
  // getNumberOfUnprocessedDocument(searchRequest: SearchRequest): Observable<number> {
  //   const url = `${this.TASK_API}/document/count`;
  //   return this.http.post<number>(url, searchRequest);
  // }
  //
  // getNumberOfUnprocessedShipment(): Observable<number> {
  //   const url = `${this.TASK_API}/shipment/count`;
  //   return this.http.get<number>(url);
  // }
  //
  // getNumberOfExternalUnprocessedShipment(): Observable<number> {
  //   const url = `${this.TASK_API}/external-shipment/count`;
  //   return this.http.get<number>(url);
  // }
  //
  // confirmShipmentTask(task: ConfirmReturnReceiptRequest): Observable<string> {
  //   const url = `${this.TASK_API}/${TaskType.SHIPMENT}/confirmation`;
  //   return this.http.put<string>(url, task);
  // }
  //
  // confirmShipmentTaskWithFile(task: ConfirmReturnReceiptRequest, file: File): Observable<string> {
  //   const formData = new FormData();
  //   formData.append('body', JSON.stringify(task));
  //   formData.append('file', file);
  //   const url = `${this.TASK_API}/${TaskType.SHIPMENT}/confirmation-with-return-receipt-file`;
  //   return this.http.post<string>(url, formData);
  // }
  // getNumberOfDocumentForMonitoring(searchRequest: SearchRequest) {
  //   const url = `${this.TASK_API}/task-status/count`;
  //   return this.http.post(url, searchRequest);
  // }
}
