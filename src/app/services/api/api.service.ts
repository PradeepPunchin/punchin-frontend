import { HttpClient } from '@angular/common/http';
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

  
}
