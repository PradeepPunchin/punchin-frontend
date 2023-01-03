import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { STORAGETOKENENUM } from 'src/app/models/enums';
import { ILoginRequest } from 'src/app/models/request/auth.request';
import { environment } from 'src/environments/environment';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseApiUrl: string = environment.api.baseApiRoot;
  role: any
  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    this.role = this.sessionService.getSession(STORAGETOKENENUM.role)

  }

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

  getClaimList(page = 0) {
    return this.http.get(`${this.baseApiUrl}banker/claim?claimDataFilter=DRAFT&limit=${10}&page=${page}`);
  }

  getClaimUploadList(data: any, pageNo: number, pageSize: number) {
    return this.http.get(`${this.baseApiUrl}banker/claim?claimDataFilter=${data}&page=${pageNo}&limit=${pageSize}`);
  }

  getCardList(searchEnum: any, inputData: any, tabType: any, page: any) {
    if (searchEnum && inputData) {
      return this.http.get(`${this.baseApiUrl}banker/claim?searchCaseEnum=${searchEnum}&searchedKeyword=${inputData}&claimDataFilter=${tabType}&limit=10&page=${page}`);
    } else {
      return this.http.get(`${this.baseApiUrl}banker/claim?claimDataFilter=${tabType}&limit=10&page=${page}`);
    }
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

  getBankerDownloadMISReport(data: any) {
    return this.http.get(`${this.baseApiUrl}banker/claim/download-mis-report?claimDataFilter=${data}`)
  }

  getClaimBankerDocuments(id: any) {
    return this.http.get(`${this.baseApiUrl}banker/claim/${id}/documents`)
  }

  getBankerDownlaodAllDocuments(id: any) {
    return this.http.get(`${this.baseApiUrl}banker/claim/${id}/download-all-documents`);
  }

  uploadDiscrepancyDocument(id: number, docType: any, data: any) {
    return this.http.put(`${this.baseApiUrl}banker/claim/${id}/discrepancy-document-upload/${docType}`, data);
  }
  requestForAdditionalDocument(body: any) {
    return this.http.post(`${this.baseApiUrl}banker/claim/document/additional-request`, body);
  }

  //varifier api
  getVerifierDashboardData() {
    return this.http.get(`${this.baseApiUrl}verifier/getDashboardData`);
  }

  getVerifierDocumentRequestData(pageNo: number, pageSize: number) {
    return this.http.get(`${this.baseApiUrl}verifier/claim/data-with-document-status?page=${pageNo}&limit=${pageSize}`);
  }

  getVerifierClaimsData(data: any, page = 0) {
    return this.http.get(`${this.baseApiUrl}verifier/claim?claimDataFilter=${data}&page=${page}&limit=10`);
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

  getVerifierSearchData(searchEnum: any, inputData: any, tabType: any, page = 0) {
    return this.http.get(`${this.baseApiUrl}verifier/claim/searchVerifier?searchCaseEnum=${searchEnum}&searchedKeyword=${inputData}&claimDataFilter=${tabType}&page=${page}&limit=10`);
  }

  getVerifierDownloadMISReport(data: any) {
    return this.http.get(`${this.baseApiUrl}verifier/claim/download-mis-report?claimDataFilter=${data}`)
  }

  getAllAgentsForVerifier() {
    return this.http.get(`${this.baseApiUrl}verifier/agents`)
  }

  claimDataAgentAllocation(agentId: number, cliamId: number) {
    return this.http.put(`${this.baseApiUrl}verifier/claim/${cliamId}/allocate/${agentId}`, "");
  }

  getVerifierClaimhistory(id: any) {
    return this.http.get(`${this.baseApiUrl}verifier/claim/${id}/history`)
  }
}

