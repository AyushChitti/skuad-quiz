import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonHttpService {

  baseURL = environment.base_Url;

  constructor(private http: HttpClient) { }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(this.baseURL + url);
  }

  post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(this.baseURL + url, body);
  }

  put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(this.baseURL + url, body);
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(this.baseURL + url);
  }

  patch<T>(url: string, body: any): Observable<T> {
    return this.http.patch<T>(this.baseURL + url, body);
  }
  
}
