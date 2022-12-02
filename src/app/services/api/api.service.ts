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
}
