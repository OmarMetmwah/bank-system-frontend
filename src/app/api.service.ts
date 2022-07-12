import { Injectable } from '@angular/core';
import {
  environment
} from '../environments/environment';
import {
  HttpClient,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOptions: any;
  constructor(private http: HttpClient) {
  }


  post(path: String, body: any) {
      return this.http.post(`${environment.url}${path}`, body);
    
  }
  get(path: String) {
      return this.http.get(`${environment.url}${path}`);
    }
}
  

