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
    return this.http.post(`${this.baseApiUrl}banker/claim/upload`, data)
  }

  getClaimList(pageNo: number, pageSize: number) {
    return this.http.get(`${this.baseApiUrl}banker/claim?claimDataFilter=DRAFT&limit=${pageSize}&page=${pageNo}`);
  }

  getClaimSubmiitedList(pageNo: number, pageSize: number) {
    return this.http.get(`${this.baseApiUrl}banker/claim?claimDataFilter=SUBMITTED&limit=${pageSize}&page=${pageNo}`);
  }

  getCardList(data: any, pageNo: number, pageSize: number) {
    return this.http.get(`${this.baseApiUrl}banker/claim?claimDataFilter=${data}&limit=${pageSize}&page=${pageNo}`);
  }

  discardClaims() {
    return this.http.delete(`${this.baseApiUrl}banker/claim/discard`)
  }

  submitClaims() {
    return this.http.put(`${this.baseApiUrl}banker/claim/submit`, "")
  }

  //varifier api
  getVerifierDashboardData() {
    return this.http.get(`${this.baseApiUrl}verifier/getDashboardData`);
  }

  getVerifierDocumentRequestData(pageNo: number, pageSize: number) {
    return this.http.get(`${this.baseApiUrl}verifier/getVerifierDataDocumentClaimsData?page=${pageNo}&limit=${pageSize}`)
  }
  getVerifierClaimsData(data: any, pageNo: number, pageSize: number) {
    return this.http.get(`${this.baseApiUrl}verifier/claim?claimDataFilter=${data}&page=${pageNo}&limit=${pageSize}`)
  }






}
