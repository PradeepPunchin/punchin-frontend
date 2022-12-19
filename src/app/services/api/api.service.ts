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
    return this.http.post(`${this.baseApiUrl}auth/login`, body);
  }

  logout() {
    return this.http.get(`${this.baseApiUrl}auth/logout`);
  }

  // banker api
  getBankerDashboardData() {
    return this.http.get(`${this.baseApiUrl}banker/getDashboardData`);
  }

  // upload document
  uploadUserDocument(data: any) {
    return this.http.post(`${this.baseApiUrl}banker/claim/upload`, data);
  }

  getClaimList(pageNo: number, pageSize: number) {
    return this.http.get(`${this.baseApiUrl}banker/claim?claimDataFilter=DRAFT&limit=${pageSize}&page=${pageNo}`);
  }

  getClaimUploadList(data: any, pageNo: number, pageSize: number) {
    return this.http.get(`${this.baseApiUrl}banker/claim?claimDataFilter=${data}&page=${pageNo}&limit=${pageSize}`);
  }

  getCardList(data: any, pageNo: number, pageSize: number) {
    return this.http.get(`${this.baseApiUrl}banker/claim?claimDataFilter=${data}&limit=${pageSize}&page=${pageNo}`);
  }

  discardClaims() {
    return this.http.delete(`${this.baseApiUrl}banker/claim/discard`);
  }

  submitClaims() {
    return this.http.put(`${this.baseApiUrl}banker/claim/submit`, "");
  }

  getDownloadExcelFormat() {
    return this.http.get(`${this.baseApiUrl}banker/download-excel-format`);
  }

  getClaimListByClaimid(id: any) {
    return this.http.get(`${this.baseApiUrl}banker/claim/${id}`);
  }

  uploadDocument(claimId: number, docType: any, data: any) {
    return this.http.put(`${this.baseApiUrl}banker/claim/${claimId}/uploadDocument/${docType}`, data);
  }

  forwardClaim(id: number) {
    return this.http.put(`${this.baseApiUrl}banker/claim/${id}/forward-to-verifier`, "");
  }

  deleteDocument(docId: number) {
    return this.http.delete(`${this.baseApiUrl}banker/claim/document/delete/${docId}`);
  }

  DocumnetSaveDraft(claimId: any) {
    return this.http.post(`${this.baseApiUrl}banker/claim/${claimId}/documents/save-draft`, "");
  }

  getDownloadMisReport(data: any) {
    return this.http.get(`${this.baseApiUrl}banker/claim/download-mis-report?claimDataFilter=${data}`)
  }

  //varifier api
  getVerifierDashboardData() {
    return this.http.get(`${this.baseApiUrl}verifier/getDashboardData`);
  }

  getVerifierDocumentRequestData(pageNo: number, pageSize: number) {
    return this.http.get(`${this.baseApiUrl}verifier/claim/data-with-document-status?page=${pageNo}&limit=${pageSize}`);
  }

  getVerifierClaimsData(data: any, page = 0) {
    return this.http.get(`${this.baseApiUrl}verifier/claim?claimDataFilter=${data}&page=${page}&limit=7`);
  }

  getDocumentDetails(id: number) {
    return this.http.get(`${this.baseApiUrl}verifier/claim/${id}/documents`);
  }

  getAcceptAndRejectDocuments(id: number, docId: number, body: any) {
    return this.http.post(`${this.baseApiUrl}verifier/claim/${id}/document/${docId}/doc-approve-reject`, body);
  }

  getDownlaodAllDocuments(id: any) {
    return this.http.get(`${this.baseApiUrl}verifier/claim/${id}/download-all-documents`);
  }
}

