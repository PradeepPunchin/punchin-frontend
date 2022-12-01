import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseApiUrl: string = environment.api.baseApiRoot;

  constructor(
    private http: HttpClient
  ) { }

  login(body: any) {
    return this.http.post(
      `${this.baseApiUrl}auth/login`, body)
  }

  logout() {
    return this.http.get(
      `${this.baseApiUrl}auth/logout`)
  }
}
