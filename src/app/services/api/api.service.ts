import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginRequest } from 'src/app/models/request/auth.request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseApiUrl: string = environment.api.baseApiRoot;

  constructor(
    private http: HttpClient
  ) { }

  login(body: ILoginRequest) {
    return this.http.post(`${this.baseApiUrl}auth/login`, body)
  }

  logout() {
    return this.http.get(
      `${this.baseApiUrl}auth/logout`)
  }

  // banker api
  getBankerDashboardData() {
    return this.http.get(`${this.baseApiUrl}banker/getDashboardData`);
  }

  // upload document
  uploadUserDocument(data: any) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'multipart/form-data');
    return this.http.post(`${this.baseApiUrl}banker/claim/upload`, { multipartFile: data }, { headers: headers })
  }

  getClaimList(pageNo: number, pageSize: number) {
    return this.http.get(`${this.baseApiUrl}banker/claim?claimDataFilter=DRAFT&limit=${pageSize}&page=${pageNo}`);
  }
  getClaimSubmiitedList(pageNo: number, pageSize: number) {
    return this.http.get(`${this.baseApiUrl}banker/claim?claimDataFilter=SUBMITED&limit=${pageSize}&page=${pageNo}`);
  }
  discardClaims() {
    return this.http.delete(`${this.baseApiUrl}banker/claim/discard`)
  }

  submitClaims() {
    return this.http.put(`${this.baseApiUrl}banker/claim/submit`, "")
  }

}
